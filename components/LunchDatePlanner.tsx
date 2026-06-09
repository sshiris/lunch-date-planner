"use client";

import { useMemo, useState } from "react";

const inviteOptions = ["Yes", "Definitely Yes", "Absolutely Yes"] as const;
const food = "Sushi";
const time = "This Friday at 11:00 AM";
const company = "Iris ❤️";

type Step = 1 | 2 | 3 | 4;

function getThisFridayLunchDate() {
  const date = new Date();
  const day = date.getDay();
  const daysUntilFriday = (5 - day + 7) % 7;
  date.setDate(date.getDate() + daysUntilFriday);
  date.setHours(11, 0, 0, 0);
  return date;
}

function formatIcsDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "T",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function escapeIcsText(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function createCalendarInvite() {
  const start = getThisFridayLunchDate();
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const now = new Date();
  const uid = `sushi-lunch-with-iris-${start.getTime()}@lunch-date-planner`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lunch Date Planner//Sushi Lunch//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Sushi lunch with Iris",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(now)}`,
    `DTSTART;TZID=Europe/Helsinki:${formatIcsDate(start)}`,
    `DTEND;TZID=Europe/Helsinki:${formatIcsDate(end)}`,
    `SUMMARY:${escapeIcsText("Sushi lunch with Iris")}`,
    `LOCATION:${escapeIcsText("Sushi restaurant")}`,
    `DESCRIPTION:${escapeIcsText("A very official lunch date booking.")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

async function downloadCalendarInvite() {
  const ics = createCalendarInvite();
  const fileName = "sushi-lunch-with-iris.ics";
  const calendarFile = new File([ics], fileName, {
    type: "text/calendar;charset=utf-8",
  });

  if (
    navigator.canShare?.({ files: [calendarFile] }) &&
    /Android|iPad|iPhone|iPod/i.test(navigator.userAgent)
  ) {
    try {
      await navigator.share({
        files: [calendarFile],
        title: "Sushi lunch with Iris",
        text: "A very official lunch date booking.",
      });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  }

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

export default function LunchDatePlanner() {
  const [step, setStep] = useState<Step>(1);
  const [invite, setInvite] = useState<(typeof inviteOptions)[number]>("Yes");
  const [confirmed, setConfirmed] = useState(false);

  const progress = useMemo(() => (step / 4) * 100, [step]);

  if (confirmed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-10">
        <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-8 text-center shadow-2xl shadow-rose-200/50 backdrop-blur">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl">
            ❤️
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-rose-700">
            🎉 Booking Successful!
          </h1>
          <p className="mt-5 text-base leading-7 text-rose-950">
            You have successfully agreed to eat sushi with Iris this Friday at
            11:00 AM.
          </p>
          <p className="mt-3 font-semibold text-rose-700">
            No refunds. No cancellations.
          </p>
          <button
            type="button"
            onClick={() => void downloadCalendarInvite()}
            className="mt-8 w-full rounded-full bg-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200"
          >
            Add to Calendar
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-rose-200/50 backdrop-blur sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
            Lunch date planner
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-rose-950">
            A very official invitation
          </h1>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-rose-100">
            <div
              className="h-full rounded-full bg-rose-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-rose-500">Step {step} of 4</p>
        </div>

        {step === 1 && (
          <StepCard
            question="Hello Mikko, Would you like to have lunch with Iris?"
            onNext={() => setStep(2)}
          >
            <div className="space-y-3">
              {inviteOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/70 p-4 text-rose-950 transition hover:border-rose-300 hover:bg-rose-100"
                >
                  <input
                    checked={invite === option}
                    className="h-5 w-5 accent-rose-500"
                    name="invite"
                    onChange={() => setInvite(option)}
                    type="radio"
                  />
                  <span className="font-medium">{option}</span>
                </label>
              ))}
            </div>
          </StepCard>
        )}

        {step === 2 && (
          <StepCard
            question="What would you like to eat?"
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          >
            <ChoiceLabel value={food} />
          </StepCard>
        )}

        {step === 3 && (
          <StepCard
            question="When would you like to go?"
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          >
            <ChoiceLabel value={time} />
          </StepCard>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-rose-950">
              Your lunch date summary
            </h2>
            <div className="mt-5 space-y-3 rounded-3xl bg-rose-50 p-5">
              <SummaryRow label="Food" value={food} />
              <SummaryRow label="Time" value={time} />
              <SummaryRow label="Company" value={company} />
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-full border border-rose-200 px-5 py-3 font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className="flex-1 rounded-full bg-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function StepCard({
  children,
  onBack,
  onNext,
  question,
}: Readonly<{
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  question: string;
}>) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-rose-950">{question}</h2>
      <div className="mt-5">{children}</div>
      <div className="mt-8 flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-rose-200 px-5 py-3 font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-full bg-rose-500 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ChoiceLabel({ value }: Readonly<{ value: string }>) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-950">
      <input checked readOnly className="h-5 w-5 accent-rose-500" type="radio" />
      <span className="font-medium">{value}</span>
    </label>
  );
}

function SummaryRow({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 px-4 py-3">
      <span className="font-semibold text-rose-500">{label}</span>
      <span className="text-right font-bold text-rose-950">{value}</span>
    </div>
  );
}
