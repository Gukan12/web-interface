import React from "react";
import { 
  CheckCircle2, 
  Trash2, 
  Printer, 
  BookOpen, 
  AlertCircle, 
  Clock, 
  MapPin, 
  User, 
  ShieldCheck, 
  FileText 
} from "lucide-react";

export default function EnrolledCourses({
  enrolledCourses,
  waitlistCourses,
  totalCredits,
  minCredits,
  maxCredits,
  onDrop,
  onViewDetails,
  onNavigateToCatalog,
  onOpenPrintSlip,
  student
}) {
  const isBelowMin = totalCredits < minCredits;
  const isOptimal = totalCredits >= minCredits && totalCredits <= 22;

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Registered Courses */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Courses Enrolled</span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              {enrolledCourses.length}
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{enrolledCourses.length}</p>
          <p className="text-xs text-slate-500 mt-1">Active registrations this semester</p>
        </div>

        {/* Card 2: Total Credits */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Credits Enrolled</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isBelowMin ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
            }`}>
              {totalCredits} / {maxCredits}
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalCredits} <span className="text-sm font-normal text-slate-500">Credits</span></p>
          <p className="text-xs text-slate-500 mt-1">
            {isBelowMin ? `Add ${minCredits - totalCredits} more to meet minimum` : "Academic load compliant"}
          </p>
        </div>

        {/* Card 3: Academic Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enrollment Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg font-bold text-slate-900 mt-2 flex items-center space-x-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isBelowMin ? "bg-amber-500" : "bg-emerald-500"}`} />
            <span>{isBelowMin ? "Under Minimum Load" : "Registration Valid"}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">Min: {minCredits} • Max: {maxCredits} credits</p>
        </div>

        {/* Card 4: Official Slip Action */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-900 font-bold text-xs">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Official Slip</span>
            </div>
            <p className="text-xs text-indigo-700 mt-1">
              Download or print signed course enrollment receipt.
            </p>
          </div>
          <button
            onClick={onOpenPrintSlip}
            disabled={enrolledCourses.length === 0}
            className={`mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer ${
              enrolledCourses.length === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Slip</span>
          </button>
        </div>
      </div>

      {/* Warning banner if below minimum credits */}
      {isBelowMin && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-amber-950">Underload Warning: Below Minimum Credit Limit</h4>
            <p className="mt-0.5 text-amber-800">
              University regulations require a minimum of <strong>{minCredits} credits</strong> per regular semester. You currently have registered for only <strong>{totalCredits} credits</strong>. Please register for additional core or elective subjects before the registration deadline.
            </p>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="px-3 py-1.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition shrink-0 cursor-pointer"
          >
            Add Courses
          </button>
        </div>
      )}

      {/* Enrolled Courses Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Enrolled Courses Summary</h3>
            <p className="text-xs text-slate-500">
              Semester 5 (Fall 2025) • Choice Based Credit System
            </p>
          </div>

          <button
            onClick={onNavigateToCatalog}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Browse Catalog to Add More</span>
          </button>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No Courses Registered Yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Please go to the Course Catalog to choose your subjects for the semester.
            </p>
            <button
              onClick={onNavigateToCatalog}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            >
              Browse Course Catalog
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Course Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Credits</th>
                  <th className="py-3 px-4">Schedule & Slot</th>
                  <th className="py-3 px-4">Instructor</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enrolledCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {course.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div 
                        onClick={() => onViewDetails(course)}
                        className="font-semibold text-slate-900 hover:text-indigo-600 transition cursor-pointer"
                      >
                        {course.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{course.venue}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {course.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {course.credits} <span className="font-normal text-[10px] text-slate-400">({course.ltp})</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700">{course.schedule?.timeLabel}</div>
                      <div className="text-[10px] font-mono text-indigo-600 font-semibold">Slot {course.schedule?.slot}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium">{course.instructor?.name}</div>
                      <div className="text-[10px] text-slate-400">{course.instructor?.office}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => onViewDetails(course)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onDrop(course)}
                        className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold transition cursor-pointer"
                      >
                        Drop
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/80 font-bold border-t border-slate-200 text-slate-900">
                  <td colSpan="3" className="py-3 px-4 text-right uppercase tracking-wider text-[11px]">
                    Total Registered Credits:
                  </td>
                  <td className="py-3 px-4 text-indigo-600 text-sm">
                    {totalCredits} Credits
                  </td>
                  <td colSpan="3" className="py-3 px-4 text-right text-xs text-slate-500">
                    Max Allowed: {maxCredits} Credits
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Waitlist Section if Any */}
      {waitlistCourses.length > 0 && (
        <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-xs">
          <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm mb-3">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Waitlisted Courses ({waitlistCourses.length})</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            You are in line for the following courses. If a registered student drops, you will be offered enrollment automatically.
          </p>
          <div className="space-y-2">
            {waitlistCourses.map((c) => (
              <div 
                key={c.id}
                className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-slate-900 mr-2">{c.code}</span>
                  <span className="font-semibold text-slate-800">{c.title}</span>
                  <span className="text-slate-500 ml-2">({c.credits} credits)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
                    Waitlist Position: #2
                  </span>
                  <button
                    onClick={() => onDrop(c)}
                    className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                  >
                    Leave
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
