export interface GradePoints {
  grade: string;
  points: number;
}

// Convert to object for easier lookup
export const gradePoints: Record<string, number> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5.5,
  W: 0,
  F: 0,
  Ab: 0,
  I: 0,
  "*": 0,
};

// Array version for iteration
export const gradePointsArray: GradePoints[] = [
  { grade: "O", points: 10 },
  { grade: "A+", points: 9 },
  { grade: "A", points: 8 },
  { grade: "B+", points: 7 },
  { grade: "B", points: 6 },
  { grade: "C", points: 5.5 },
  { grade: "W", points: 0 },
  { grade: "F", points: 0 },
  { grade: "Ab", points: 0 },
  { grade: "I", points: 0 },
  { grade: "*", points: 0 },
];
