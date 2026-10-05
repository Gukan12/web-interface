import React from "react";
import { GraduationCap, Heart, HelpCircle, PhoneCall, Mail } from "lucide-react";

export default function Footer({ onOpenViva }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Apex Institute of Technology</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Autonomous Online Course Registration System (CBCS). Built with modern React Functional Components, Hooks Lifecycle (<code className="text-indigo-300">useState</code>, <code className="text-indigo-300">useEffect</code>, <code className="text-indigo-300">useRef</code>, <code className="text-indigo-300">useMemo</code>, <code className="text-indigo-300">useCallback</code>), and schedule conflict validation algorithms.
            </p>
            <div className="text-[11px] text-slate-500">
              Student: <span className="text-slate-300 font-semibold">Gukan Nithish</span> • Register No: <span className="text-slate-300 font-mono">717822P101</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Academic Helpdesk
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>academics@apex.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-indigo-400" />
                <span>+91 44 2855 0100</span>
              </li>
              <li className="text-[11px] text-slate-500 mt-1">
                Office Hours: Mon–Fri, 8:30 AM – 5:00 PM
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Evaluation Quicklink
            </h4>
            <p className="text-[11px] text-slate-400">
              Review how hooks and performance memoization are applied across the codebase:
            </p>
            <button
              onClick={onOpenViva}
              className="mt-1 px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-md font-semibold text-xs transition cursor-pointer"
            >
              Open React Hooks Lab Guide →
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© 2024 - 2026 Apex Institute of Technology. All Rights Reserved.</p>
          <p>Full Stack Web Development Lab • Experiment 1</p>
        </div>
      </div>
    </footer>
  );
}
