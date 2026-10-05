import React, { useRef } from "react";
import { X, Printer, CheckCircle, ShieldCheck, QrCode } from "lucide-react";

export default function RegistrationSlip({
  student,
  enrolledCourses,
  totalCredits,
  maxCredits,
  onClose
}) {
  const slipRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar (Hidden during print) */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <Printer className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-xs">Official Registration Slip (Print Preview)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div ref={slipRef} className="p-8 overflow-y-auto print:p-0 print:m-0 text-slate-900 bg-white">
          {/* Institutional Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-slate-900" />
              <h1 className="text-xl font-black uppercase tracking-wider text-slate-900">
                Apex Institute of Technology
              </h1>
              <span className="w-3 h-3 rounded-full bg-slate-900" />
            </div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Autonomous Institution • Affiliated to Anna University • Accredited 'A++' Grade
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Office of the Controller of Examinations & Academic Affairs
            </p>
            <div className="mt-2 inline-block bg-slate-100 border border-slate-300 px-3 py-0.5 rounded text-xs font-bold uppercase tracking-widest text-slate-800">
              Course Registration Form — Fall 2025 (Semester V)
            </div>
          </div>

          {/* Student Profile Metadata Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 p-3.5 rounded-lg border border-slate-300 bg-slate-50 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Student Name:</span>
              <span className="font-bold text-slate-900">{student.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Register Number:</span>
              <span className="font-mono font-bold text-slate-900">{student.regNo}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Roll Number:</span>
              <span className="font-mono font-bold text-slate-900">{student.rollNo}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Current CGPA:</span>
              <span className="font-bold text-emerald-700">{student.cgpa} / 10.0</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Degree & Branch:</span>
              <span className="font-medium text-slate-900">{student.program} - {student.department}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Academic Year:</span>
              <span className="font-medium text-slate-900">{student.academicYear}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Date of Print:</span>
              <span className="font-medium text-slate-900">{currentDate}</span>
            </div>
          </div>

          {/* Registered Courses Table */}
          <div className="border border-slate-300 rounded-lg overflow-hidden my-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-200/80 text-slate-800 font-bold border-b border-slate-300 uppercase text-[10px] tracking-wider">
                  <th className="py-2 px-3 w-8">#</th>
                  <th className="py-2 px-3 w-20">Code</th>
                  <th className="py-2 px-3">Course Title</th>
                  <th className="py-2 px-3 w-28">Category</th>
                  <th className="py-2 px-3 w-16">Credits</th>
                  <th className="py-2 px-3 w-16">Slot</th>
                  <th className="py-2 px-3">Course Instructor</th>
                  <th className="py-2 px-3 w-24 text-center">Faculty Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {enrolledCourses.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-slate-400 italic">
                      No courses registered.
                    </td>
                  </tr>
                ) : (
                  enrolledCourses.map((c, idx) => (
                    <tr key={c.id} className="text-slate-800">
                      <td className="py-2.5 px-3 font-mono text-slate-500">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono font-bold">{c.code}</td>
                      <td className="py-2.5 px-3 font-medium">{c.title}</td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-600">{c.type}</td>
                      <td className="py-2.5 px-3 font-bold">{c.credits}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold">{c.schedule?.slot}</td>
                      <td className="py-2.5 px-3 text-[11px]">{c.instructor?.name}</td>
                      <td className="py-2.5 px-3 border-l border-slate-200"></td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-900">
                  <td colSpan="4" className="py-2.5 px-3 text-right uppercase text-[11px]">
                    Total Registered Semester Credits:
                  </td>
                  <td className="py-2.5 px-3 text-sm text-indigo-700">
                    {totalCredits}
                  </td>
                  <td colSpan="3" className="py-2.5 px-3 text-right text-[11px] text-slate-600">
                    (Max permissible: {maxCredits} Credits)
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Student Declaration */}
          <div className="text-[11px] text-slate-600 mt-4 leading-relaxed border-l-2 border-indigo-600 pl-3">
            <strong>Declaration:</strong> I hereby confirm that I have opted for the above courses as per CBCS curriculum guidelines and met all the prerequisites. I understand that attendance of minimum 75% in each course is compulsory to appear for the End Semester Examinations.
          </div>

          {/* Verification & Signatures Section */}
          <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-3 gap-6 text-center text-xs">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center pb-1">
                <span className="font-serif italic font-semibold text-slate-800">{student.name}</span>
              </div>
              <p className="font-bold text-slate-800">Signature of the Student</p>
              <p className="text-[10px] text-slate-500">Roll: {student.rollNo}</p>
            </div>

            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center pb-1">
                <span className="font-serif italic font-semibold text-indigo-800">{student.advisor?.name}</span>
              </div>
              <p className="font-bold text-slate-800">Faculty Advisor / Mentor</p>
              <p className="text-[10px] text-slate-500">Dept. of Computer Science</p>
            </div>

            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center pb-1">
                <span className="inline-flex items-center space-x-1 text-emerald-700 text-[10px] font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Approved Online</span>
                </span>
              </div>
              <p className="font-bold text-slate-800">Head of Department (HOD)</p>
              <p className="text-[10px] text-slate-500">Apex Institute of Technology</p>
            </div>
          </div>

          {/* Digital Verification Barcode Mock */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="font-mono">VERIF-ID: 717822P101-FALL25-SEM5</span>
              <span>• Digitally generated via CBCS Portal</span>
            </div>
            <span>Page 1 of 1</span>
          </div>
        </div>

        {/* Modal Bottom Close (Hidden in print) */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-2 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
