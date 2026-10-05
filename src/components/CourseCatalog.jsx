import React from "react";
import { Search, X, SlidersHorizontal, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import CourseCard from "./CourseCard";

export default function CourseCatalog({
  courses,
  filteredCourses,
  searchKeyword,
  setSearchKeyword,
  searchInputRef,
  selectedDept,
  setSelectedDept,
  selectedType,
  setSelectedType,
  selectedCredits,
  setSelectedCredits,
  onlyAvailable,
  setOnlyAvailable,
  sortBy,
  setSortBy,
  onResetFilters,
  enrolledCourseIds,
  cartCourseIds,
  waitlistCourseIds,
  conflictsMap,
  onRegister,
  onDrop,
  onToggleCart,
  onJoinWaitlist,
  onViewDetails,
  totalCredits,
  maxCredits,
  onNavigateToSchedule
}) {
  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-2xl text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Choice Based Credit System (CBCS) • Semester 5</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic Course Registration
          </h2>
          <p className="text-indigo-200 text-sm mt-2 leading-relaxed">
            Select program core and elective subjects for the upcoming semester. System performs automated schedule conflict detection and credit load validation.
          </p>
          
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={onNavigateToSchedule}
              className="bg-white text-indigo-900 font-bold px-4 py-2 rounded-lg hover:bg-indigo-50 transition shadow-xs cursor-pointer flex items-center space-x-1.5"
            >
              <span>View Your Timetable</span>
              <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded text-[11px]">
                {enrolledCourseIds.length} enrolled
              </span>
            </button>
            <span className="text-indigo-300">
              Credit Window: <strong>14 min – 24 max credits</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Search & Sort Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input (with useRef programmatic focus) */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search by course code, title, instructor..."
            className="w-full text-xs pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition cursor-pointer"
          >
            <option value="code">Course Code (A - Z)</option>
            <option value="title">Course Title (A - Z)</option>
            <option value="credits-high">Credits (High to Low)</option>
            <option value="credits-low">Credits (Low to High)</option>
            <option value="seats">Seats Available</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Filter Sidebar */}
        <FilterSidebar
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCredits={selectedCredits}
          setSelectedCredits={setSelectedCredits}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          onResetFilters={onResetFilters}
          totalAvailableCount={courses.length}
          filteredCount={filteredCourses.length}
        />

        {/* Right Courses Grid */}
        <main className="flex-1 w-full">
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No courses match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Try loosening your filters, checking different department tabs, or clearing your search keywords.
              </p>
              <button
                onClick={onResetFilters}
                className="text-xs font-semibold px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={enrolledCourseIds.includes(course.id)}
                  isInCart={cartCourseIds.includes(course.id)}
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
        </main>
      </div>
    </div>
  );
}
