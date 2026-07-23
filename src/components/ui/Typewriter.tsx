import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
};

/**
 * Cycles through `words`, typing and deleting each in turn.
 * Pure setTimeout state machine — no deps, cheap to run.
 */
export function Typewriter({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseMs = 1400,
  className = "",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseMs / 2);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length - 1)),
          deletingSpeed
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-[var(--color-accent)] ml-1 align-middle animate-pulse" />
    </span>
  );
}
