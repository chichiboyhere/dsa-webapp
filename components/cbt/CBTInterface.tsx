"use client";

import { useEffect, useState } from "react";

export default function CBTInterface({ student }: any) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch("/api/cbt/start")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const submit = async () => {
    const res = await fetch("/api/cbt/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    // if (res.ok) {
    //   alert("CBT submitted successfully");
    //   window.location.href = "/dashboard";
    // }
    const result = await res.json();
    setResult(result);

    alert(`You scored ${result.score} out of ${result.total}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto my-20">
      <h1 className="text-xl font-bold mb-4">CBT Test</h1>

      {questions.map((q, i) => (
        <div key={q.id} className="mb-4">
          <p className="font-medium">
            {i + 1}. {q.question}
          </p>

          {q.options.map((opt: string) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}

      {result && (
        <div className="mt-4 p-4 border rounded bg-green-50">
          <p className="font-bold">
            Score: {result.score} / {result.total}
          </p>
        </div>
      )}

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Submit CBT
      </button>
    </div>
  );
}
