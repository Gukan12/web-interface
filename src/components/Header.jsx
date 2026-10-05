import React from "react";
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  ShoppingCart, 
  Award, 
  User, 
  Code2, 
  Printer, 
  AlertCircle
} from "lucide-react";

export default function Header({
  activeTab,
  setActiveTab,
  student,
  enrolledCount,
  totalCredits,
  maxCredits,
  cartCount,
  waitlistCount,
  onOpenPrintSlip,
  onFocusSearch
}) {
  const creditPercent = Math.min(100, Math.round((totalCredits / maxCredits) * 100));

  let creditBadgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (totalCredits < 14) {
    creditBadgeColor = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (totalCredits >= 20) {
    creditBadgeColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
  }

  const navTabs = [
    { id: "catalog", label: "Course Catalog", icon: BookOpen },
    { id: "timetable", label: "Weekly Schedule", icon: Calendar },
    { id: "enrolled", label: "Registered Courses", icon: CheckCircle2, badge: enrolledCount },
    { id: "cart", label: "Course Cart", icon: ShoppingCart, badge: cartCount },
    { id: "degree", label: "Degree Audit", icon: Award },
    { id: "profile", label: "Student Profile", icon: User },
    { id: "viva", label: "React Hooks Lab Notes", icon: Code2, highlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
      {/* Top institution bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">APEX INSTITUTE OF TECHNOLOGY</span>
          <span className="text-slate-400 hidden sm:inline">• Autonomous Academic Portal</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300">
          <span>Term: <strong className="text-white">Fall 2025 (Semester 5)</strong></span>
          <span className="hidden md:inline">Registration Window: <strong className="text-emerald-300">Active</strong></span>
          <button 
            onClick={onOpenPrintSlip}
            className="flex items-center space-x-1 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition cursor-pointer"
            title="Print Official Course Registration Slip"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 gap-4">
          {/* Logo & Portal title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("catalog")}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                  Course Registration System
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                  Lab Exp 1
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                B.Tech Computer Science & Engineering • Choice Based Credit System (CBCS)
              </p>
            </div>
          </div>

          {/* Student Status Badge & Credit Counter */}
          <div className="flex items-center space-x-3">
            {/* Credit Load Indicator */}
            <div className={`hidden sm:flex flex-col items-end px-3 py-1.5 rounded-lg border text-xs ${creditBadgeColor}`}>
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold">Registered Credits:</span>
                <span className="font-black text-sm">{totalCredits} / {maxCredits}</span>
              </div>
              <div className="w-28 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full transition-all duration-300 ${
                    totalCredits >= 20 ? "bg-indigo-600" : totalCredits >= 14 ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${creditPercent}%` }}
                />
              </div>
            </div>

            {/* Student Mini Card */}
            <div 
              onClick={() => setActiveTab("profile")}
              className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition cursor-pointer"
            >
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-900 leading-none">{student.name}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{student.regNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar border-t border-slate-100 pt-1 -mb-px">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2.5 px-3.5 text-xs font-medium border-b-2 whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-lg"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                } ${tab.highlight ? "font-semibold text-purple-700 hover:text-purple-800" : ""}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : tab.highlight ? "text-purple-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && (
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-purple-100 text-purple-700 font-bold ml-1">
                    Hooks
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
