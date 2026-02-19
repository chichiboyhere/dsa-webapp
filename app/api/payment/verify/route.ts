//api/payment/verify/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

import { generateReceipt } from "@/lib/receipt-generator";
import { convertToWords } from "@/lib/amountToWords";
import { uploadPDF } from "@/lib/uploadPDF";

const handleError = (msg: string, status = 500) =>
  NextResponse.json({ error: msg }, { status });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) return handleError("No reference", 400);

  try {
    const {
      data: { data },
    } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } },
    );

    if (data.status !== "success") return handleError("Payment failed", 400);

    const existing = await prisma.payment.findUnique({ where: { reference } });
    if (existing)
      return NextResponse.redirect(
        `${process.env.APP_URL}/dashboard?status=success`,
      );

    // Process based on type
    if (data.metadata.type === "REGISTRATION") {
      await handleRegistrationPayment(data);
    } else {
      await handleDashboardPayment(data);
    }

    // Redirect user back to dashboard instead of just JSON
    return NextResponse.redirect(
      `${process.env.APP_URL}/dashboard?status=success`,
    );
  } catch (err: any) {
    console.error("VERIFY ERROR:", err.response?.data || err.message);
    return handleError("Verification processing failed");
  }
}

async function handleRegistrationPayment(data: any) {
  const formData = data.metadata.formData;

  const bcrypt = await import("bcryptjs");
  const hashed = await bcrypt.hash(formData.password, 10);

  const student = await prisma.student.create({
    data: {
      surname: formData.surname,
      firstName: formData.firstName,
      middleName: formData.middleName,

      dob: new Date(formData.dob),
      gender: formData.gender,

      email: formData.email,
      password: hashed,

      address: formData.address,
      phone: formData.phone,

      nationality: formData.nationality,
      state: formData.state,
      lga: formData.lga,

      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      guardianAddress: formData.guardianAddress,
      relationship: formData.relationship,

      emergencyName: formData.emergencyName,
      emergencyPhone: formData.emergencyPhone,

      medicalInfo: formData.medicalInfo,

      department: formData.department,
      exam: formData.exam,
      subjects: formData.subjects,
      tradeSubject: formData.tradeSubject,

      agreedToConduct:
        formData.agreedToConduct === true ||
        formData.agreedToConduct === "true",

      photoUrl: formData.photoUrl || null,

      status: "AWAITING_APPROVAL",
      paymentStatus: "PAID",
      amountPaid: data.amount / 100,
    },
  });

  await prisma.payment.create({
    data: {
      studentId: student.id,
      reference: data.reference,
      amount: data.amount / 100,
      channel: data.channel,
      status: data.status,
      adminNote:
        data.type === "TUITION" ? "Monthly Tuition Fee" : "CBT Portal Access",
    },
  });

  const studentName = `${student.firstName} ${student.surname}`;

  const receiptData = {
    studentName,
    amount: data.amount / 100,
    amountInWords: convertToWords(data.amount / 100),
    description: "Registration & Student Handbook Fee",
    dueDate: "",
  };

  const pdfBytes = await generateReceipt(receiptData, student.photoUrl);

  // Upload to Cloudinary
  const receiptUrl = await uploadPDF(pdfBytes);

  await prisma.payment.update({
    where: { reference: data.reference },
    data: {
      receiptUrl,
    },
  });
}

async function handleDashboardPayment(data: any) {
  const student = await prisma.student.findUnique({
    where: { id: data.metadata.studentId },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }
  const { studentId, type } = data.metadata;

  await prisma.payment.create({
    data: {
      studentId,
      reference: data.reference,
      amount: data.amount / 100,
      channel: data.channel,
      status: data.status,
    },
  });

  if (type === "TUITION") {
    await prisma.student.update({
      where: { id: studentId },
      data: {
        paymentStatus: "PAID",
        amountPaid: {
          increment: data.amount / 100,
        },
        tuitionPaidAt: new Date(),
      },
    });
  }

  if (type === "CBT") {
    await prisma.student.update({
      where: { id: studentId },
      data: {
        cbtPaidAt: new Date(),
        cbtExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        cbtAttempts: 0,
      },
    });
  }

  const receiptData = {
    studentName: `${student.firstName} ${student.surname}`,
    amount: data.amount / 100,
    amountInWords: convertToWords(data.amount / 100),
    description: type === "TUITION" ? "Monthly Tuition Fee" : "CBT Access Fee",
    dueDate:
      type === "TUITION"
        ? new Date(
            new Date().setMonth(new Date().getMonth() + 1),
          ).toLocaleDateString()
        : "",
  };

  const pdfBytes = await generateReceipt(receiptData, student.photoUrl);

  const receiptUrl = await uploadPDF(pdfBytes);

  await prisma.payment.update({
    where: { reference: data.reference },
    data: { receiptUrl },
  });
}
