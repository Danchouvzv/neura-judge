
import React from 'react';

const EXAMPLES = [
  {
    tag: 'Iteration',
    title: 'Testing Variable In-take Speeds',
    content: 'We observed a 30% jam rate at 100% power. After 5 trials at 70% power, jams reduced to 5%. We finalized the code to cap motor speed at 75% for reliability.',
    strength: 'Uses specific metrics and explains the "Why" behind the decision.'
  },
  {
    tag: 'Outreach',
    title: 'STEM Library Workshop',
    content: 'Mentored 24 elementary students across 3 sessions. 90% of participants reported increased interest in robotics via post-session survey. Established recurring monthly dates.',
    strength: 'Shows impact and sustainability beyond just "attending an event".'
  },
  {
    tag: 'CAD',
    title: 'Drivetrain Trade-offs',
    content: 'Evaluated 4-wheel vs 6-wheel drop center. Chose 6-wheel for superior turning scrub compensation despite a 0.5lb weight penalty. Verified via CAD mass properties.',
    strength: 'Demonstrates engineering trade-offs and tool usage (CAD).'
  }
];

export const ExamplesLibrary: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Portfolio Example Bank</h2>
        <p className="text-slate-500">Learn from high-scoring snippets from championship teams.</p>
      </div>

      <div className="grid gap-6">
        {EXAMPLES.map((ex, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-xs font-bold rounded uppercase">
                    {ex.tag}
                  </span>
                  <h3 className="font-bold text-slate-800">{ex.title}</h3>
                </div>
                <p className="text-sm text-slate-600 italic mb-4 leading-relaxed">"{ex.content}"</p>
                <button className="text-xs text-indigo-600 font-bold hover:underline">Use as template →</button>
              </div>
              <div className="p-6 md:w-1/3 bg-slate-50">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Why it works</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {ex.strength}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
