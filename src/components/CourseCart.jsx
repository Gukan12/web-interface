import React from "react";
import { ShoppingCart, Trash2, Plus, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import CourseCard from "./CourseCard";

export default function CourseCart({
  cartCourses,
  enrolledCourseIds,
  cartCourseIds,
  waitlistCourseIds,
  conflictsMap,
  onRegister,
  onDrop,
  onToggleCart,
  onJoinWaitlist,
  onViewDetails,
  onRegisterAllCart,
  onClearCart,
  onNavigateToCatalog,
  totalCredits,
  maxCredits
}) {
  const cartCredits = cartCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <ShoppingCart className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">Staged Course Cart</h2>
          </div>
          <p className="text-xs text-slate-500">
            Stage subjects here to review your workload before confirming formal enrollment.
          </p>
        </div>

        {cartCourses.length > 0 && (
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={onClearCart}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition cursor-pointer"
            >
              Clear Cart
            </button>
            <button
              onClick={onRegisterAllCart}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition shadow-xs cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Register All Eligible ({cartCredits} Cr)</span>
            </button>
          </div>
        )}
      </div>

      {cartCourses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Your Course Cart is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            You can bookmark courses from the course catalog to compare schedules and credit weights before registering.
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Browse Course Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cartCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledCourseIds.includes(course.id)}
              isInCart={true}
              isWaitlisted={waitlistCourseIds.includes(course.id)}
              conflictInfo={conflictsMap[course.id]}
              onRegister={onRegister}
              onDrop={onDrop}
              onToggleCart={onToggleCart}
              onJoinWaitlist={onJoinWaitlist}
              onViewDetails={onViewDetails}
              totalCredits={totalCredits}
              maxCredits={maxCredits}
            />
          ))}
        </div>
      )}
    </div>
  );
}
