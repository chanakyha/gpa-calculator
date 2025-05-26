"use client";

import * as z from "zod";
import { gradePoints } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Award, Plus, Minus, Calculator, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const formSchema = z.object({
  gpa: z
    .array(
      z.object({
        grade: z.string().min(1, "Please select a grade"),
        credits: z
          .string()
          .min(1, "Credits are required")
          .refine((val) => {
            const num = parseFloat(val);
            return !isNaN(num) && num > 0;
          }, "Credits must be a positive number"),
      })
    )
    .min(1, "At least one subject is required"),
});

// Enhanced text animation component with multiple animation types
const AnimatedText = ({
  text,
  className = "",
  type = "word", // "word" or "char"
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

const SgpaForm = () => {
  const [gpa, setGpa] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiDescription, setAiDescription] = useState<string>("");
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gpa: [
        {
          grade: "",
          credits: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "gpa",
  });

  const triggerConfetti = () => {
    const count = 300;
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
      // Validate that all subjects have valid inputs
      for (const subject of values.gpa) {
        if (!subject.grade || !subject.credits) {
          toast.error("Incomplete Information", {
            description: "Please fill in all grade and credit fields.",
          });
          setIsSubmitting(false);
          return;
        }

        const credits = parseFloat(subject.credits);
        if (isNaN(credits) || credits <= 0) {
          toast.error("Invalid Credits", {
            description: "All credit values must be positive numbers.",
          });
          setIsSubmitting(false);
          return;
        }

        if (!(subject.grade in gradePoints)) {
          toast.error("Invalid Grade", {
            description: "Please select a valid grade for all subjects.",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Calculate SGPA
      let totalWeightedPoints = 0;
      let totalCredits = 0;

      values.gpa.forEach((subject) => {
        const gradePoint = gradePoints[subject.grade];
        const credits = parseFloat(subject.credits);
        totalWeightedPoints += gradePoint * credits;
        totalCredits += credits;
      });

      const calculatedGpa =
        totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

      if (isNaN(calculatedGpa)) {
        toast.error("Calculation Error", {
          description: "Please check your input values and try again.",
        });
        setIsSubmitting(false);
        return;
      }

      setGpa(calculatedGpa);
      setShowResult(true);

      // Success feedback
      toast.success("SGPA Calculated Successfully! 🎉", {
        description: `Your SGPA is ${calculatedGpa.toFixed(3)}`,
      });

      // Fetch AI description
      fetchAiDescription(calculatedGpa);

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
          "An error occurred while calculating your SGPA. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* Result Display */}
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
                      text="Your SGPA:"
                      type="word"
                      staggerDelay={0.15}
                      initialDelay={0}
                      className="inline mr-2"
                    />
                    <AnimatedText
                      text={gpa.toFixed(3)}
                      type="char"
                      staggerDelay={0.08}
                      initialDelay={0}
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
                        initialDelay={0}
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
                          initialDelay={0}
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

      {/* Form Header */}
      <motion.div
        className="text-center space-y-4 border-b border-border pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-3">
          <Calculator className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">
            SGPA Calculator
          </h2>
        </div>
        <p className="text-muted-foreground">
          Enter your subject grades and credits to calculate your Semester Grade
          Point Average
        </p>
      </motion.div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Subject Details
            </h3>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 border border-border rounded-lg bg-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground">
                      Subject {index + 1}
                    </h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`gpa.${index}.grade`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Grade <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(gradePoints).map(
                                ([grade, points]) => (
                                  <SelectItem key={grade} value={grade}>
                                    {grade} ({points} points)
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`gpa.${index}.credits`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Credits <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                placeholder="Enter credits"
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                type="button"
                variant="outline"
                className="w-full h-10"
                onClick={() => append({ grade: "", credits: "" })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                type="submit"
                className="w-full h-10 font-medium"
                disabled={isSubmitting}
              >
                <Calculator className="w-4 h-4 mr-2" />
                {isSubmitting ? "Calculating..." : "Calculate SGPA"}
              </Button>
            </motion.div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SgpaForm;
