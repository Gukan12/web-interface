import React from "react";
import { Award, CheckCircle2, TrendingUp, AlertTriangle, Compass, BookOpen } from "lucide-react";

export default function DegreeAudit({
  student,
  enrolledCourses,
  totalCredits,
  onNavigateToCatalog
}) {
  const { degreeProgress } = student;

  // Calculate current semester contributions by category
  const currentCoreCredits = enrolledCourses
    .filter(c => c.type === "Program Core")
    .reduce((sum, c) => sum + c.credits, 0);

  const currentElectiveCredits = enrolledCourses
    .filter(c => c.type === "Professional Elective")
    .reduce((sum, c) => sum + c.credits, 0);

  const currentLabCredits = enrolledCourses
    .filter(c => c.type === "Laboratory")
    .reduce((sum, c) => sum + c.credits, 0);

  const currentOpenCredits = enrolledCourses
    .filter(c => c.type === "Open Elective")
    .reduce((sum, c) => sum + c.credits, 0);

  // Projected totals
  const totalCompletedAndEnrolled = degreeProgress.creditsCompletedPrior + totalCredits;
  const overallPercent = Math.min(100, Math.round((totalCompletedAndEnrolled / degreeProgress.totalCreditsRequired) * 100));

  const categories = [
    {
      title: "Program Core (PC)",
      required: degreeProgress.coreRequired,
      completedPrior: degreeProgress.coreCompleted,
      currentSemester: currentCoreCredits,
      color: "bg-blue-600",
      lightColor: "bg-blue-100",
      text: "text-blue-700"
    },
    {
      title: "Professional Electives (PE)",
      required: degreeProgress.electiveRequired,
      completedPrior: degreeProgress.electiveCompleted,
      currentSemester: currentElectiveCredits,
      color: "bg-purple-600",
      lightColor: "bg-purple-100",
      text: "text-purple-700"
    },
    {
      title: "Laboratory & Practical (L)",
      required: degreeProgress.labRequired,
      completedPrior: degreeProgress.labCompleted,
      currentSemester: currentLabCredits,
      color: "bg-teal-600",
      lightColor: "bg-teal-100",
      text: "text-teal-700"
    },
    {
      title: "Open Electives (OE)",
      required: degreeProgress.openRequired,
      completedPrior: degreeProgress.openCompleted,
      currentSemester: currentOpenCredits,
      color: "bg-amber-600",
      lightColor: "bg-amber-100",
      text: "text-amber-700"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Degree Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Award className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Curriculum Degree Audit</h2>
            </div>
            <p className="text-xs text-slate-500">
              Bachelor of Technology in Computer Science & Engineering (2022 - 2026 Batch)
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Current Cumulative GPA</span>
            <span className="text-2xl font-black text-emerald-600">{student.cgpa} / 10.0</span>
          </div>
        </div>

        {/* Overall Completion Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700">
              Overall Degree Completion ({totalCompletedAndEnrolled} / {degreeProgress.totalCreditsRequired} Credits)
            </span>
            <span className="text-indigo-600">{overallPercent}% towards graduation</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
            {/* Prior completed */}
            <div 
              className="bg-indigo-600 h-full" 
              style={{ width: `${(degreeProgress.creditsCompletedPrior / degreeProgress.totalCreditsRequired) * 100}%` }}
              title={`Completed prior: ${degreeProgress.creditsCompletedPrior} credits`}
            />
            {/* Current semester */}
            <div 
              className="bg-emerald-400 h-full animate-pulse" 
              style={{ width: `${(totalCredits / degreeProgress.totalCreditsRequired) * 100}%` }}
              title={`In-progress this semester: ${totalCredits} credits`}
            />
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-500 mt-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>Prior Semesters: {degreeProgress.creditsCompletedPrior} credits</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Current Term: {totalCredits} credits</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span>Remaining: {Math.max(0, degreeProgress.totalCreditsRequired - totalCompletedAndEnrolled)} credits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => {
          const totalCat = cat.completedPrior + cat.currentSemester;
          const percent = Math.min(100, Math.round((totalCat / cat.required) * 100));
          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cat.lightColor} ${cat.text}`}>
                  {cat.title}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {totalCat} / {cat.required} Credits ({percent}%)
                </span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-3">
                <div 
                  className={`h-full ${cat.color}`} 
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Earned Prior: {cat.completedPrior} cr</span>
                <span className="font-semibold text-slate-800">This Sem: +{cat.currentSemester} cr</span>
                <span>Remaining: {Math.max(0, cat.required - totalCat)} cr</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Academic Advice / Degree Tracker Notes */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-5">
        <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm mb-2">
          <Compass className="w-4 h-4 text-indigo-600" />
          <span>Academic Advisor Recommendation for Semester 5</span>
        </div>
        <p className="text-xs text-indigo-800 leading-relaxed mb-3">
          To maintain on-time graduation track, ensure enrollment in both <strong>Design & Analysis of Algorithms (CS501)</strong> and <strong>Operating Systems (CS502)</strong>. It is strongly advised to register for at least 1 laboratory course to fulfill practical requirements.
        </p>
        <button
          onClick={onNavigateToCatalog}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Explore Recommended Courses in Catalog →</span>
        </button>
      </div>
    </div>
  );
}
