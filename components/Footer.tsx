"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Coffee, Github } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full border-t border-border py-8 bg-background">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Main attribution */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Designed and Developed with 💚 by{" "}
              <span className="font-medium text-foreground">Chan</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Link href="https://github.com/chanakyha" target="_blank">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </Button>

            <div className="h-4 w-px bg-border" />

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Link href="https://buymeacoffee.com/chanakyha" target="_blank">
                <Coffee className="h-4 w-4" />
                <span>Buy me a coffee</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
