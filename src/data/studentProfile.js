/**
 * College Course Registration System - Student Profile Data
 * Student: Gukan Nithish (Reg No: 717822P101)
 */

export const INITIAL_STUDENT = {
  name: "Gukan Nithish",
  regNo: "717822P101",
  rollNo: "22BCS101",
  email: "gukan.nithish@student.university.edu",
  phone: "+91 98765 43210",
  program: "Bachelor of Technology (B.Tech)",
  department: "Computer Science & Engineering",
  semester: 5,
  academicYear: "2024 - 2025",
  cgpa: 8.74,
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
  advisor: {
    name: "Dr. Arvind Raman",
    designation: "Professor & Head of Department",
    department: "Computer Science & Engineering",
    email: "arvind.raman@university.edu",
    cabin: "Turing Block 401"
  },
  creditLimits: {
    minCredits: 14,
    recommendedCredits: 20,
    maxCredits: 24
  },
  degreeProgress: {
    totalCreditsRequired: 160,
    creditsCompletedPrior: 82,
    coreRequired: 80,
    coreCompleted: 48,
    electiveRequired: 36,
    electiveCompleted: 18,
    labRequired: 24,
    labCompleted: 12,
    openRequired: 20,
    openCompleted: 4
  },
  // Courses successfully completed in previous 4 semesters (for prerequisite validation)
  completedCourses: [
    { code: "CS101", title: "Programming Fundamentals (C/C++)", grade: "A+", credits: 4, sem: 1 },
    { code: "MA101", title: "Calculus & Linear Algebra", grade: "A", credits: 4, sem: 1 },
    { code: "CS102", title: "Python for Engineers", grade: "O", credits: 3, sem: 2 },
    { code: "CS201", title: "Data Structures & Algorithms", grade: "A+", credits: 4, sem: 3 },
    { code: "MA201", title: "Discrete Mathematics", grade: "A", credits: 4, sem: 3 },
    { code: "CS301", title: "Computer Organization & Architecture", grade: "A", credits: 4, sem: 4 },
    { code: "MA301", title: "Linear Algebra & Probability", grade: "B+", credits: 3, sem: 4 }
  ]
};
