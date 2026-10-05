import React from "react";
import { Code2, Sparkles, CheckCircle2, Cpu, HelpCircle, Layers, Compass } from "lucide-react";

export default function LabHooksGuide() {
  const hooksData = [
    {
      hook: "useState",
      purpose: "Local Component State Management",
      color: "border-blue-500 text-blue-700 bg-blue-50",
      codeSnippet: `const [activeTab, setActiveTab] = useState("catalog");
const [searchKeyword, setSearchKeyword] = useState("");
const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => 
  loadFromStorage(STORAGE_KEYS.ENROLLED_COURSES, ["CS501", "CS502", "CS506L"])
);
const [cartCourseIds, setCartCourseIds] = useState([]);
const [selectedCourseModal, setSelectedCourseModal] = useState(null);`,
      explanation: "Manages interactive application state: active navigation tabs, search queries, multi-select filters, modal states, and enrolled/cart/waitlist course arrays with lazy initial state from localStorage."
    },
    {
      hook: "useEffect",
      purpose: "Side Effects & LocalStorage Synchronization",
      color: "border-emerald-500 text-emerald-700 bg-emerald-50",
      codeSnippet: `// 1. Synchronize enrolled courses to localStorage on state changes
useEffect(() => {
  saveToStorage(STORAGE_KEYS.ENROLLED_COURSES, enrolledCourseIds);
}, [enrolledCourseIds]);

// 2. Synchronize staged cart courses to localStorage
useEffect(() => {
  saveToStorage(STORAGE_KEYS.CART_COURSES, cartCourseIds);
}, [cartCourseIds]);

// 3. Document title dynamic update based on enrolled credits
useEffect(() => {
  document.title = \`(\${totalCredits} Cr) Course Registration - Semester 5\`;
}, [totalCredits]);`,
      explanation: "Executes side effects: persists state to browser localStorage whenever enrollment or cart lists change, and updates the browser title dynamically with current credit load."
    },
    {
      hook: "useRef",
      purpose: "Direct DOM Access & Programmatic Focus",
      color: "border-purple-500 text-purple-700 bg-purple-50",
      codeSnippet: `// 1. Reference to the Search <input> DOM element
const searchInputRef = useRef(null);

// Function to programmatically trigger focus:
const handleFocusSearch = () => {
  setActiveTab("catalog");
  setTimeout(() => {
    searchInputRef.current?.focus();
  }, 50);
};`,
      explanation: "Creates a mutable reference to the search bar <input> DOM node to enable programmatic autofocus when navigating from other tabs or clicking quick-search triggers without re-rendering."
    },
    {
      hook: "useMemo",
      purpose: "Memoized Computation & Conflict Detection Algorithm",
      color: "border-amber-500 text-amber-700 bg-amber-50",
      codeSnippet: `// 1. Compute enrolled course objects from catalog
const enrolledCourses = useMemo(() => {
  return courses.filter(c => enrolledCourseIds.includes(c.id));
}, [courses, enrolledCourseIds]);

// 2. Compute total registered credits
const totalCredits = useMemo(() => {
  return enrolledCourses.reduce((sum, c) => sum + c.credits, 0);
}, [enrolledCourses]);

// 3. Automated schedule conflict matrix detection
const conflictsMap = useMemo(() => {
  const map = {};
  for (const course of courses) {
    if (enrolledCourseIds.includes(course.id)) continue;
    const conflict = findScheduleConflict(course, enrolledCourses);
    if (conflict) {
      map[course.id] = conflict;
    }
  }
  return map;
}, [courses, enrolledCourses, enrolledCourseIds]);`,
      explanation: "Avoids expensive recalculations on every render by caching filtered course lists, calculating total credit sums, and executing the time-overlap schedule conflict algorithm only when enrolled courses or catalog change."
    },
    {
      hook: "useCallback",
      purpose: "Memoized Event Handler References",
      color: "border-rose-500 text-rose-700 bg-rose-50",
      codeSnippet: `const handleRegisterCourse = useCallback((course) => {
  // Validate max credit limit
  if (totalCredits + course.credits > MAX_CREDITS) {
    showToast(\`Cannot register: Exceeds maximum \${MAX_CREDITS} credit limit!\`);
    return;
  }
  // Validate time clash
  const conflict = findScheduleConflict(course, enrolledCourses);
  if (conflict) {
    showToast(\`Schedule conflict: \${conflict.message}\`);
    return;
  }
  setEnrolledCourseIds(prev => [...prev, course.id]);
  showToast(\`Successfully enrolled in \${course.code}: \${course.title}\`);
}, [totalCredits, enrolledCourses]);`,
      explanation: "Memoizes callbacks passed down to deeply nested children (like CourseCard and CourseDetailModal) to prevent unnecessary child re-renders and preserve stable function references."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl text-white p-6 sm:p-8 shadow-md">
        <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Code2 className="w-4 h-4" />
          <span>Experiment 1 Viva & Technical Evaluation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          React Hooks Architecture in Course Registration System
        </h2>
        <p className="text-indigo-200 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
          Comprehensive breakdown of how this academic laboratory project implements React functional components, hooks lifecycle, memoization algorithms, and DOM referencing for the College Course Registration System.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="bg-white/10 px-3 py-1 rounded-full text-indigo-200 font-mono">
            Student: Gukan Nithish (717822P101)
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full text-indigo-200 font-mono">
            Course: Full Stack Lab (B.Tech CSE)
          </span>
        </div>
      </div>

      {/* Hooks Grid */}
      <div className="space-y-4">
        {hooksData.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-md border ${item.color}`}>
                  {item.hook}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{item.purpose}</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">React 19 Hooks API</span>
            </div>

            <p className="text-xs text-slate-600 mt-3 mb-3 leading-relaxed">
              {item.explanation}
            </p>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
              <pre>{item.codeSnippet}</pre>
            </div>
          </div>
        ))}
      </div>

      {/* Common Lab Viva Questions Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-2 text-slate-900 font-bold text-base mb-4">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3>Frequently Asked Lab Viva Questions (Ready Answers)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1">Q1: How does schedule conflict detection work in React?</strong>
            <p className="text-slate-600">
              Ans: An algorithm in <code>scheduleConflict.js</code> parses 24-hour start/end times into minutes, checks for matching weekdays between the candidate course and already enrolled courses, and checks interval overlap <code>(startA &lt; endB &amp;&amp; endA &gt; startB)</code> inside a <code>useMemo</code> hook.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1">Q2: Why use <code>useMemo</code> for credit calculations?</strong>
            <p className="text-slate-600">
              Ans: Calculating total enrolled credits requires iterating through enrolled courses. Wrapping it in <code>useMemo</code> ensures the sum is only recalculated when the <code>enrolledCourses</code> array actually mutates, preventing redundant loops on text filtering.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1">Q3: How is student registration data persisted across reloads?</strong>
            <p className="text-slate-600">
              Ans: Using <code>useEffect</code> that triggers on changes to <code>enrolledCourseIds</code> to write serialized JSON into the browser's <code>localStorage</code>, with lazy initial state evaluation on page load.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1">Q4: What role does <code>useRef</code> play?</strong>
            <p className="text-slate-600">
              Ans: <code>useRef</code> maintains a reference directly to the search input DOM element, enabling programmatic focus whenever the user invokes the search action from anywhere in the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
