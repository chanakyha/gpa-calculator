"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getGpaMessage } from "@/lib/utils";
import { Award, ExternalLink, Info, Eye, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SlideUp } from "./layout-animations";
import Image from "next/image";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const formSchema = z.object({
  pastGpa: z.object({
    gpa: z
      .string()
      .min(1, "Current CGPA is required")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 10;
      }, "CGPA must be between 0 and 10"),
    credits: z
      .string()
      .min(1, "Total credits is required")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      }, "Credits must be a positive number"),
  }),
  currentGpa: z.object({
    gpa: z
      .string()
      .min(1, "Current semester GPA is required")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 10;
      }, "GPA must be between 0 and 10"),
    credits: z
      .string()
      .min(1, "Current semester credits is required")
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      }, "Credits must be a positive number"),
  }),
});

// Enhanced text animation component with multiple animation types
const AnimatedText = ({
  text,
  className = "",
  type = "word",
  staggerDelay = 0.1,
  initialDelay = 0,
}: {
  text: string;
  className?: string;
  type?: "word" | "char";
  staggerDelay?: number;
  initialDelay?: number;
}) => {
  if (type === "char") {
    const characters = text.split("");
    return (
      <div className={className}>
        {characters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: initialDelay + index * staggerDelay,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
            }}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  }

  // Word animation (default)
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.4,
            delay: initialDelay + index * staggerDelay,
            ease: "easeOut",
            type: "spring",
            stiffness: 120,
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// Typewriter effect for longer text
const TypewriterText = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText("");
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, text]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-primary"
      >
        |
      </motion.span>
    </motion.div>
  );
};

const CgpaForm = () => {
  const [gpa, setGpa] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiDescription, setAiDescription] = useState<string>("");
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentGpa: {
        credits: "",
        gpa: "",
      },
      pastGpa: {
        credits: "",
        gpa: "",
      },
    },
  });

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"],
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const scrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const fetchAiDescription = async (gpaValue: number) => {
    setIsLoadingDescription(true);
    try {
      const response = await fetch("/api/gpa-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gpa: gpaValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI description");
      }

      const data = await response.json();
      setAiDescription(data.message || "");
    } catch (error) {
      console.error("Error fetching AI description:", error);
      setAiDescription("");
    } finally {
      setIsLoadingDescription(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // Validate inputs
      const pastGpa = parseFloat(values.pastGpa.gpa);
      const pastCredits = parseFloat(values.pastGpa.credits);
      const currentGpa = parseFloat(values.currentGpa.gpa);
      const currentCredits = parseFloat(values.currentGpa.credits);

      // Validation checks
      if (
        isNaN(pastGpa) ||
        isNaN(pastCredits) ||
        isNaN(currentGpa) ||
        isNaN(currentCredits)
      ) {
        toast.error("Invalid Input", {
          description: "Please enter valid numbers for all fields.",
        });
        setIsSubmitting(false);
        return;
      }

      if (pastGpa < 0 || pastGpa > 10 || currentGpa < 0 || currentGpa > 10) {
        toast.error("Invalid GPA Range", {
          description: "GPA values must be between 0 and 10.",
        });
        setIsSubmitting(false);
        return;
      }

      if (pastCredits <= 0 || currentCredits <= 0) {
        toast.error("Invalid Credits", {
          description: "Credits must be positive numbers.",
        });
        setIsSubmitting(false);
        return;
      }

      // Calculate new CGPA
      const totalGradePoints =
        pastGpa * pastCredits + currentGpa * currentCredits;
      const totalCredits = pastCredits + currentCredits;
      const result = totalGradePoints / totalCredits;

      if (isNaN(result)) {
        toast.error("Calculation Error", {
          description: "Please check your input values and try again.",
        });
        setIsSubmitting(false);
        return;
      }

      setGpa(result);
      setShowResult(true);

      // Success feedback
      toast.success("CGPA Calculated Successfully! 🎉", {
        description: `Your new CGPA is ${result.toFixed(3)}`,
      });

      // Fetch AI description
      fetchAiDescription(result);

      // Trigger confetti animation
      setTimeout(() => {
        triggerConfetti();
      }, 800);

      // Scroll to result after a short delay to ensure it's rendered
      setTimeout(() => {
        scrollToResult();
      }, 1000);
    } catch (error) {
      toast.error("Calculation Failed", {
        description:
          "An error occurred while calculating your CGPA. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Result Display */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Alert className="formal-card border-primary result-alert p-6 relative overflow-hidden">
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <Award className="h-6 w-6 text-primary" />
                  </motion.div>
                  <AlertTitle className="text-xl font-semibold text-foreground">
                    <AnimatedText
                      text="Your CGPA:"
                      type="word"
                      staggerDelay={0.15}
                      className="inline mr-2"
                    />
                    <AnimatedText
                      text={gpa.toFixed(3)}
                      type="char"
                      staggerDelay={0.08}
                      className="inline font-bold text-primary"
                    />
                  </AlertTitle>
                </div>

                <AlertDescription className="text-base text-muted-foreground">
                  {isLoadingDescription ? (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <motion.div
                        className="rounded-full h-4 w-4 border-b-2 border-primary"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <AnimatedText
                        text="Getting personalized motivation..."
                        type="word"
                        staggerDelay={0.05}
                        className="text-sm text-muted-foreground"
                      />
                    </motion.div>
                  ) : aiDescription ? (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      <TypewriterText
                        text={aiDescription}
                        className="text-sm text-foreground italic leading-relaxed"
                        speed={30}
                        delay={1600}
                      />
                      <motion.p
                        className="text-xs text-muted-foreground flex items-center gap-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <Sparkles className="h-3 w-3" />
                        </motion.div>
                        <AnimatedText
                          text="Powered by DeepSeek AI"
                          type="char"
                          staggerDelay={0.03}
                        />
                      </motion.p>
                    </motion.div>
                  ) : null}
                </AlertDescription>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <SlideUp delay={0.1}>
        <div className="text-center space-y-3 border-b border-border pb-6">
          <div className="flex items-center justify-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              CGPA Calculator
            </h2>
          </div>
          <p className="text-muted-foreground">
            Enter your current CGPA and semester details to calculate your
            updated CGPA
          </p>
        </div>
      </SlideUp>

      <FadeIn delay={0.1}>
        <div className="p-4 bg-muted border border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex-1 flex flex-col md:flex-row gap-2 items-center">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-primary"
                >
                  <Link
                    href="https://sp.srmist.edu.in/"
                    target="_blank"
                    className="flex items-center gap-1"
                  >
                    SRM ERP Portal
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>{" "}
              </p>
              <p className="text-sm text-center md:text-left text-muted-foreground">
                to check your current CGPA and Total Credits Earned
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReference(!showReference)}
              className="ml-4 flex items-center gap-2 mx-auto md:mx-0 mt-2 md:my-0"
            >
              <Eye className="h-4 w-4" />
              {showReference ? "Hide" : "Show"} Reference
            </Button>
          </div>
        </div>
      </FadeIn>

      <AnimatePresence>
        {showReference && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <FadeIn delay={0.1}>
              <div className="p-4 bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">
                    Reference Image
                  </h4>
                </div>
                <div className="relative w-full max-w-2xl mx-auto">
                  <Image
                    src="/images/cgpa.png"
                    alt="CGPA Reference - SRM ERP Portal Screenshot"
                    width={800}
                    height={400}
                    className="rounded-lg border border-border"
                    priority
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Find your Current CGPA and Total Credits Earned from the SRM
                  ERP Portal as shown above
                </p>
              </div>
            </FadeIn>
          </motion.div>
        )}
      </AnimatePresence>

      <SlideUp delay={0.2}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                className="form-section space-y-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="font-semibold text-lg text-foreground">
                  Past Performance
                </h3>
                <FormField
                  control={form.control}
                  name="pastGpa.gpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Current CGPA <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            placeholder="Enter current CGPA"
                            type="number"
                            step="0.001"
                            max="10"
                            min="0"
                            className="h-10"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pastGpa.credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Total Credits Earned{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            placeholder="Enter total credits earned"
                            type="number"
                            step="0.1"
                            min="0"
                            className="h-10"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                className="form-section space-y-4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <h3 className="font-semibold text-lg text-foreground">
                  Current Semester
                </h3>
                <FormField
                  control={form.control}
                  name="currentGpa.gpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Current Semester GPA{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            placeholder="Enter current semester GPA"
                            type="number"
                            step="0.001"
                            max="10"
                            min="0"
                            className="h-10"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentGpa.credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Current Semester Credits{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            placeholder="Enter current semester credits"
                            type="number"
                            step="0.1"
                            min="0"
                            className="h-10"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center pt-6 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 py-3 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Calculating..." : "Calculate CGPA"}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </Form>
      </SlideUp>
    </motion.div>
  );
};

export default CgpaForm;
