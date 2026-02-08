
import React, { useState, useEffect } from 'react';
import { FirstProgram, SavedAudit, AuditReport } from './types';
import { analyzePortfolio } from './services/geminiService';
import { Button } from './components/Button';
import { AuditReportView } from './components/AuditReportView';
import { RewriteStudio } from './components/RewriteStudio';
import { ExamplesLibrary } from './components/ExamplesLibrary';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'upload' | 'dashboard' | 'audit' | 'rewrite' | 'examples'>('landing');
  const [program, setProgram] = useState<FirstProgram>(FirstProgram.FTC);
  const [portfolioText, setPortfolioText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState<AuditReport | null>(null);
  const [history, setHistory] = useState<SavedAudit[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('audit_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleStartAnalysis = async () => {
    if (!portfolioText.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const report = await analyzePortfolio(portfolioText, program);
      setCurrentReport(report);
      const newAudit: SavedAudit = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        program,
        fileName: "Protocol_" + Date.now().toString().slice(-4),
        report
      };
      const updatedHistory = [newAudit, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('audit_history', JSON.stringify(updatedHistory));
      setView('audit');
    } catch (err: any) {
      setError(err.message || 'Analysis Interrupted. Check connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getProgramColors = (p: FirstProgram) => {
    switch (p) {
      case FirstProgram.FTC: return 'from-orange-500 to-amber-600 shadow-orange-200 border-orange-100 bg-orange-50/30';
      case FirstProgram.FRC: return 'from-blue-600 to-indigo-700 shadow-blue-200 border-blue-100 bg-blue-50/30';
      case FirstProgram.FLL: return 'from-emerald-500 to-teal-600 shadow-emerald-200 border-emerald-100 bg-emerald-50/30';
      default: return 'from-pink-500 to-rose-600 shadow-pink-200 border-pink-100 bg-pink-50/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  const renderContent = () => {
    switch (view) {
      case 'landing':
        return (
          <div className="relative min-h-screen bg-white overflow-x-hidden">
            {/* --- HERO SECTION: NEURAL CORE --- */}
            <section className="relative pt-64 pb-32 px-6">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.03]" 
                     style={{ 
                       backgroundImage: `linear-gradient(to right, #ff007f 1px, transparent 1px), linear-gradient(to bottom, #ff007f 1px, transparent 1px)`,
                       backgroundSize: '100px 100px'
                     }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-pink-500/5 rounded-full blur-[180px]"></div>
              </div>

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                  <div className="lg:w-2/3 text-left">
                    <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-slate-900 rounded-full mb-10 shadow-2xl animate-in slide-in-from-left duration-700">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 shadow-[0_0_10px_#ff007f]"></span>
                      </span>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">SYSTEM STABILITY: OPTIMAL</span>
                    </div>
                    
                    <h1 className="text-[5rem] md:text-[9.5rem] font-black text-slate-900 leading-[0.8] tracking-tighter mb-10 select-none italic animate-in fade-in zoom-in duration-500">
                      NEURAL<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-[length:200%_auto] animate-gradient-flow">JUDGE</span>
                    </h1>
                    
                    <p className="text-2xl text-slate-500 max-w-2xl mb-16 font-medium leading-relaxed tracking-tight border-l-8 border-pink-500 pl-10 animate-in slide-in-from-bottom duration-700 delay-200">
                      The premier <span className="text-slate-900 font-black">Adversarial Auditor</span> for FIRST documentation. We don't just review—we deconstruct your engineering narrative to ensure <span className="underline decoration-pink-300 decoration-4">championship alignment</span>.
                    </p>
                    
                    <div className="flex flex-wrap gap-8 items-center animate-in fade-in duration-1000 delay-500">
                      <button 
                        onClick={() => setView('upload')}
                        className="group relative px-16 py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="relative z-10 flex items-center gap-6">
                          INITIATE SCAN
                          <svg className="w-8 h-8 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 5l7 7m0 0l-7 7m7-7H6" /></svg>
                        </span>
                      </button>
                      <button 
                        onClick={() => setView('rewrite')}
                        className="px-14 py-8 bg-white text-slate-900 border-4 border-slate-50 rounded-[2.5rem] font-black text-xl hover:border-pink-500 hover:text-pink-600 transition-all shadow-xl"
                      >
                        REWRITE STUDIO
                      </button>
                    </div>
                  </div>

                  <div className="lg:w-1/3 w-full animate-in slide-in-from-right duration-1000">
                     <div className="relative">
                        <div className="absolute -inset-10 bg-pink-500/10 rounded-full blur-[100px] animate-pulse"></div>
                        <div className="relative space-y-8">
                           <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-pink-50 rotate-3 hover:rotate-0 transition-transform duration-700">
                              <div className="flex items-center gap-4 mb-6">
                                 <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-200 font-black italic">!</div>
                                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Analysis Feed</span>
                              </div>
                              <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"Water detected in Iteration Log page 3. Suggesting metric-based replacement..."</p>
                           </div>
                           <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700 text-white">
                              <div className="flex justify-between mb-4">
                                 <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Global Ranking</span>
                                 <span className="text-xs font-black">TOP 1%</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-pink-500 w-[95%] shadow-[0_0_15px_#ff007f]"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- TEAM NEURA: ALMATY NIS NAURYZBAY --- */}
            <section className="relative py-52 bg-slate-950 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
                 <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 scale-150 rotate-12">
                   <svg className="w-[800px] h-[800px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.574.345l-1.923-.385a6 6 0 00-4.04.542l-1.011.506a2 2 0 00-1.022.547V21a2 2 0 002 2h14.428a2 2 0 002-2v-5.572z" /></svg>
                 </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-32 items-center">
                  <div className="relative">
                    <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-12 shadow-inner">
                      <div className="w-2.5 h-2.5 bg-pink-500 rounded-full shadow-[0_0_10px_#ff007f] animate-pulse"></div>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Visionaries of STEM</span>
                    </div>
                    
                    <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 italic">
                      NEURA<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-rose-500 to-pink-300">CORE</span>
                    </h2>
                    
                    <div className="space-y-10 max-w-xl">
                      <div className="pl-8 border-l-2 border-pink-500/30">
                         <p className="text-2xl text-slate-300 font-medium leading-relaxed italic">
                           "Constructed in the laboratories of <span className="text-white font-black">Almaty NIS Nauryzbay</span>, NeuraJudge represents the pinnacle of Kazakhstani engineering intuition fused with Neural Logic."
                         </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-10">
                        <div className="group">
                           <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2 group-hover:translate-x-2 transition-transform italic">Base of Operations</p>
                           <p className="text-lg font-black text-white tracking-widest leading-none">ALMATY, KZ</p>
                        </div>
                        <div className="group">
                           <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2 group-hover:translate-x-2 transition-transform italic">Team ID</p>
                           <p className="text-lg font-black text-white tracking-widest leading-none">NEURA_FTC</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                     <div className="grid grid-cols-2 gap-8">
                        <div className="aspect-[4/5] bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl rounded-[3.5rem] border border-white/10 p-10 flex flex-col justify-end group hover:border-pink-500/50 transition-all duration-700">
                           <div className="w-16 h-1 bg-pink-500 mb-6 group-hover:w-full transition-all duration-700"></div>
                           <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-2 leading-none">Logic</h3>
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Algorithmic Auditing</p>
                        </div>
                        <div className="aspect-[4/5] bg-pink-600 rounded-[3.5rem] p-10 flex flex-col justify-end shadow-[0_40px_80px_-20px_rgba(255,0,127,0.5)] scale-105 translate-y-8 hover:translate-y-0 transition-all duration-700">
                           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-pink-600 shadow-xl mb-8 font-black italic text-2xl">N</div>
                           <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-2 leading-none">Excellence</h3>
                           <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">NIS Nauryzbay Hub</p>
                        </div>
                        <div className="col-span-2 mt-12 bg-white/5 p-12 rounded-[4rem] border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-colors">
                           <div>
                              <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2">Protocol Status</p>
                              <p className="text-2xl font-black text-white italic tracking-tighter">SECURED_BY_NEURA</p>
                           </div>
                           <div className="flex gap-2">
                              {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-10 bg-pink-500/20 rounded-full group-hover:bg-pink-500 transition-colors" style={{transitionDelay: `${i*100}ms`}}></div>)}
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- PROCESS SECTION --- */}
            <section className="py-52 bg-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-40">
                   <div className="inline-block px-8 py-3 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-8 italic">Scientific Framework</div>
                   <h2 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">THE PIPELINE</h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-24">
                  {[
                    { 
                      title: "SHREDDING", 
                      desc: "The auditor decomposes your text into semantic fragments, mapping every sentence to specific rubric criteria.",
                      icon: "M13 10V3L4 14h7v7l9-11h-7z"
                    },
                    { 
                      title: "EVALUATION", 
                      desc: "Each fragment is cross-referenced against 10,000+ points of high-scoring documentation to find evidence strength.",
                      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    },
                    { 
                      title: "VERDICT", 
                      desc: "The system generates a tactical roadmap, identifying 'water' and providing ready-to-use evidence templates.",
                      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="group relative">
                       <div className="text-[14rem] font-black text-slate-50 absolute -top-40 left-0 select-none group-hover:text-pink-50 transition-colors duration-700">{idx + 1}</div>
                       <div className="relative z-10 pt-10">
                          <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl group-hover:bg-pink-600 transition-all duration-500">
                             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={item.icon} /></svg>
                          </div>
                          <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic">{item.title}</h4>
                          <p className="text-xl text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case 'upload':
        return (
          <div className="max-w-[1400px] mx-auto py-24 px-6 mt-10">
            <div className="flex flex-col xl:flex-row gap-12 items-stretch">
              <div className="xl:w-[380px] w-full flex flex-col gap-8">
                <div className="bg-white p-1 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(255,0,127,0.15)] border border-pink-100/50">
                  <div className="bg-white p-10 rounded-[3rem] border border-pink-50 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 -mr-12 -mt-12 rounded-full blur-2xl"></div>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-10 h-1 bg-pink-500 rounded-full"></div>
                      <h3 className="text-[11px] font-black text-pink-500 uppercase tracking-[0.4em]">Mission Parameters</h3>
                    </div>
                    <div className="space-y-4">
                      {Object.values(FirstProgram).map((p) => (
                        <button
                          key={p}
                          onClick={() => setProgram(p)}
                          className={`w-full relative flex items-center justify-between p-7 rounded-[2rem] border-4 transition-all duration-500 overflow-hidden group ${
                            program === p 
                              ? 'border-pink-500 bg-pink-500 text-white shadow-[0_15px_30px_rgba(255,0,127,0.3)] scale-[1.03]' 
                              : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-pink-200'
                          }`}
                        >
                          <div className="relative z-10 flex flex-col items-start">
                            <span className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-1">Target Sector</span>
                            <span className="font-black text-2xl tracking-tighter italic">{p} UNIT</span>
                          </div>
                          <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${program === p ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-pink-100'}`}>
                            {program === p ? (
                              <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            ) : (
                              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="h-full bg-white p-2 rounded-[4.5rem] shadow-2xl border border-pink-100/50">
                   <div className="bg-[#fdfaff] px-12 py-12 rounded-[4rem] h-full relative border border-white flex flex-col">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-3 h-3 bg-pink-500 rounded-sm rotate-45 animate-spin"></div>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Data Input</h2>
                          </div>
                          <p className="text-xs font-black text-pink-400 uppercase tracking-[0.4em] ml-1">Ready for portfolio ingestion</p>
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <textarea
                          className="w-full h-full min-h-[500px] p-12 bg-white border-2 border-transparent focus:border-pink-500/10 rounded-[3rem] outline-none transition-all font-mono text-sm leading-relaxed text-slate-700 shadow-[inset_0_2px_15px_rgba(255,0,127,0.02)] placeholder:text-slate-200 resize-none"
                          placeholder={`// Protocol: Paste your document text here...`}
                          value={portfolioText}
                          onChange={(e) => setPortfolioText(e.target.value)}
                        />
                      </div>
                      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-10">
                        <button onClick={() => setView('landing')} className="px-10 py-5 bg-white border-4 border-slate-50 text-slate-400 hover:text-pink-600 hover:border-pink-100 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all">Abort Mission</button>
                        <button onClick={handleStartAnalysis} disabled={isAnalyzing || !portfolioText.trim()} className={`relative group px-20 py-7 bg-pink-600 text-white rounded-[2.5rem] font-black text-lg uppercase tracking-[0.2em] flex items-center gap-4 transition-all shadow-[0_25px_50px_rgba(255,0,127,0.4)] ${isAnalyzing ? 'opacity-70' : ''}`}>
                          {isAnalyzing ? "SCANNING..." : "LAUNCH AUDIT"}
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto py-32 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                   Telemetry Hub
                </div>
                <h2 className="text-7xl font-black text-slate-900 tracking-tighter uppercase italic">ARCHIVES</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] italic">Accessing historical engineering data</p>
              </div>
              <div className="flex gap-4">
                 <div className="hidden lg:flex flex-col items-end border-r border-slate-200 pr-8 mr-4 justify-center">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Database Load</span>
                    <span className="text-xs font-black text-emerald-500">0.02 ms LATENCY</span>
                 </div>
                 <Button onClick={() => setView('upload')} className="rounded-full bg-slate-900 px-14 py-7 shadow-2xl hover:scale-105">INITIATE NEW PROTOCOL</Button>
              </div>
            </div>
            
            {history.length === 0 ? (
              <div className="bg-white p-48 rounded-[6rem] text-center border-4 border-dashed border-slate-100 shadow-sm flex flex-col items-center">
                 <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10">
                    <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <h3 className="text-4xl font-black text-slate-300 uppercase italic mb-10">No Logs Encrypted</h3>
                 <Button onClick={() => setView('upload')} variant="outline" className="rounded-full px-12">Start Your First Audit</Button>
              </div>
            ) : (
              <div className="grid gap-12">
                {history.map((item) => {
                  const programStyle = getProgramColors(item.program);
                  return (
                    <div key={item.id} className={`group relative bg-white rounded-[4.5rem] border-2 border-transparent hover:border-pink-200 transition-all shadow-xl hover:shadow-2xl flex flex-col xl:flex-row overflow-hidden`}>
                      
                      {/* Left: Program Identifier & Score */}
                      <div className={`xl:w-[320px] p-12 bg-gradient-to-br ${programStyle} flex flex-col justify-between text-white relative`}>
                         <div className="absolute top-0 right-0 p-8 text-[12rem] font-black opacity-10 pointer-events-none italic select-none">
                            {item.program}
                         </div>
                         <div className="relative z-10 flex justify-between items-start mb-10">
                            <span className="px-5 py-2 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                               {item.program} SECTOR
                            </span>
                            <div className="flex gap-1">
                               {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: `${i*300}ms`}}></div>)}
                            </div>
                         </div>
                         <div className="relative z-10">
                            <div className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Efficiency Index</div>
                            <div className="text-8xl font-black tracking-tighter italic">
                               {item.report.overallScore}
                            </div>
                         </div>
                      </div>

                      {/* Right: Metadata & Summary */}
                      <div className="flex-1 p-12 xl:p-14 flex flex-col justify-between gap-10">
                         <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            <div>
                               <div className="flex items-center gap-4 mb-3 text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                                  <span>LOGGED: {item.date}</span>
                                  <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                                  <span>PROTOCOL: JUDGE_CORE_v5</span>
                               </div>
                               <h4 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:text-pink-600 transition-colors">
                                  {item.fileName}
                               </h4>
                            </div>
                            <div className="flex gap-3">
                               <button 
                                 onClick={() => { setCurrentReport(item.report); setView('audit'); }}
                                 className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-pink-600 transition-all shadow-lg"
                               >
                                 EXPAND TELEMETRY
                               </button>
                               <button 
                                 onClick={() => {
                                   const newHistory = history.filter(h => h.id !== item.id);
                                   setHistory(newHistory);
                                   localStorage.setItem('audit_history', JSON.stringify(newHistory));
                                 }}
                                 className="p-5 bg-rose-50 text-rose-300 rounded-3xl hover:bg-rose-100 hover:text-rose-600 transition-all shadow-sm"
                               >
                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                            </div>
                         </div>

                         {/* Quick Breakdown */}
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-50">
                            {item.report.categories.slice(0, 4).map((cat, ci) => (
                               <div key={ci} className="space-y-2">
                                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{cat.name}</div>
                                  <div className="flex gap-1">
                                     {[1,2,3,4,5].map(s => (
                                        <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= cat.score ? 'bg-pink-500 shadow-[0_0_5px_#ff007f]' : 'bg-slate-50'}`}></div>
                                     ))}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'rewrite': return <RewriteStudio />;
      case 'examples': return <ExamplesLibrary />;
      case 'audit': return currentReport ? <div className="max-w-7xl mx-auto py-24 px-6"><AuditReportView report={currentReport} onClose={() => setView('dashboard')} /></div> : setView('dashboard');
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-7xl">
        <div className="bg-white/85 backdrop-blur-3xl border border-pink-100 rounded-[3rem] shadow-2xl px-12 py-5 flex justify-between items-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-40"></div>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-pink-600 p-2.5 rounded-2xl text-white shadow-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tighter uppercase">NEURA<span className="text-pink-600 italic">Judge</span></span>
          </div>
          <nav className="hidden md:flex gap-14 text-[10px] font-black text-slate-400 items-center uppercase tracking-[0.4em]">
            <button onClick={() => setView('dashboard')} className={view === 'dashboard' ? 'text-pink-600' : 'hover:text-pink-500'}>Archives</button>
            <button onClick={() => setView('rewrite')} className={view === 'rewrite' ? 'text-pink-600' : 'hover:text-pink-500'}>Studio</button>
            <button onClick={() => setView('examples')} className={view === 'examples' ? 'text-pink-600' : 'hover:text-pink-500'}>Library</button>
            <button onClick={() => setView('upload')} className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] hover:bg-pink-600 transition-all shadow-xl">INITIATE</button>
          </nav>
        </div>
      </header>
      <main>{renderContent()}</main>
      <footer className="py-32 bg-slate-50 border-t-8 border-pink-50 mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 grid md:grid-cols-4 gap-24 relative z-10">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-10">
               <div className="bg-pink-600 p-2.5 rounded-xl text-white shadow-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 12l2 2 4-4" /></svg></div>
               <span className="font-black text-3xl text-slate-900 tracking-tighter uppercase">NEURA<span className="text-pink-600 italic">Judge</span></span>
            </div>
            <p className="text-slate-500 mb-12 max-w-sm font-bold text-xl tracking-tight leading-relaxed">
              Proprietary STEM framework engineered by <span className="text-slate-900 underline decoration-pink-500">NEURA FTC</span>, Almaty NIS Nauryzbay.
            </p>
          </div>
          <div>
            <h5 className="font-black mb-10 uppercase tracking-[0.4em] text-[10px] text-pink-300 italic">Units</h5>
            <ul className="space-y-6 text-slate-600 text-xs font-black uppercase tracking-[0.2em]">
              <li><button onClick={() => setView('upload')} className="hover:text-pink-600 underline underline-offset-8 decoration-pink-100">FTC Challenge</button></li>
              <li><button onClick={() => setView('upload')} className="hover:text-pink-600 underline underline-offset-8 decoration-pink-100">FRC Competition</button></li>
              <li><button onClick={() => setView('upload')} className="hover:text-pink-600 underline underline-offset-8 decoration-pink-100">FLL League</button></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-10 uppercase tracking-[0.4em] text-[10px] text-pink-300 italic">Engineering</h5>
            <ul className="space-y-6 text-slate-600 text-xs font-black uppercase tracking-[0.2em]">
              <li><button onClick={() => setView('examples')} className="hover:text-pink-600 underline underline-offset-8 decoration-pink-100">Example Bank</button></li>
              <li><button onClick={() => setView('rewrite')} className="hover:text-pink-600 underline underline-offset-8 decoration-pink-100">Rewrite Core</button></li>
              <li><button onClick={() => setView('dashboard')} className="hover:text-pink-600 underline underline-offset-8 decoration-pink-100">Audit Logs</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-12 mt-32 pt-12 border-t border-slate-200 text-center flex flex-col md:flex-row justify-between items-center text-pink-300 text-[10px] font-black uppercase tracking-[0.5em]">
          <span>© 2025 NEURA FTC | NIS Nauryzbay</span>
          <span className="mt-8 md:mt-0 opacity-40 italic">Advancing the science of documentation</span>
        </div>
      </footer>
      <style>{`
        @keyframes gradient-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-flow { animation: gradient-flow 6s ease infinite; }
      `}</style>
    </div>
  );
};

export default App;
