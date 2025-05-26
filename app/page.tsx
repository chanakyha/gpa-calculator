"use client";

import { useState } from "react";
import SgpaForm from "@/components/SgpaForm";
import CgpaForm from "@/components/CgpaForm";
import { Button } from "@/components/ui/button";
import ThemeTogglerBtn from "@/components/ThemeTogglerBtn";
import { Calculator, GraduationCap, BookOpen, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"sgpa" | "cgpa">("sgpa");

  return (
    <div className="min-h-[calc(100vh-124px)] md:min-h-[calc(100vh-105px)] bg-background">
      {/* Header Section with Green Theme */}
      <header className="border-b border-border bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-primary/8 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="section-container py-6 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-primary">
                Gpa Calculator
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ThemeTogglerBtn className="p-2" />
            </motion.div>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Title */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex justify-center items-center gap-6 mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <GraduationCap className="h-12 w-12 text-primary" />
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-2xl font-bold bg-gradient-to-r from-primary via-green-600 to-primary bg-clip-text text-transparent mb-2">
                    SRM GPA CALCULATOR
                  </h1>
                  <p className="text-md text-muted-foreground">
                    🌱 Sustainable Academic Performance Calculator for SRM
                    University Students
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Calculator className="h-12 w-12 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            {/* Tab Selection */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="border space-x-2 border-primary/20 p-1 inline-flex rounded-lg bg-primary/5 backdrop-blur-sm">
                <Button
                  variant={activeTab === "sgpa" ? "default" : "ghost"}
                  onClick={() => setActiveTab("sgpa")}
                  className={`px-8 py-3 font-medium transition-all duration-200 ${
                    activeTab === "sgpa"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-primary hover:bg-primary/10"
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  SGPA Calculator
                </Button>
                <Button
                  variant={activeTab === "cgpa" ? "default" : "ghost"}
                  onClick={() => setActiveTab("cgpa")}
                  className={`px-8 py-3 font-medium transition-all duration-200 ${
                    activeTab === "cgpa"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-primary hover:bg-primary/10"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  CGPA Calculator
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Calculator Section */}
      <main className="section-container py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="formal-card p-8 shadow-lg border-primary/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {activeTab === "sgpa" ? <SgpaForm /> : <CgpaForm />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
