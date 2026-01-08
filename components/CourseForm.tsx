
import React, { useState } from 'react';
import { CourseFormData, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  isLoading: boolean;
  language: Language;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, isLoading, language }) => {
  const t = TRANSLATIONS[language].form;
  const commonT = TRANSLATIONS[language];

  const [formData, setFormData] = useState<CourseFormData>({
    topic: '',
    level: t.levels[0],
    profile: '',
    objective: '',
    time: '',
    format: t.formats[3],
    language: language
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, language });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-10 md:p-16 rounded-[4rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] dark:shadow-none border border-white/50 dark:border-slate-800 max-w-4xl mx-auto space-y-12 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="col-span-full group">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4 ml-4">{t.topic}</label>
          <div className="relative">
             <input
              required
              type="text"
              placeholder={t.topicPlaceholder}
              className="w-full px-10 py-6 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-800 dark:text-white font-black text-xl placeholder:text-slate-300 dark:placeholder:text-slate-600"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">{t.level}</label>
          <select
            className="w-full px-8 py-6 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 outline-none appearance-none cursor-pointer font-black text-slate-800 dark:text-white"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
          >
            {t.levels.map((lvl: string) => <option key={lvl} className="dark:bg-slate-900">{lvl}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">{t.profile}</label>
          <input
            required
            type="text"
            placeholder={t.profilePlaceholder}
            className="w-full px-8 py-6 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 outline-none transition-all text-slate-800 dark:text-white font-black"
            value={formData.profile}
            onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
          />
        </div>

        <div className="col-span-full space-y-4">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">{t.objective}</label>
          <input
            required
            type="text"
            placeholder={t.objectivePlaceholder}
            className="w-full px-8 py-6 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 outline-none transition-all text-slate-800 dark:text-white font-black"
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">{t.time}</label>
          <input
            required
            type="text"
            placeholder={t.timePlaceholder}
            className="w-full px-8 py-6 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 outline-none transition-all text-slate-800 dark:text-white font-black"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-4">{t.format}</label>
          <select
            className="w-full px-8 py-6 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 outline-none appearance-none cursor-pointer font-black text-slate-800 dark:text-white"
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
          >
            {t.formats.map((f: string) => <option key={f} className="dark:bg-slate-900">{f}</option>)}
          </select>
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className={`w-full py-8 px-12 rounded-[2.5rem] text-white font-black text-2xl shadow-3xl transition-all transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group ${
          isLoading ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-4">
          {isLoading ? (
            <>
              <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {commonT.designing}
            </>
          ) : (
            <>
              {commonT.createCourse}
              <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </>
          )}
        </span>
        {!isLoading && (
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        )}
      </button>
    </form>
  );
};

export default CourseForm;
