import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGpaMessage(gpa: number): string {
  if (gpa === 10.0) {
    return "Academic Wizard 🧙‍♂️ Congratulations! You're practically a GPA sorcerer. Your grades are so magical; even unicorns are jealous. Keep casting those academic spells!";
  } else if (gpa >= 9.0 && gpa < 10.0) {
    return "Brainiac Brilliance 🌟 Impressive work! You've got the brainpower of a supernova. Your intellect shines brighter than a thousand suns. Keep dazzling the academic universe!";
  } else if (gpa >= 8.0 && gpa < 9.0) {
    return "Grade Gladiator ⚔️ You're a warrior in the realm of grades, battling through challenges with your academic sword. Keep up the fight, valiant one!";
  } else if (gpa >= 7.0 && gpa < 8.0) {
    return "Sailing Smooth ⛵ Smooth sailing on the GPA seas! You've navigated through the academic waters quite gracefully. Keep the wind in your academic sails.";
  } else if (gpa >= 6.0 && gpa < 7.0) {
    return "Steady Stepper 🚶‍♂️ Steady as she goes! You're treading the academic path with determination. Keep taking those confident steps forward.";
  } else if (gpa >= 5.0 && gpa < 6.0) {
    return "Rising Phoenix 🌅 Like a phoenix rising from the ashes, your GPA is on the ascent. Keep the flames of improvement burning bright!";
  } else if (gpa >= 4.0 && gpa < 5.0) {
    return "Silver Lining ☁️ Every cloud has a silver lining, and so does your GPA. You're finding the positives amidst the academic clouds. Keep seeking that silver lining!";
  } else if (gpa >= 3.0 && gpa < 4.0) {
    return "Resilient Rock 🪨 You're as solid as a rock! Even in the face of academic challenges, you stand strong. Keep weathering the storms, resilient one.";
  } else if (gpa >= 2.0 && gpa < 3.0) {
    return "Rising Phoenix (Redux) 🌅 Another chance, another rise! Just like the phoenix, you're ready for a fresh start. Keep soaring towards academic success.";
  } else if (gpa >= 1.0 && gpa < 2.0) {
    return "Trailblazer 🔥 You're blazing a unique trail. Your GPA might be low, but your spirit is high. Keep forging ahead, fearless trailblazer!";
  } else {
    return "Invalid GPA. Please provide a GPA between 1.0 and 10.0.";
  }
}
