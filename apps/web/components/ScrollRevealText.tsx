"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ScrollRevealTextProps = {
  text: string;
};

export function ScrollRevealText({ text }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  return (
    <p
      ref={containerRef}
      className="font-body text-3xl font-medium leading-relaxed tracking-[-1px] text-[hsl(var(--foreground))] md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => (
        <RevealWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function RevealWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block pr-2">
      {word}
    </motion.span>
  );
}