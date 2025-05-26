"use client";

import { motion } from "framer-motion";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const SlideInLeft = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const SlideInRight = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
