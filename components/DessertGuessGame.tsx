"use client";

import { useMemo, useState } from "react";

const desserts = ["Tiramisu", "Cheesecake", "Mochi", "Chocolate cake"] as const;
const correctDessert = "Mochi";

export default function DessertGuessGame() {
  const [guess, setGuess] = useState<(typeof desserts)[number] | null>(null);
  const [attempts, setAttempts] = useState(0);

  const message = useMemo(() => {
    if (!guess) {
      return "Pick the dessert Iris is thinking about.";
    }

    if (guess === correctDessert) {
      return "Correct. Dessert negotiations may now begin.";
    }

    return "Very tempting, but not the secret dessert.";
  }, [guess]);

  function handleGuess(dessert: (typeof desserts)[number]) {
    setGuess(dessert);
    setAttempts((currentAttempts) => currentAttempts + 1);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-6 text-center shadow-2xl shadow-rose-200/50 backdrop-blur sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-3xl">
          🍰
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
          Dessert guess game
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-rose-950">
          Guess the dessert
        </h1>
        <p className="mt-4 text-base leading-7 text-rose-800">{message}</p>

        <div className="mt-7 grid gap-3">
          {desserts.map((dessert) => {
            const isSelected = guess === dessert;
            const isCorrect = dessert === correctDessert;
            const showSuccess = isSelected && isCorrect;

            return (
              <button
                key={dessert}
                type="button"
                onClick={() => handleGuess(dessert)}
                className={[
                  "rounded-2xl border px-5 py-4 font-semibold transition focus:outline-none focus:ring-4",
                  showSuccess
                    ? "border-emerald-200 bg-emerald-100 text-emerald-800 focus:ring-emerald-100"
                    : isSelected
                      ? "border-rose-300 bg-rose-100 text-rose-800 focus:ring-rose-100"
                      : "border-rose-100 bg-rose-50/70 text-rose-950 hover:border-rose-300 hover:bg-rose-100 focus:ring-rose-100",
                ].join(" ")}
              >
                {dessert}
              </button>
            );
          })}
        </div>

        <div className="mt-7 rounded-3xl bg-rose-50 p-4 text-sm font-medium text-rose-700">
          Attempts: {attempts}
        </div>
      </section>
    </main>
  );
}
