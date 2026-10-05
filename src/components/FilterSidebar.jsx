import React from "react";
import { Filter, RotateCcw, CheckSquare, Square, Layers, BookOpen, Clock } from "lucide-react";
import { DEPARTMENTS, COURSE_TYPES, CREDIT_OPTIONS } from "../data/mockCourses";

export default function FilterSidebar({
  selectedDept,
  setSelectedDept,
  selectedType,
  setSelectedType,
  selectedCredits,
  setSelectedCredits,
  onlyAvailable,
  setOnlyAvailable,
  onResetFilters,
  totalAvailableCount,
  filteredCount
}) {
  const isFiltered = 
    selectedDept !== "All Departments" || 
    selectedType !== "All Types" || 
    selectedCredits !== "All Credits" || 
    onlyAvailable;

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-5">
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Filter Courses</span>
          </div>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Filter 1: Department */}
        <div className="pt-4 space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Department
          </label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Filter 2: Course Type */}
        <div className="pt-4 space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Course Category
          </label>
          <div className="space-y-1">
            {COURSE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  selectedType === type
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{type}</span>
                {selectedType === type && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Filter 3: Credits */}
        <div className="pt-4 space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Credit Hours
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {CREDIT_OPTIONS.map((cred) => (
              <button
                key={cred}
                onClick={() => setSelectedCredits(cred)}
                className={`px-2 py-1.5 text-xs rounded-md border text-center transition cursor-pointer ${
                  selectedCredits === cred
                    ? "bg-indigo-600 text-white border-indigo-600 font-semibold"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cred}
              </button>
            ))}
          </div>
        </div>

        {/* Filter 4: Available Seats Only Toggle */}
        <div className="pt-4 border-t border-slate-100 mt-4">
          <label 
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className="flex items-center space-x-2.5 cursor-pointer text-xs text-slate-700 select-none"
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center border transition ${
              onlyAvailable ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"
            }`}>
              {onlyAvailable && <span className="text-[10px] font-bold">✓</span>}
            </div>
            <span className="font-medium">Open Seats Only (Hide Full)</span>
          </label>
        </div>

        {/* Results summary pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-500">
            Showing <strong className="text-slate-800">{filteredCount}</strong> of {totalAvailableCount} courses
          </span>
        </div>
      </div>
    </aside>
  );
}
