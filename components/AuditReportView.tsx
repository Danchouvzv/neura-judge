
import React, { useState } from 'react';
import { AuditReport, AuditCategory } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { Button } from './Button';

interface AuditReportViewProps {
  report: AuditReport;
  onClose: () => void;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'water' | 'checklist' | 'judge'>('audit');

  return (
    <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(255,0,127,0.15)] overflow-hidden border-4 border-pink-50 relative">
      {/* Top Banner: Status Protocol */}
      <div className="bg-slate-900 p-10 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.3em]">Analysis Protocol: {Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
              The <span className="text-pink-500">Verdict</span>
            </h2>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-sm">Comprehensive FIRST® Rubric Audit Complete</p>
          </div>

          <div className="flex items-center gap-10 bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="text-center relative">
              <div className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,0,127,0.5)]">
                {report.overallScore}
              </div>
              <div className="text-[10px] font-black text-pink-500 uppercase tracking-widest mt-1">Global Power Score</div>
              {/* Decorative Circle */}
              <div className="absolute inset-0 -m-4 border-4 border-pink-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            </div>
            <div className="h-16 w-px bg-white/10"></div>
            <div className="hidden sm:block">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Judge's Verdict</div>
               <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${report.overallScore > 75 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'}`}>
                 {report.overallScore > 75 ? 'Award Contender' : 'Needs Optimization'}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Matrix */}
      <div className="flex flex-wrap border-b border-pink-50 bg-slate-50/50 p-2">
        {(['audit', 'water', 'checklist', 'judge'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[150px] py-6 px-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group ${
              activeTab === tab 
                ? 'text-pink-600' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="relative z-10">
              {tab === 'audit' ? 'Category Nodes' : tab === 'water' ? 'Contamination Scan' : tab === 'checklist' ? 'Tactical Plan' : 'Neuro-Link Session'}
            </span>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-pink-500 rounded-full"></div>
            )}
            <div className="absolute inset-0 bg-pink-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        ))}
      </div>

      <div className="p-10 md:p-16">
        {activeTab === 'audit' && (
          <div className="space-y-12">
            <div className="bg-pink-50/50 p-10 rounded-[3rem] border-2 border-pink-100 relative overflow-hidden group">
              <div className="absolute top-4 right-6 text-[10px] font-black text-pink-300 uppercase tracking-widest">Judge's Internal Log</div>
              <h3 className="font-black text-slate-900 text-xl mb-4 uppercase italic tracking-tight flex items-center gap-3">
                 <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                 Executive Summary
              </h3>
              <p className="text-slate-600 italic text-lg leading-relaxed font-medium">"{report.summary}"</p>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {report.categories.map((cat, idx) => (
                <div key={idx} className="group relative bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 transition-all hover:border-pink-300 hover:shadow-[0_20px_40px_rgba(255,0,127,0.05)] overflow-hidden">
                  {/* Background Grid Accent */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity" 
                       style={{ backgroundImage: 'radial-gradient(#ff007f 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-[0_5px_15px_rgba(255,0,127,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          {CATEGORY_ICONS[cat.name] || <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12h6m-6 4h6" /></svg>}
                        </div>
                        <div>
                          <h4 className="font-black text-2xl text-slate-900 tracking-tighter uppercase">{cat.name}</h4>
                          <div className="flex gap-1.5 mt-2">
                            {[1, 2, 3, 4, 5].map(s => (
                              <div 
                                key={s} 
                                className={`h-1.5 w-6 rounded-full transition-all duration-700 ${s <= cat.score ? 'bg-pink-500 shadow-[0_0_8px_#ff007f]' : 'bg-slate-100'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Index</span>
                        <span className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">NODE_{idx + 1}</span>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{cat.reasoning}</p>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                           Validated Evidence
                        </h5>
                        <ul className="space-y-2">
                          {cat.evidence.map((ev, i) => (
                            <li key={i} className="text-xs text-slate-600 flex gap-3 font-bold bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/50">
                              <span className="text-emerald-500">✓</span> {ev}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em] flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                           Critical Gaps
                        </h5>
                        <ul className="space-y-2">
                          {cat.gaps.map((gap, i) => (
                            <li key={i} className="text-xs text-slate-600 flex gap-3 font-bold bg-pink-50/50 p-2 rounded-xl border border-pink-100/50">
                              <span className="text-pink-400">✗</span> {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'water' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
               <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
               <div className="w-24 h-24 bg-pink-600 rounded-[2rem] flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(255,0,127,0.4)] animate-pulse">
                 🧪
               </div>
               <div>
                 <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter italic">Text Contamination Scan</h3>
                 <p className="text-slate-400 font-bold leading-relaxed max-w-xl text-lg">
                   The system has identified low-density phrasing. "Water" decreases your document's impact and frustrates judges. Replace these blocks immediately.
                 </p>
               </div>
            </div>

            <div className="grid gap-6">
              {report.waterDetection.map((item, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-100 rounded-[3rem] overflow-hidden group hover:border-pink-300 transition-all">
                  <div className="flex flex-col xl:flex-row">
                    <div className="xl:w-1/2 p-10 bg-slate-50 relative overflow-hidden">
                       <div className="absolute top-4 right-6 text-[9px] font-black text-pink-400 tracking-widest uppercase">Contaminated Block</div>
                       <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Original Draft</h4>
                       <p className="text-lg text-slate-700 italic font-medium leading-relaxed">"{item.originalText}"</p>
                       <div className="mt-8 flex items-center gap-3">
                          <div className="w-10 h-1 bg-pink-500 rounded-full"></div>
                          <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Low Impact Detection</span>
                       </div>
                    </div>
                    <div className="xl:w-1/2 p-10 flex flex-col justify-center">
                       <div className="mb-8">
                          <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Neural Analysis</h5>
                          <p className="text-sm text-slate-600 font-bold leading-relaxed">{item.reasoning}</p>
                       </div>
                       <div className="bg-emerald-50 p-8 rounded-[2rem] border-2 border-emerald-100/50 relative group/alt">
                          <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Tactical Alternative</h5>
                          <p className="text-emerald-900 font-black text-lg leading-tight tracking-tight italic">
                            {item.suggestion}
                          </p>
                          <div className="absolute bottom-4 right-6 opacity-0 group-hover/alt:opacity-100 transition-opacity">
                             <button className="text-[10px] font-black text-emerald-600 uppercase underline underline-offset-4">Copy Optimization</button>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="grid lg:grid-cols-3 gap-10">
            {[
              { title: 'Immediate Fixes', data: report.checklist.today, color: 'pink-600', bg: 'bg-pink-50' },
              { title: 'Weekly Sprint', data: report.checklist.thisWeek, color: 'slate-900', bg: 'bg-slate-50' },
              { title: 'Season Roadmap', data: report.checklist.beforeSeason, color: 'slate-400', bg: 'bg-white' }
            ].map((col, i) => (
              <div key={i} className={`p-10 rounded-[3.5rem] border-2 border-slate-50 ${col.bg} flex flex-col h-full shadow-sm`}>
                <div className="flex items-center gap-4 mb-10">
                   <div className={`w-3 h-10 rounded-full bg-${col.color}`}></div>
                   <h4 className={`text-xl font-black uppercase tracking-tighter italic text-${col.color}`}>
                     {col.title}
                   </h4>
                </div>
                <ul className="space-y-5 flex-1">
                  {col.data.map((item, idx) => (
                    <li key={idx} className="group flex gap-4 items-start p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-transparent hover:border-pink-200 transition-all cursor-pointer">
                      <div className="mt-1 w-5 h-5 rounded-md border-2 border-slate-200 group-hover:border-pink-500 flex items-center justify-center transition-colors">
                         <div className="w-2 h-2 bg-pink-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                      </div>
                      <span className="text-sm font-bold text-slate-700 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'judge' && (
          <div className="max-w-4xl mx-auto space-y-12 py-10">
            <div className="bg-gradient-to-br from-[#ff007f] to-[#ff4d94] p-16 rounded-[4rem] text-white shadow-[0_40px_80px_-20px_rgba(255,0,127,0.4)] relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="relative z-10">
                 <div className="flex justify-between items-center mb-10">
                   <div className="px-5 py-2 bg-white/20 rounded-full text-[10px] font-black tracking-[0.4em] uppercase">Neural Judge Simulation v2.0</div>
                   <div className="flex items-center gap-3 font-mono text-xs font-black">
                     <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                     05:59 REMAINING
                   </div>
                 </div>
                 <h3 className="text-6xl font-black mb-8 tracking-tighter uppercase italic leading-[0.9]">
                   The 360-Second <br/>
                   <span className="text-white/70">Attention War</span>
                 </h3>
                 <p className="text-pink-50 text-xl font-medium leading-relaxed max-w-2xl">
                   Judges don't read your portfolio; they <span className="underline decoration-4 underline-offset-8">scan it</span>. If your unique "Value Proposition" isn't visible in the first 30 seconds, you lose the technical award.
                 </p>
               </div>
               <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[120px] group-hover:scale-110 transition-transform duration-1000"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">Winning Proof Points</h4>
                  {report.categories.flatMap(c => c.evidence.slice(0, 1)).map((ev, i) => (
                    <div key={i} className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[2.5rem] flex items-center justify-between group hover:scale-[1.02] transition-all">
                      <p className="text-emerald-900 font-black italic tracking-tight">"{ev}"</p>
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="bg-slate-900 p-10 rounded-[3.5rem] border-4 border-slate-800 flex flex-col justify-center shadow-2xl">
                  <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_#ff007f]">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <h4 className="text-white font-black text-3xl mb-4 tracking-tighter uppercase italic">The "Hook" Deficiency</h4>
                  <p className="text-slate-400 font-bold leading-relaxed mb-10">
                    Your summary is missing a primary "Marketing Hook". A judge needs to remember you as "The team that [Unique Solution]".
                  </p>
                  <button className="w-full py-5 bg-pink-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-pink-700 transition-all shadow-xl shadow-pink-500/20">
                    Generate New Team Hook
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 p-10 border-t border-pink-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           Audit Verified by Neural Core v5.2
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.print()} className="rounded-full border-pink-100 text-pink-600 px-10">Export PDF</Button>
          <Button onClick={onClose} className="rounded-full bg-slate-900 px-10">Return to Archives</Button>
        </div>
      </div>
    </div>
  );
};
