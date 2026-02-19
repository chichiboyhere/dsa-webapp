// lib/receipt-generator.ts
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function generateReceipt(
  paymentData: any,
  studentPhotoUrl?: string | null,
) {
  // Load local assets using absolute paths for Server-Side execution
  const pdfPath = path.join(process.cwd(), "public/assets/blank-receipt.pdf");
  const stampPath = path.join(process.cwd(), "public/assets/stamp.png");

  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();
  const fontSize = 14;

  // 1. Embed student photo (Handle external URL)
  if (studentPhotoUrl) {
    try {
      const photoRes = await fetch(studentPhotoUrl);
      const photoBytes = await photoRes.arrayBuffer();

      // Check if it's actually a PNG or JPG
      const isPng = studentPhotoUrl.toLowerCase().endsWith(".png");
      const studentPhoto = isPng
        ? await pdfDoc.embedPng(photoBytes)
        : await pdfDoc.embedJpg(photoBytes);
      page.drawImage(studentPhoto, {
        x: width - 140,
        y: height - 430,
        width: 90,
        height: 90,
      });
    } catch (e) {
      console.error("Could not embed student photo:", e);
    }
  }

  // 2. Draw Text (Mapping to your scanned receipt coordinates)
  const today = new Date();
  page.drawText(String(today.getDate()), {
    x: 50,
    y: height - 390,
    size: fontSize,
  });
  page.drawText(today.toLocaleString("default", { month: "short" }), {
    x: 110,
    y: height - 390,
    size: fontSize,
  });
  page.drawText(String(today.getFullYear()), {
    x: 170,
    y: height - 390,
    size: fontSize,
  });

  page.drawText(paymentData.studentName, {
    x: 150,
    y: height - 430,
    size: fontSize,
  });
  page.drawText(paymentData.amountInWords, {
    x: 150,
    y: height - 470,
    size: fontSize,
  });
  page.drawText(paymentData.description, {
    x: 160,
    y: height - 560,
    size: fontSize,
  });

  // 3. Amount and Stamp
  page.drawText(` ${paymentData.amount.toLocaleString()}`, {
    x: 130,
    y: height - 600,
    size: 20,
  });

  const stampBytes = fs.readFileSync(stampPath);
  const stamp = await pdfDoc.embedPng(stampBytes);
  page.drawImage(stamp, {
    x: 430,
    y: height - 640,
    width: 160,
    height: 60,
  });

  return await pdfDoc.save();
}
