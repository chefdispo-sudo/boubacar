
import React, { useState, useEffect } from 'react';
import CourseForm from './components/CourseForm';
import Sidebar from './components/Sidebar';
import LessonContent from './components/LessonContent';
import Assessment from './components/Assessment';
import { generateCourse } from './geminiService';
import { Course, CourseFormData, Lesson, Unit } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'classroom'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeUnitId, setActiveUnitId] = useState<string>('');
  const [activeLessonId, setActiveLessonId] = useState<string>('');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleCreateCourse = async (formData: CourseFormData) => {
    setIsLoading(true);
    try {
      const generated = await generateCourse(formData);
      setCourse(generated);
      setView('classroom');
      // Initialize with first unit/lesson
      if (generated.units.length > 0) {
        setActiveUnitId(generated.units[0].id);
        setActiveLessonId(generated.units[0].lessons[0].id);
      }
    } catch (error) {
      alert("Hubo un error al diseñar tu curso. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentUnit = course?.units.find(u => u.id === activeUnitId);
  const currentLesson = currentUnit?.lessons.find(l => l.id === activeLessonId);

  const handleLessonComplete = () => {
    if (!activeLessonId) return;
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons([...completedLessons, activeLessonId]);
    }
    // Automatically go to next lesson logic could be added here
  };

  const totalLessons = course?.units.reduce((acc, u) => acc + u.lessons.length, 0) || 1;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  const navigateTo = (direction: 'prev' | 'next') => {
    if (!course || !activeLessonId) return;
    
    // Flat list of lessons to navigate easily
    const flatLessons: {uId: string, lId: string}[] = [];
    course.units.forEach(u => u.lessons.forEach(l => flatLessons.push({uId: u.id, lId: l.id})));
    
    const currentIdx = flatLessons.findIndex(f => f.lId === activeLessonId);
    let nextIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
    
    if (nextIdx >= 0 && nextIdx < flatLessons.length) {
      const target = flatLessons[nextIdx];
      setActiveUnitId(target.uId);
      setActiveLessonId(target.lId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (view === 'home') {
    return (
      <div className="min-h-screen pb-20">
        <header className="bg-white border-b border-slate-100 py-6 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">ProfesorIA</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              Crea tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">aula virtual</span> en minutos
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              La IA diseña un plan de estudio completo, profesional y adaptado a tus necesidades con lecciones, actividades y evaluaciones.
            </p>
          </div>
          
          <CourseForm onSubmit={handleCreateCourse} isLoading={isLoading} />

          <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <div className="text-4xl">🎯</div>
              <h3 className="text-xl font-bold text-slate-800">Objetivos reales</h3>
              <p className="text-slate-500">Enfocado en resultados tangibles: desde aprobar un examen hasta dominar una nueva habilidad profesional.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">⚡</div>
              <h3 className="text-xl font-bold text-slate-800">Personalización total</h3>
              <p className="text-slate-500">Adaptamos el tono y la complejidad según tu perfil y el tiempo que realmente tienes disponible.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">📚</div>
              <h3 className="text-xl font-bold text-slate-800">Aula completa</h3>
              <p className="text-slate-500">Incluye rutas de aprendizaje, bloques de teoría, ejemplos prácticos, tests y proyectos finales.</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header & Progress */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('home')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
            <div>
              <h1 className="font-black text-slate-800 leading-tight truncate max-w-[200px] md:max-w-md">{course?.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                 <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{course?.level}</span>
                 <span className="text-xs text-slate-400 font-medium">Progreso: {progressPercent}%</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-64 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
        {course && (
          <Sidebar 
            course={course} 
            activeLessonId={activeLessonId} 
            onSelectLesson={(uId, lId) => {
              setActiveUnitId(uId);
              setActiveLessonId(lId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedLessons={completedLessons}
          />
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-12 pb-24">
            {activeUnitId === 'final' ? (
              <Assessment 
                type={activeLessonId as any} 
                questions={course?.finalAssessment} 
                projects={course?.finalProjects} 
                sources={course?.sources}
              />
            ) : currentLesson ? (
              <>
                <div className="space-y-4">
                  <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
                    Unidad {course?.units.findIndex(u => u.id === activeUnitId)! + 1} • Lección {currentUnit?.lessons.findIndex(l => l.id === activeLessonId)! + 1}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                    {currentLesson.title}
                  </h2>
                  <p className="text-slate-500 italic text-lg">{currentUnit?.summary}</p>
                </div>

                <LessonContent 
                  lesson={currentLesson} 
                  onComplete={handleLessonComplete}
                  isCompleted={completedLessons.includes(activeLessonId)}
                />

                <div className="flex justify-between items-center pt-8 border-t border-slate-200">
                  <button 
                    onClick={() => navigateTo('prev')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Anterior
                  </button>
                  <button 
                    onClick={() => navigateTo('next')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white font-bold shadow-lg hover:bg-slate-900 transition-colors"
                  >
                    Siguiente
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center space-y-6">
                <h2 className="text-4xl font-black text-slate-900">{course?.title}</h2>
                <p className="text-slate-500 text-xl max-w-2xl mx-auto">{course?.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto pt-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Duración estimada</p>
                    <p className="font-bold text-slate-800">{course?.duration}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Nivel</p>
                    <p className="font-bold text-slate-800">{course?.level}</p>
                  </div>
                </div>

                <div className="text-left pt-12 space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    🎯 Objetivos del curso
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course?.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex gap-3 items-start bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <span className="text-emerald-500 flex-shrink-0">✓</span>
                        <span className="text-slate-600 text-sm leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    if (course?.units.length) {
                      setActiveUnitId(course.units[0].id);
                      setActiveLessonId(course.units[0].lessons[0].id);
                    }
                  }}
                  className="mt-12 px-12 py-5 bg-indigo-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform hover:scale-105"
                >
                  ¡Empezar a aprender ahora!
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
