
import React, { useState } from 'react';
import { Lesson, Question } from '../types';

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
  isCompleted: boolean;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson, onComplete, isCompleted }) => {
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelectOption = (qIdx: number, option: string) => {
    setTestAnswers({ ...testAnswers, [qIdx]: option });
  };

  const isAllCorrect = lesson.blocks.quickTest.every(
    (q, idx) => testAnswers[idx] === q.correctAnswer
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Idea Clave */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-100 p-2 rounded-lg">
            <span className="text-xl">💡</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Idea Clave</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg">
          {lesson.blocks.keyIdea}
        </p>
      </section>

      {/* Ejemplo Aplicado */}
      <section className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <span className="text-xl">🛠️</span>
          </div>
          <h2 className="text-xl font-bold text-indigo-900">Ejemplo Aplicado</h2>
        </div>
        <div className="prose prose-indigo text-indigo-800 max-w-none italic">
          {lesson.blocks.appliedExample}
        </div>
      </section>

      {/* Actividad Práctica */}
      <section className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <span className="text-xl">✍️</span>
          </div>
          <h2 className="text-xl font-bold text-emerald-900">Actividad Práctica</h2>
        </div>
        <p className="text-emerald-800 leading-relaxed font-medium">
          {lesson.blocks.activity}
        </p>
      </section>

      {/* Test Rápido */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-violet-100 p-2 rounded-lg">
            <span className="text-xl">📝</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Test Rápido</h2>
        </div>
        
        <div className="space-y-8">
          {lesson.blocks.quickTest.map((q, qIdx) => (
            <div key={qIdx} className="space-y-4">
              <p className="font-semibold text-slate-700">{qIdx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => {
                  const isSelected = testAnswers[qIdx] === opt;
                  const isCorrect = opt === q.correctAnswer;
                  let btnClass = "p-3 rounded-xl border text-left transition-all ";
                  
                  if (showFeedback) {
                    if (isCorrect) btnClass += "bg-emerald-100 border-emerald-500 text-emerald-700";
                    else if (isSelected) btnClass += "bg-rose-100 border-rose-500 text-rose-700";
                    else btnClass += "bg-slate-50 border-slate-100 text-slate-400";
                  } else {
                    btnClass += isSelected 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md" 
                      : "bg-white border-slate-200 hover:border-indigo-300 text-slate-600";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={showFeedback}
                      onClick={() => handleSelectOption(qIdx, opt)}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          {!showFeedback ? (
            <button
              disabled={Object.keys(testAnswers).length < lesson.blocks.quickTest.length}
              onClick={() => setShowFeedback(true)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              Comprobar respuestas
            </button>
          ) : (
            <div className="text-center space-y-4 w-full">
              {isAllCorrect ? (
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 font-medium animate-bounce">
                  ✨ ¡Excelente! Has superado el test con éxito.
                </div>
              ) : (
                <div className="p-4 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 font-medium">
                  Repasa los conceptos y vuelve a intentarlo en la siguiente lección.
                </div>
              )}
              {!isCompleted && (
                <button
                  onClick={onComplete}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors"
                >
                  Marcar como completada y continuar
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LessonContent;
