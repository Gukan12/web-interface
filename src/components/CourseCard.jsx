import React from "react";
import { 
  Clock, 
  MapPin, 
  UserCheck, 
  AlertTriangle, 
  Check, 
  Plus, 
  ShoppingCart, 
  Info, 
  Users, 
  Bookmark, 
  BookmarkCheck 
} from "lucide-react";

export default function CourseCard({
  course,
  isEnrolled,
  isInCart,
  isWaitlisted,
  conflictInfo,
  onRegister,
  onDrop,
  onToggleCart,
  onJoinWaitlist,
  onViewDetails,
  totalCredits,
  maxCredits
}) {
  const seatsAvailable = Math.max(0, course.capacity - course.enrolledSeats);
  const isFull = seatsAvailable === 0;
  const fillPercentage = Math.min(100, Math.round((course.enrolledSeats / course.capacity) * 100));

  // Determine badge styling by course type
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case "Program Core":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Professional Elective":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Open Elective":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Laboratory":
        return "bg-teal-50 text-teal-700 border-teal-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Check if adding this course would exceed max credits limit
  const wouldExceedCredits = !isEnrolled && (totalCredits + course.credits > maxCredits);

  return (
    <div className={`relative bg-white rounded-xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden ${
      isEnrolled 
        ? "border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs" 
        : conflictInfo 
        ? "border-amber-300 bg-amber-50/20" 
        : "border-slate-200 hover:border-indigo-200"
    }`}>
      {/* Top Banner if Enrolled */}
      {isEnrolled && (
        <div className="bg-emerald-600 text-white text-[11px] font-semibold px-3 py-1 flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Enrolled in this Course</span>
          </span>
          <span className="text-emerald-100 font-mono text-[10px]">Slot {course.schedule?.slot}</span>
        </div>
      )}

      {/* Top Banner if Waitlisted */}
      {isWaitlisted && !isEnrolled && (
        <div className="bg-amber-500 text-white text-[11px] font-semibold px-3 py-1 flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>On Waitlist (#2 in queue)</span>
          </span>
          <span className="text-amber-100 font-mono text-[10px]">Full Capacity</span>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Header row: Code, Type, Credits */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white tracking-wide">
              {course.code}
            </span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${getTypeBadgeStyle(course.type)}`}>
              {course.type}
            </span>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 whitespace-nowrap">
            {course.credits} Credits • {course.ltp}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onViewDetails(course)}
          className="text-base font-bold text-slate-900 hover:text-indigo-600 transition cursor-pointer line-clamp-1 mb-1"
          title={course.title}
        >
          {course.title}
        </h3>

        {/* Department */}
        <p className="text-xs text-slate-500 font-medium mb-3">
          {course.department}
        </p>

        {/* Schedule & Venue Meta */}
        <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="font-medium text-slate-700">{course.schedule?.timeLabel}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 truncate">{course.venue}</span>
          </div>
        </div>

        {/* Faculty Instructor */}
        <div className="flex items-center space-x-2.5 mb-3.5">
          <img 
            src={course.instructor?.avatar} 
            alt={course.instructor?.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" 
          />
          <div className="text-xs">
            <span className="font-medium text-slate-800">{course.instructor?.name}</span>
            <span className="text-slate-400 ml-1.5 text-[11px]">({course.instructor?.office})</span>
          </div>
        </div>

        {/* Seat Availability Progress Bar */}
        <div className="mt-auto pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500 flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Seats: {course.enrolledSeats}/{course.capacity}</span>
            </span>
            <span className={`font-semibold text-[11px] ${
              isFull ? "text-rose-600" : seatsAvailable <= 5 ? "text-amber-600" : "text-emerald-600"
            }`}>
              {isFull ? "Course Full" : `${seatsAvailable} left`}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                isFull ? "bg-rose-500" : fillPercentage >= 85 ? "bg-amber-500" : "bg-emerald-500"
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        {/* Schedule Conflict Alert Banner if applicable */}
        {conflictInfo && !isEnrolled && (
          <div className="mt-3 p-2 rounded-md bg-amber-50 border border-amber-200 flex items-start space-x-1.5 text-xs text-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-tight text-[11px]">
              <strong className="font-semibold">Schedule Conflict:</strong> {conflictInfo.message}
            </div>
          </div>
        )}

        {/* Max credit limit warning */}
        {wouldExceedCredits && !conflictInfo && (
          <div className="mt-3 p-2 rounded-md bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px]">Adding will exceed {maxCredits} max credit limit</span>
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onViewDetails(course)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-md border border-transparent hover:border-slate-200 transition cursor-pointer"
            title="View Course Syllabus & Details"
          >
            <Info className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onToggleCart(course)}
            disabled={isEnrolled}
            className={`p-1.5 rounded-md border transition cursor-pointer ${
              isInCart 
                ? "bg-amber-100 text-amber-800 border-amber-300" 
                : isEnrolled
                ? "opacity-30 cursor-not-allowed text-slate-400 border-transparent"
                : "text-slate-500 hover:text-amber-700 hover:bg-white border-transparent hover:border-slate-200"
            }`}
            title={isInCart ? "Remove from Course Cart" : "Add to Course Cart"}
          >
            {isInCart ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Action Button */}
        {isEnrolled ? (
          <button
            onClick={() => onDrop(course)}
            className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50 border border-rose-200 rounded-lg transition cursor-pointer"
          >
            Drop Course
          </button>
        ) : isWaitlisted ? (
          <button
            onClick={() => onDrop(course)}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-white border border-slate-300 rounded-lg transition cursor-pointer"
          >
            Leave Waitlist
          </button>
        ) : isFull ? (
          <button
            onClick={() => onJoinWaitlist(course)}
            className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition cursor-pointer"
          >
            Join Waitlist
          </button>
        ) : (
          <button
            onClick={() => onRegister(course)}
            disabled={Boolean(conflictInfo) || wouldExceedCredits}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1 transition cursor-pointer ${
              conflictInfo || wouldExceedCredits
                ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
        )}
      </div>
    </div>
  );
}
