import React from "react";
import { 
  X, 
  Clock, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Users, 
  Calendar, 
  Plus, 
  Trash2, 
  Bookmark, 
  BookmarkCheck,
  Check
} from "lucide-react";

export default function CourseDetailModal({
  course,
  onClose,
  isEnrolled,
  isInCart,
  isWaitlisted,
  conflictInfo,
  onRegister,
  onDrop,
  onToggleCart,
  onJoinWaitlist,
  student,
  totalCredits,
  maxCredits
}) {
  if (!course) return null;

  const seatsAvailable = Math.max(0, course.capacity - course.enrolledSeats);
  const isFull = seatsAvailable === 0;
  const wouldExceed = !isEnrolled && (totalCredits + course.credits > maxCredits);

  // Check which prerequisites student has completed
  const completedCodes = (student.completedCourses || []).map(c => c.code);
  const prereqStatus = (course.prerequisites || []).map(prereq => {
    // extract code prefix like "CS201"
    const codeMatch = prereq.match(/^[A-Z0-9]+/);
    const code = codeMatch ? codeMatch[0] : "";
    const isCompleted = completedCodes.includes(code);
    return { name: prereq, isCompleted };
  });

  const allPrereqsMet = prereqStatus.every(p => p.isCompleted);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white">
                {course.code}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {course.type}
              </span>
              <span className="text-xs font-bold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded">
                {course.credits} Credits • {course.ltp}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {course.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{course.department}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Conflict Warning */}
          {conflictInfo && !isEnrolled && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start space-x-2 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block">Schedule Clash Detected:</strong>
                <span>{conflictInfo.message}. You cannot register for two classes scheduled at the same time.</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Course Description
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
            <div className="flex items-start space-x-2.5">
              <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">Class Schedule & Slot:</span>
                <span className="font-semibold text-slate-800">{course.schedule?.timeLabel} (Slot {course.schedule?.slot})</span>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">Location / Classroom:</span>
                <span className="font-semibold text-slate-800">{course.venue}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <Users className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">Capacity & Enrollment:</span>
                <span className="font-semibold text-slate-800">
                  {course.enrolledSeats} / {course.capacity} ({seatsAvailable} seats remaining)
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <UserCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">Instructor:</span>
                <span className="font-semibold text-slate-800">{course.instructor?.name} ({course.instructor?.office})</span>
              </div>
            </div>
          </div>

          {/* Prerequisites Status */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Prerequisites Evaluation
            </h4>
            {course.prerequisites && course.prerequisites.length > 0 ? (
              <div className="space-y-1.5">
                {prereqStatus.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg border ${
                      item.isCompleted 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                        : "bg-rose-50 border-rose-200 text-rose-800"
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="flex items-center space-x-1 font-semibold text-[11px]">
                      {item.isCompleted ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Satisfied (Passed)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Not Met</span>
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                No formal prerequisites required. Open for enrollment.
              </p>
            )}
          </div>

          {/* Syllabus Modules */}
          {course.syllabus && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Curriculum Modules & Outcomes</span>
              </h4>
              <ul className="space-y-2">
                {course.syllabus.map((topic, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs text-slate-700">
                    <span className="font-bold text-indigo-600 font-mono">0{index + 1}.</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleCart(course)}
            disabled={isEnrolled}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center space-x-1.5 transition cursor-pointer ${
              isInCart 
                ? "bg-amber-100 border-amber-300 text-amber-800" 
                : isEnrolled
                ? "opacity-30 cursor-not-allowed border-transparent text-slate-400"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {isInCart ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
            <span>{isInCart ? "Remove from Cart" : "Save to Cart"}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              Close
            </button>

            {isEnrolled ? (
              <button
                onClick={() => {
                  onDrop(course);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Drop Course</span>
              </button>
            ) : isWaitlisted ? (
              <button
                onClick={() => {
                  onDrop(course);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition cursor-pointer"
              >
                Leave Waitlist
              </button>
            ) : isFull ? (
              <button
                onClick={() => {
                  onJoinWaitlist(course);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-200 hover:bg-amber-300 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Join Waitlist</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onRegister(course);
                  onClose();
                }}
                disabled={Boolean(conflictInfo) || wouldExceed || !allPrereqsMet}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg flex items-center space-x-1.5 transition cursor-pointer shadow-xs ${
                  conflictInfo || wouldExceed || !allPrereqsMet
                    ? "bg-slate-300 cursor-not-allowed text-slate-500"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Register for Course</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
