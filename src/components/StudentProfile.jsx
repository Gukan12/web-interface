import React from "react";
import { User, Mail, Phone, BookOpen, Award, CheckCircle, ShieldCheck, Calendar, Briefcase } from "lucide-react";

export default function StudentProfile({ student, enrolledCount, totalCredits }) {
  return (
    <div className="space-y-6">
      {/* Student Banner Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-32 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600" />
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-12 gap-4">
            <div className="flex items-end space-x-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover bg-white"
              />
              <div className="mb-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Active Student</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Register No: <strong className="font-mono text-slate-800">{student.regNo}</strong> • Roll: <strong className="font-mono text-slate-800">{student.rollNo}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-center">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Cumulative GPA</span>
                <span className="text-lg font-black text-indigo-700">{student.cgpa}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-center">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Sem</span>
                <span className="text-lg font-black text-slate-800">Sem {student.semester}</span>
              </div>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-2 text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>{student.program} ({student.department})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic Advisor */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Assigned Faculty Mentor
            </h3>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                AR
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{student.advisor.name}</h4>
                <p className="text-xs text-slate-500">{student.advisor.designation}</p>
                <p className="text-xs text-indigo-600 font-mono mt-1">{student.advisor.email}</p>
                <p className="text-xs text-slate-500 mt-0.5">Office: {student.advisor.cabin}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              CBCS Credit Rules
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-500">Minimum Allowed:</span>
                <span className="font-bold text-slate-800">{student.creditLimits.minCredits} Credits</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-500">Recommended Load:</span>
                <span className="font-bold text-slate-800">{student.creditLimits.recommendedCredits} Credits</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-slate-100">
                <span className="text-slate-500">Maximum Allowed:</span>
                <span className="font-bold text-slate-800">{student.creditLimits.maxCredits} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Registration:</span>
                <span className="font-black text-indigo-600">{totalCredits} Credits ({enrolledCount} courses)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Transcript History (Completed Courses for Prereqs) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Completed Courses Transcript</h3>
              <p className="text-xs text-slate-500">Grades earned in Semesters 1 through 4 (qualifying prerequisites)</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Standing: First Class with Distinction
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3">Sem</th>
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Course Title</th>
                  <th className="py-2.5 px-3">Credits</th>
                  <th className="py-2.5 px-3 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {student.completedCourses.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition">
                    <td className="py-2 px-3 font-mono text-slate-400">S{c.sem}</td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-900">{c.code}</td>
                    <td className="py-2 px-3 font-medium text-slate-800">{c.title}</td>
                    <td className="py-2 px-3">{c.credits}</td>
                    <td className="py-2 px-3 text-right font-black">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        c.grade === "O" ? "bg-purple-100 text-purple-800" :
                        c.grade === "A+" ? "bg-emerald-100 text-emerald-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {c.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
