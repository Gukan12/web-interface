import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { initialCourses, studentInfo } from "./data/coursesData";

/**
 * Experiment 11: College Course Registration System
 * Student Name: Gukan Nithish
 * Register Number: 717822P101
 * Department: B.Tech Computer Science and Engineering (Semester 5)
 * 
 * Objective:
 * To design and implement a College Course Registration System using React Functional Components
 * and essential React Hooks: useState, useEffect, useRef, useMemo, and useCallback.
 */

export default function App() {
  // =========================================================================
  // 1. useState: Managing component state
  // =========================================================================
  const [courses, setCourses] = useState(initialCourses);
  const [enrolledIds, setEnrolledIds] = useState(() => {
    // Load previously enrolled courses from localStorage or default to first 3 subjects
    const saved = localStorage.getItem("enrolled_courses");
    return saved ? JSON.parse(saved) : [1, 2, 8];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'timetable'
  const [showSlip, setShowSlip] = useState(false);

  // Helper to show temporary alerts
  const showAlert = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // =========================================================================
  // 2. useRef: Referencing DOM elements for programmatic focus
  // =========================================================================
  const searchInputRef = useRef(null);

  // Focus the search box on demand
  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // =========================================================================
  // 3. useEffect: Managing side-effects
  // =========================================================================
  // Side Effect 1: Persist enrolled courses into localStorage whenever enrolledIds changes
  useEffect(() => {
    localStorage.setItem("enrolled_courses", JSON.stringify(enrolledIds));
  }, [enrolledIds]);

  // =========================================================================
  // 4. useMemo: Caching computationally derived values
  // =========================================================================
  // Compute enrolled course objects from enrolled IDs
  const enrolledCourses = useMemo(() => {
    return courses.filter((c) => enrolledIds.includes(c.id));
  }, [courses, enrolledIds]);

  // Compute total credits enrolled
  const totalCredits = useMemo(() => {
    return enrolledCourses.reduce((sum, course) => sum + course.credits, 0);
  }, [enrolledCourses]);

  // Side Effect 2: Update browser document title based on registered credits
  useEffect(() => {
    document.title = `(${totalCredits} Cr) Course Registration - Gukan Nithish`;
  }, [totalCredits]);

  // Filter available courses based on search keyword and category
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.faculty.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  // =========================================================================
  // 5. useCallback: Memoizing action handlers to avoid recreating functions
  // =========================================================================
  // Enroll in a course with credit limit validation
  const handleEnroll = useCallback(
    (course) => {
      // Check if already enrolled
      if (enrolledIds.includes(course.id)) {
        showAlert(`You are already enrolled in ${course.code}!`, "warning");
        return;
      }

      // Check credit limit (max 24 credits)
      if (totalCredits + course.credits > studentInfo.maxCredits) {
        showAlert(
          `Cannot register! Maximum credit limit of ${studentInfo.maxCredits} will be exceeded.`,
          "error"
        );
        return;
      }

      // Check available seats
      if (course.enrolled >= course.seats) {
        showAlert(`Course ${course.code} is full!`, "error");
        return;
      }

      // Add to enrolled list and update seats count
      setEnrolledIds((prev) => [...prev, course.id]);
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === course.id ? { ...c, enrolled: c.enrolled + 1 } : c
        )
      );

      showAlert(`Successfully registered for ${course.code} - ${course.name}`, "success");
    },
    [enrolledIds, totalCredits]
  );

  // Drop an enrolled course
  const handleDrop = useCallback((courseId) => {
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === courseId ? { ...c, enrolled: Math.max(0, c.enrolled - 1) } : c
      )
    );
    showAlert("Course dropped successfully.", "info");
  }, []);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ================================================================= */}
        {/* College Header & Student Information Banner                       */}
        {/* ================================================================= */}
        <header className="bg-white border-t-4 border-blue-600 rounded-lg shadow-sm p-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Experiment 11 • React Hooks
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                College Course Registration System
              </h1>
              <p className="text-sm text-gray-600">
                {studentInfo.college} • Academic Year {studentInfo.academicYear}
              </p>
            </div>

            {/* Student ID Card Badge */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-700 min-w-[240px]">
              <div className="flex justify-between border-b border-gray-200 pb-1 mb-1">
                <span className="text-gray-500 font-medium">Student:</span>
                <span className="font-bold text-gray-900">{studentInfo.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1 mb-1">
                <span className="text-gray-500 font-medium">Reg No:</span>
                <span className="font-mono font-bold text-blue-700">{studentInfo.regNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Branch & Sem:</span>
                <span>CSE • Semester {studentInfo.semester}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================= */}
        {/* Alert / Notification Message                                      */}
        {/* ================================================================= */}
        {message.text && (
          <div
            className={`p-3.5 rounded-lg text-sm font-medium border flex items-center justify-between ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : message.type === "error"
                ? "bg-red-50 text-red-800 border-red-200"
                : message.type === "warning"
                ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                : "bg-blue-50 text-blue-800 border-blue-200"
            }`}
          >
            <span>{message.text}</span>
            <button
              onClick={() => setMessage({ text: "", type: "" })}
              className="text-xs font-bold px-2 py-0.5 hover:opacity-75 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* Semester Credit Progress Summary Bar                              */}
        {/* ================================================================= */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
            <div>
              <span className="text-sm font-bold text-gray-800">
                Registered Credits: <span className="text-blue-600 text-base">{totalCredits}</span> / {studentInfo.maxCredits} Credits
              </span>
              <span className="text-xs text-gray-500 ml-2">
                (Min: {studentInfo.minCredits} • Max: {studentInfo.maxCredits})
              </span>
            </div>

            <div>
              {totalCredits < studentInfo.minCredits ? (
                <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded">
                  ⚠️ Below Minimum Limit (Add {studentInfo.minCredits - totalCredits} more credits)
                </span>
              ) : (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded">
                  ✓ Valid Credit Load
                </span>
              )}
            </div>
          </div>

          {/* Simple Visual Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                totalCredits > studentInfo.maxCredits
                  ? "bg-red-500"
                  : totalCredits >= studentInfo.minCredits
                  ? "bg-green-600"
                  : "bg-amber-500"
              }`}
              style={{
                width: `${Math.min(100, (totalCredits / studentInfo.maxCredits) * 100)}%`
              }}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* Main Content Grid: Left (Catalog) | Right (Enrolled Courses)     */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* --------------------------------------------------------------- */}
          {/* LEFT SIDE: Course Catalog & Search (Col 7)                     */}
          {/* --------------------------------------------------------------- */}
          <section className="lg:col-span-7 bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-bold text-gray-900">
                Available Courses ({filteredCourses.length})
              </h2>
              <button
                onClick={handleFocusSearch}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded font-medium cursor-pointer"
                title="Use useRef hook to focus input"
              >
                🔍 Focus Search Box
              </button>
            </div>

            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search course by name, code, or faculty..."
                className="flex-1 text-sm border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Core">Core</option>
                <option value="Elective">Elective</option>
                <option value="Lab">Lab</option>
              </select>

              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-blue-600 hover:underline px-2 py-1 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Courses List Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No courses found matching your search.
                </div>
              ) : (
                filteredCourses.map((course) => {
                  const isEnrolled = enrolledIds.includes(course.id);
                  const isFull = course.enrolled >= course.seats;

                  return (
                    <div
                      key={course.id}
                      className={`p-3.5 border rounded-lg transition ${
                        isEnrolled
                          ? "bg-green-50/60 border-green-300"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-xs bg-gray-800 text-white px-2 py-0.5 rounded">
                              {course.code}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded font-medium ${
                                course.category === "Core"
                                  ? "bg-blue-100 text-blue-800"
                                  : course.category === "Elective"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-teal-100 text-teal-800"
                              }`}
                            >
                              {course.category}
                            </span>
                            <span className="text-xs font-semibold text-gray-600">
                              {course.credits} Credits
                            </span>
                          </div>

                          <h3 className="font-bold text-sm text-gray-900 mt-1">
                            {course.name}
                          </h3>

                          <p className="text-xs text-gray-500 mt-0.5">
                            Faculty: <span className="text-gray-700">{course.faculty}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            Schedule: <span className="text-gray-700">{course.timing}</span>
                          </p>
                        </div>

                        {/* Register / Status Button */}
                        <div className="text-right shrink-0">
                          <span className="block text-[11px] text-gray-500 mb-1.5">
                            Seats: {course.enrolled} / {course.seats}
                          </span>

                          {isEnrolled ? (
                            <button
                              onClick={() => handleDrop(course.id)}
                              className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded border border-red-200 transition cursor-pointer"
                            >
                              Drop Course
                            </button>
                          ) : isFull ? (
                            <span className="px-3 py-1 bg-gray-200 text-gray-500 text-xs font-semibold rounded inline-block">
                              Full
                            </span>
                          ) : (
                            <button
                              onClick={() => handleEnroll(course)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded shadow-xs transition cursor-pointer"
                            >
                              + Register
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* --------------------------------------------------------------- */}
          {/* RIGHT SIDE: Enrolled Courses Table & Actions (Col 5)            */}
          {/* --------------------------------------------------------------- */}
          <section className="lg:col-span-5 space-y-5">
            
            {/* Registered Courses Box */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    My Registered Courses ({enrolledCourses.length})
                  </h2>
                  <p className="text-xs text-gray-500">Semester 5 Registration Table</p>
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => setViewMode(viewMode === "table" ? "timetable" : "table")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded text-gray-700 font-medium cursor-pointer"
                  >
                    {viewMode === "table" ? "📅 View Timetable" : "📋 View Table"}
                  </button>
                </div>
              </div>

              {/* View 1: Simple Table View */}
              {viewMode === "table" ? (
                enrolledCourses.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-xs border border-dashed rounded-lg">
                    No courses enrolled yet. Select subjects from the left catalog to register.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-gray-50 text-gray-700 border-b">
                        <tr>
                          <th className="py-2 px-2.5">Code</th>
                          <th className="py-2 px-2.5">Title</th>
                          <th className="py-2 px-1.5 text-center">Cr</th>
                          <th className="py-2 px-2.5 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {enrolledCourses.map((c) => (
                          <tr key={c.id} className="hover:bg-gray-50">
                            <td className="py-2 px-2.5 font-mono font-bold text-gray-900">
                              {c.code}
                            </td>
                            <td className="py-2 px-2.5">
                              <div className="font-semibold text-gray-800 leading-tight">
                                {c.name}
                              </div>
                              <div className="text-[10px] text-gray-500">{c.category}</div>
                            </td>
                            <td className="py-2 px-1.5 text-center font-bold text-blue-700">
                              {c.credits}
                            </td>
                            <td className="py-2 px-2.5 text-center">
                              <button
                                onClick={() => handleDrop(c.id)}
                                className="text-[11px] text-red-600 hover:text-red-800 font-medium hover:underline cursor-pointer"
                              >
                                Drop
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 font-bold border-t border-gray-200">
                        <tr>
                          <td colSpan="2" className="py-2 px-2.5 text-right">
                            Total Credits:
                          </td>
                          <td className="py-2 px-1.5 text-center text-blue-700">
                            {totalCredits}
                          </td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )
              ) : (
                /* View 2: Weekly Schedule Timetable */
                <div className="space-y-2 text-xs">
                  {enrolledCourses.length === 0 ? (
                    <div className="text-center py-6 text-gray-400">No courses scheduled.</div>
                  ) : (
                    enrolledCourses.map((c) => (
                      <div
                        key={c.id}
                        className="p-2.5 bg-blue-50/60 border border-blue-200 rounded flex justify-between items-center"
                      >
                        <div>
                          <span className="font-mono font-bold text-blue-900">{c.code}: </span>
                          <span className="font-semibold text-gray-800">{c.name}</span>
                          <div className="text-gray-500 text-[11px] mt-0.5">{c.timing}</div>
                        </div>
                        <span className="text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-800">
                          {c.credits} Cr
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Action: Generate Registration Slip */}
              <button
                onClick={() => setShowSlip(true)}
                disabled={enrolledCourses.length === 0}
                className={`w-full py-2 px-4 rounded text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  enrolledCourses.length === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-black text-white cursor-pointer"
                }`}
              >
                <span>🖨️ Print Registration Slip</span>
              </button>
            </div>

            {/* Experiment 11 Viva Cheatsheet (Shows teacher you understand all hooks) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-xs space-y-2">
              <h3 className="font-bold text-gray-900 border-b pb-1">
                📌 React Hooks Used in this Project (Lab Viva)
              </h3>
              <ul className="space-y-1.5 text-gray-600">
                <li>
                  <strong className="text-blue-700 font-mono">useState:</strong> Manages courses, enrolled IDs, search keyword, category, and alerts.
                </li>
                <li>
                  <strong className="text-blue-700 font-mono">useEffect:</strong> Syncs registered courses to <code className="bg-gray-100 px-1 rounded">localStorage</code> and updates document title.
                </li>
                <li>
                  <strong className="text-blue-700 font-mono">useRef:</strong> Programmatically focuses the course search input element without re-renders.
                </li>
                <li>
                  <strong className="text-blue-700 font-mono">useMemo:</strong> Caches filtered courses list and computes total credits dynamically.
                </li>
                <li>
                  <strong className="text-blue-700 font-mono">useCallback:</strong> Memoizes <code className="bg-gray-100 px-1 rounded">handleEnroll</code> and <code className="bg-gray-100 px-1 rounded">handleDrop</code> to prevent unnecessary re-creations.
                </li>
              </ul>
            </div>

          </section>
        </div>

        {/* ================================================================= */}
        {/* Printable Official Registration Slip Modal                        */}
        {/* ================================================================= */}
        {showSlip && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-lg shadow-xl border border-gray-300 p-6 space-y-4">
              <div className="text-center border-b pb-3">
                <h3 className="font-bold text-base uppercase text-gray-900">
                  {studentInfo.college}
                </h3>
                <p className="text-xs text-gray-500">
                  Office of Academic Affairs • Course Registration Slip (Semester {studentInfo.semester})
                </p>
              </div>

              {/* Student Metadata */}
              <div className="bg-gray-50 p-3 rounded border text-xs grid grid-cols-2 gap-2 text-gray-700">
                <div><strong>Student:</strong> {studentInfo.name}</div>
                <div><strong>Reg No:</strong> {studentInfo.regNo}</div>
                <div><strong>Roll No:</strong> {studentInfo.rollNo}</div>
                <div><strong>Department:</strong> {studentInfo.department}</div>
              </div>

              {/* Registered Courses Table */}
              <table className="w-full text-left text-xs border border-gray-300">
                <thead className="bg-gray-100 border-b border-gray-300 font-semibold">
                  <tr>
                    <th className="p-1.5">Code</th>
                    <th className="p-1.5">Course Name</th>
                    <th className="p-1.5 text-center">Category</th>
                    <th className="p-1.5 text-center">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enrolledCourses.map((c) => (
                    <tr key={c.id}>
                      <td className="p-1.5 font-mono font-bold">{c.code}</td>
                      <td className="p-1.5">{c.name}</td>
                      <td className="p-1.5 text-center">{c.category}</td>
                      <td className="p-1.5 text-center font-bold">{c.credits}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-bold border-t border-gray-300">
                  <tr>
                    <td colSpan="3" className="p-1.5 text-right">Total Registered Credits:</td>
                    <td className="p-1.5 text-center text-blue-700">{totalCredits}</td>
                  </tr>
                </tfoot>
              </table>

              {/* Signatures */}
              <div className="pt-6 flex justify-between text-center text-xs text-gray-600 border-t">
                <div>
                  <div className="h-8"></div>
                  <div className="border-t border-gray-400 pt-1 font-semibold">Student Signature</div>
                </div>
                <div>
                  <div className="h-8"></div>
                  <div className="border-t border-gray-400 pt-1 font-semibold">Faculty Advisor</div>
                </div>
                <div>
                  <div className="h-8"></div>
                  <div className="border-t border-gray-400 pt-1 font-semibold">HOD Signature</div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  onClick={() => setShowSlip(false)}
                  className="px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-bold cursor-pointer"
                >
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
          College Lab Experiment 11 • Developed by {studentInfo.name} ({studentInfo.regNo}) • React 19
        </footer>

      </div>
    </div>
  );
}
