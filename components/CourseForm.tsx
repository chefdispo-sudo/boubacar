
import React, { useState } from 'react';
import { CourseFormData } from '../types';

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  isLoading: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CourseFormData>({
    topic: '',
    level: 'Principiante',
    profile: '',
    objective: '',
    time: '',
    format: 'Mixto',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Tema del curso</label>
          <input
            required
            type="text"
            placeholder="Ej. Introducción a la Astrofísica o Marketing Digital"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nivel del alumno</label>
          <select
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
          >
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Perfil del alumno</label>
          <input
            required
            type="text"
            placeholder="Ej. Estudiante de bachillerato"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.profile}
            onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Objetivo principal</label>
          <input
            required
            type="text"
            placeholder="Ej. Entender los mecanismos básicos de la relatividad"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Tiempo disponible</label>
          <input
            required
            type="text"
            placeholder="Ej. 4 semanas, 30 min/día"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Formato preferido</label>
          <select
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
          >
            <option>Lecturas breves</option>
            <option>Lecturas + ejercicios</option>
            <option>Esquemas + problemas</option>
            <option>Mixto</option>
          </select>
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
          isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Diseñando tu curso...
          </span>
        ) : (
          "Diseñar curso ahora"
        )}
      </button>
    </form>
  );
};

export default CourseForm;
