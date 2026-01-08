
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  id: string;
  title: string;
  blocks: {
    keyIdea: string;
    appliedExample: string;
    activity: string;
    quickTest: Question[];
  };
}

export interface Unit {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface ProjectProposal {
  title: string;
  description: string;
}

export interface Source {
  title: string;
  url: string;
  type: string;
}

export interface Course {
  title: string;
  description: string;
  level: string;
  targetProfile: string;
  duration: string;
  learningObjectives: string[];
  units: Unit[];
  finalAssessment: Question[];
  finalProjects: ProjectProposal[];
  sources: Source[];
}

export interface CourseFormData {
  topic: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  profile: string;
  objective: string;
  time: string;
  format: 'Lecturas breves' | 'Lecturas + ejercicios' | 'Esquemas + problemas' | 'Mixto';
}
