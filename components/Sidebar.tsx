
import React from 'react';
import { Course, Unit } from '../types';

interface SidebarProps {
  course: Course;
  activeLessonId: string;
  onSelectLesson: (unitId: string, lessonId: string) => void;
  completedLessons: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ course, activeLessonId, onSelectLesson, completedLessons }) => {
  return (
    <aside className="w-80 h-full bg-slate-50 border-r border-slate-200 overflow-y-auto hidden lg:block sticky top-0">
      <div className="p-6">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Contenido del curso</h2>
        <div className="space-y-6">
          {course.units.map((unit, uIdx) => (
            <div key={unit.id} className="space-y-2">
              <h3 className="font-bold text-slate-800 flex items-start gap-2">
                <span className="bg-indigo-100 text-indigo-700 rounded w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                  {uIdx + 1}
                </span>
                <span className="leading-tight">{unit.title}</span>
              </h3>
              <ul className="space-y-1 ml-8">
                {unit.lessons.map((lesson, lIdx) => {
                  const isActive = activeLessonId === lesson.id;
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onSelectLesson(unit.id, lesson.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-colors group flex items-center justify-between ${
                          isActive 
                            ? 'bg-indigo-600 text-white font-medium' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex-1 truncate">
                          {uIdx + 1}.{lIdx + 1} {lesson.title}
                        </span>
                        {isCompleted && !isActive && (
                          <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          
          <div className="pt-6 border-t border-slate-200 space-y-2">
             <button 
              onClick={() => onSelectLesson('final', 'assessment')}
              className={`w-full text-left p-2 rounded-lg text-sm font-bold transition-colors ${activeLessonId === 'assessment' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
             >
                🎯 Evaluación Final
             </button>
             <button 
              onClick={() => onSelectLesson('final', 'project')}
              className={`w-full text-left p-2 rounded-lg text-sm font-bold transition-colors ${activeLessonId === 'project' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
             >
                🏗️ Proyecto Final
             </button>
             <button 
              onClick={() => onSelectLesson('final', 'sources')}
              className={`w-full text-left p-2 rounded-lg text-sm font-bold transition-colors ${activeLessonId === 'sources' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
             >
                📚 Referencias
             </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
