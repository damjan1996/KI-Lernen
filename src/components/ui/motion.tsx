"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { ReactNode } from "react";

// Fade In Animation with improved easing
interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(4px)",
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth deceleration
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container for children animations
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  ...props
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger Item (child of StaggerContainer) with improved animations
interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export function StaggerItem({ children, ...props }: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}

// Scale on Hover with improved spring physics
interface ScaleOnHoverProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  scale?: number;
}

export function ScaleOnHover({
  children,
  scale = 1.02,
  ...props
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        y: -4,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Counter Animation
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: CounterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={(entry) => {
            if (!entry) return;
            const target = entry.target as HTMLSpanElement;
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / (duration * 1000), 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(from + (to - from) * easeOut);
              target.textContent = current.toString();
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                target.textContent = to.toString();
              }
            };
            requestAnimationFrame(animate);
          }}
        >
          {from}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
}

// Reveal Text Animation
interface RevealTextProps extends HTMLMotionProps<"div"> {
  children: string;
  delay?: number;
}

export function RevealText({ children, delay = 0, ...props }: RevealTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Floating Element - Gentle idle y-oscillation animation
interface FloatingElementProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
}

export function FloatingElement({
  children,
  amplitude = 8,
  duration = 4,
  ...props
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Glow On Hover - Gold glow shadow effect on hover
interface GlowOnHoverProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  glowColor?: string;
}

export function GlowOnHover({
  children,
  glowColor = "rgba(201, 168, 97, 0.15)",
  ...props
}: GlowOnHoverProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
