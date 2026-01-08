
import React, { useState } from 'react';
import { Question, ProjectProposal, Source } from '../types';

interface AssessmentProps {
  questions?: Question[];
  projects?: ProjectProposal[];
  sources?: Source[];
  type: 'evaluation' | 'project' | 'sources';
}

const Assessment: React.FC<AssessmentProps> = ({ questions, projects, sources, type }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showScore, setShowScore] = useState(false);

  const score = questions?.filter((q, i) => answers[i] === q.correctAnswer).length || 0;

  if (type === 'evaluation' && questions) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Evaluación Final</h2>
        <p className="text-slate-500 mb-8">Demuestra lo aprendido en este curso integral.</p>
        
        <div className="space-y-10">
          {questions.map((q, i) => (
            <div key={i} className="space-y-4">
              <p className="text-lg font-semibold text-slate-700">{i + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    disabled={showScore}
                    onClick={() => setAnswers({...answers, [i]: opt})}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      showScore
                        ? opt === q.correctAnswer
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                          : answers[i] === opt ? 'bg-rose-100 border-rose-500 text-rose-700' : 'bg-slate-50 border-slate-200'
                        : answers[i] === opt ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!showScore ? (
          <button
            onClick={() => setShowScore(true)}
            className="mt-12 w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-indigo-700 transition-all"
          >
            Finalizar Evaluación
          </button>
        ) : (
          <div className="mt-12 p-8 bg-indigo-50 border border-indigo-200 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">Tu resultado</h3>
            <div className="text-5xl font-black text-indigo-600 mb-4">{score} / {questions.length}</div>
            <p className="text-indigo-700 italic">
              {score > questions.length / 2 ? '¡Enhorabuena! Has completado el curso con éxito.' : 'Has hecho un gran esfuerzo. Te recomendamos repasar algunas unidades.'}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (type === 'project' && projects) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Propuestas de Proyecto Final</h2>
          <p className="text-slate-500 mb-8 text-center">Aplica todo el conocimiento en un caso real.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex flex-col">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4 shadow-md">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-indigo-900 mb-3">{p.title}</h3>
                <p className="text-indigo-800 leading-relaxed flex-grow">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sources' && sources) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Fuentes y Referencias</h2>
        <div className="space-y-4">
          {sources.map((s, i) => (
            <a 
              key={i} 
              href={s.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{s.type === 'libro' ? '📖' : '🌐'}</span>
                <div>
                  <p className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{s.title}</p>
                  <p className="text-xs text-slate-400 font-mono truncate max-w-xs md:max-w-md">{s.url}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Assessment;
