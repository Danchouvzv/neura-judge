
import React, { useState } from 'react';
import { Button } from './Button';
import { rewriteParagraph } from '../services/geminiService';

export const RewriteStudio: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [tone, setTone] = useState<'strong' | 'judge-friendly' | 'concise'>('strong');

  const handleRewrite = async () => {
    if (!input.trim()) return;
    setIsRewriting(true);
    try {
      const result = await rewriteParagraph(input, tone);
      setOutput(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRewriting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Rewrite Studio</h2>
        <p className="text-slate-500">Transform weak descriptions into judge-friendly evidence.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold text-slate-700">Your Original Draft</label>
            <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
              {(['strong', 'judge-friendly', 'concise'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1 text-xs rounded-md capitalize transition-all ${
                    tone === t ? 'bg-white shadow-sm text-indigo-600 font-bold' : 'text-slate-500'
                  }`}
                >
                  {t.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-0 resize-none transition-all text-sm leading-relaxed"
            placeholder="Paste a paragraph you want to improve (e.g., 'We worked hard on the arm and it works better now')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleRewrite} isLoading={isRewriting} className="w-full py-3" disabled={!input.trim()}>
            Rewrite with AI
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold text-slate-700">AI Polished Version</label>
            {output && (
              <button onClick={copyToClipboard} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Copy
              </button>
            )}
          </div>
          <div className="w-full h-64 p-4 bg-white border-2 border-dashed border-indigo-100 rounded-xl overflow-y-auto text-sm leading-relaxed text-slate-800">
            {output ? (
              <p>{output}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <p>Select a tone and click Rewrite</p>
              </div>
            )}
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-xs text-amber-800">
            <span className="font-bold">Note:</span> AI might use placeholders like <code className="bg-amber-200 px-1 rounded">[insert metric]</code>. 
            Fill these with your real test data to make the evidence valid.
          </div>
        </div>
      </div>
    </div>
  );
};
