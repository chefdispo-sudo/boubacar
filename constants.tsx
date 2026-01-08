
import { Type } from "@google/genai";

export const COURSE_BUILDER_PROMPT = (data: any) => `
Actúa como un profesor y diseñador instruccional senior experto en ${data.topic}.
Tu misión es diseñar un curso completo para un alumno con perfil "${data.profile}", nivel "${data.level}" y cuyo objetivo es "${data.objective}".
El tiempo disponible es "${data.time}" y el formato preferido es "${data.format}".

Adapta la profundidad del contenido al nivel indicado. Usa un tono didáctico, cercano y humano.
Evita párrafos gigantes; usa frases cortas y claras.
Si el tema es complejo, usa analogías intuitivas pero mantén el rigor.
No menciones que eres una IA ni un modelo. Habla como un profesor real.
El idioma debe ser siempre ESPAÑOL DE ESPAÑA.

Debes incluir:
1. Título y descripción atractiva.
2. 5-7 objetivos de aprendizaje.
3. De 6 a 8 Unidades (Rutas de aprendizaje).
4. Cada unidad con un título creativo y 3 a 5 lecciones.
5. Cada lección con bloques: Idea Clave (4-8 frases), Ejemplo Aplicado, Actividad Práctica y Test Rápido (3 preguntas).
6. Una evaluación final de 8 a 10 preguntas.
7. Dos propuestas de proyecto final integrador.
8. Lista de fuentes y referencias reales.

IMPORTANTE: Utiliza la herramienta de Google Search para asegurar que los datos, ejemplos y fuentes sean veraces y actuales.
`;

export const COURSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    level: { type: Type.STRING },
    targetProfile: { type: Type.STRING },
    duration: { type: Type.STRING },
    learningObjectives: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    units: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          lessons: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                blocks: {
                  type: Type.OBJECT,
                  properties: {
                    keyIdea: { type: Type.STRING },
                    appliedExample: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    quickTest: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          question: { type: Type.STRING },
                          options: { type: Type.ARRAY, items: { type: Type.STRING } },
                          correctAnswer: { type: Type.STRING }
                        },
                        required: ["question", "options", "correctAnswer"]
                      }
                    }
                  },
                  required: ["keyIdea", "appliedExample", "activity", "quickTest"]
                }
              },
              required: ["id", "title", "blocks"]
            }
          }
        },
        required: ["id", "title", "summary", "lessons"]
      }
    },
    finalAssessment: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.STRING }
        },
        required: ["question", "options", "correctAnswer"]
      }
    },
    finalProjects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["title", "description"]
      }
    },
    sources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          url: { type: Type.STRING },
          type: { type: Type.STRING }
        },
        required: ["title", "url", "type"]
      }
    }
  },
  required: ["title", "description", "level", "targetProfile", "duration", "learningObjectives", "units", "finalAssessment", "finalProjects", "sources"]
};
