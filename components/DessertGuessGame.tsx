"use client";

import { FormEvent, useState } from "react";

const correctAnswers = new Set(["mikko", "me"]);

type GuessState = "idle" | "correct" | "wrong";

export default function DessertGuessGame() {
  const [answer, setAnswer] = useState("");
  const [guessState, setGuessState] = useState<GuessState>("idle");
  const [showAnswerCard, setShowAnswerCard] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedAnswer = answer.trim().toLowerCase();

    if (correctAnswers.has(normalizedAnswer)) {
      setGuessState("correct");
      setShowAnswerCard(false);
      return;
    }

    setGuessState("wrong");
    setShowAnswerCard(false);
  }

  function revealAnswer() {
    setShowAnswerCard(true);
  }

  if (showAnswerCard) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-10">
        <section className="w-full max-w-md rounded-[2rem] border border-pink-100 bg-gradient-to-br from-rose-50 to-pink-100 p-6 text-center shadow-2xl shadow-rose-200/50 transition sm:p-8">
          <div className="text-sm text-rose-400">♡ ♡ ♡</div>
          <p className="mt-3 text-4xl font-bold text-rose-950">
            It&apos;s YOU 💕
          </p>
        </section>
      </main>
    );
  }

  if (guessState === "correct") {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-10">
        <section className="w-full max-w-md rounded-[2rem] border border-pink-100 bg-pink-50 p-6 text-center text-rose-800 shadow-2xl shadow-rose-200/50 transition sm:p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl">
            💕
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-rose-950">
            Okiii, you know too much about me ...
          </h1>
          
        </section>
      </main>
    );
  }

  if (guessState === "wrong") {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-10">
        <section className="w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/85 p-6 text-center shadow-2xl shadow-rose-200/50 backdrop-blur transition sm:p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-3xl">
            💌
          </div>
          <p className="text-xl font-semibold text-rose-700">
            Sorry, wrong answer. Wanna know?
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {["Yes", "Sure", "Of course"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={revealAnswer}
                className="rounded-full border border-rose-200 bg-white/70 px-5 py-3 font-semibold text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100"
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-6 text-center shadow-2xl shadow-rose-200/50 backdrop-blur sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-3xl">
          🍰
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-rose-950">
          Hello Mikko 🍰
        </h1>
        <p className="mt-5 text-lg font-medium leading-7 text-rose-800">
          Guess what dessert I am thinking about right now?
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Type your answer..."
            className="w-full rounded-2xl border border-rose-100 bg-rose-50/70 px-5 py-4 text-center text-rose-950 outline-none transition placeholder:text-rose-300 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
            type="text"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200"
          >
            Submit Guess
          </button>
        </form>
      </section>
    </main>
  );
}
