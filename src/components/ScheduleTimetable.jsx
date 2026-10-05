import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  Info, 
  BookOpen 
} from "lucide-react";

export default function ScheduleTimetable({
  enrolledCourses,
  onViewDetails,
  onNavigateToCatalog,
  onOpenPrintSlip
}) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const dayNames = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday"
  };

  // Distinct color palettes for courses on timetable
  const courseColors = [
    { bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-900", badge: "bg-blue-600 text-white" },
    { bg: "bg-emerald-100", border: "border-emerald-300", text: "text-emerald-900", badge: "bg-emerald-600 text-white" },
    { bg: "bg-purple-100", border: "border-purple-300", text: "text-purple-900", badge: "bg-purple-600 text-white" },
    { bg: "bg-amber-100", border: "border-amber-300", text: "text-amber-900", badge: "bg-amber-600 text-white" },
    { bg: "bg-rose-100", border: "border-rose-300", text: "text-rose-900", badge: "bg-rose-600 text-white" },
    { bg: "bg-teal-100", border: "border-teal-300", text: "text-teal-900", badge: "bg-teal-600 text-white" }
  ];

  // Assign a consistent color to each course by index
  const getColorForCourse = (courseId) => {
    const idx = enrolledCourses.findIndex(c => c.id === courseId);
    return courseColors[(idx >= 0 ? idx : 0) % courseColors.length];
  };

  // Organize enrolled courses by day of week
  const scheduleByDay = days.reduce((acc, day) => {
    acc[day] = enrolledCourses.filter(c => c.schedule?.days?.includes(day))
      .sort((a, b) => a.schedule.startTime.localeCompare(b.schedule.startTime));
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Timetable Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">Weekly Academic Schedule</h2>
          </div>
          <p className="text-xs text-slate-500">
            Visual timetable for enrolled courses • Choice Based Credit System
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={onOpenPrintSlip}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Timetable Slip</span>
          </button>
          <button
            onClick={onNavigateToCatalog}
            className="flex items-center space-x-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse More Courses</span>
          </button>
        </div>
      </div>

      {/* If no courses enrolled */}
      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Your Timetable is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            You haven't registered for any courses yet. Browse the course catalog to select your subjects and build your schedule.
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Browse Course Catalog
          </button>
        </div>
      ) : (
        /* Visual 5-Day Weekly Timetable Grid */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {days.map((day) => {
            const dayClasses = scheduleByDay[day] || [];
            return (
              <div 
                key={day} 
                className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-xs"
              >
                {/* Day Header */}
                <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider">{dayNames[day]}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {dayClasses.length} {dayClasses.length === 1 ? "class" : "classes"}
                  </span>
                </div>

                {/* Day Classes List */}
                <div className="p-2.5 flex-1 space-y-2.5 min-h-[360px] bg-slate-50/50">
                  {dayClasses.length === 0 ? (
                    <div className="h-full flex items-center justify-center p-6 text-center text-slate-400 text-xs italic">
                      No classes scheduled
                    </div>
                  ) : (
                    dayClasses.map((course) => {
                      const theme = getColorForCourse(course.id);
                      return (
                        <div
                          key={course.id}
                          onClick={() => onViewDetails(course)}
                          className={`p-3 rounded-lg border ${theme.bg} ${theme.border} ${theme.text} transition-all duration-150 hover:shadow-sm cursor-pointer relative group`}
                        >
                          {/* Slot Tag & Code */}
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${theme.badge}`}>
                              {course.code}
                            </span>
                            <span className="text-[10px] font-mono opacity-75 font-semibold">
                              Slot {course.schedule?.slot}
                            </span>
                          </div>

                          {/* Course Title */}
                          <h4 className="text-xs font-bold leading-snug line-clamp-2 mb-2">
                            {course.title}
                          </h4>

                          {/* Time */}
                          <div className="flex items-center space-x-1 text-[11px] opacity-85 mb-1 font-medium">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>{course.schedule?.startTime} - {course.schedule?.endTime}</span>
                          </div>

                          {/* Classroom Venue */}
                          <div className="flex items-center space-x-1 text-[10px] opacity-75 truncate">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{course.venue}</span>
                          </div>

                          {/* Hover tooltip hint */}
                          <div className="mt-2 pt-1 border-t border-black/10 flex items-center justify-between text-[9px] opacity-70">
                            <span>{course.credits} Credits</span>
                            <span className="group-hover:underline">Click for details →</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Timetable Legend & Summary */}
      {enrolledCourses.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Schedule Legend & Academic Venues
          </h4>
          <div className="flex flex-wrap gap-3">
            {enrolledCourses.map((c) => {
              const theme = getColorForCourse(c.id);
              return (
                <div 
                  key={c.id} 
                  onClick={() => onViewDetails(c)}
                  className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200 hover:border-indigo-300 transition cursor-pointer"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${theme.badge}`} />
                  <span className="font-bold">{c.code}:</span>
                  <span className="text-slate-600 truncate max-w-xs">{c.title} ({c.venue})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
