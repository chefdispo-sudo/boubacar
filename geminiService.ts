
import { GoogleGenAI } from "@google/genai";
import { COURSE_BUILDER_PROMPT, COURSE_SCHEMA } from "./constants";
import { CourseFormData, Course } from "./types";

export const generateCourse = async (formData: CourseFormData): Promise<Course> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: COURSE_BUILDER_PROMPT(formData),
      config: {
        responseMimeType: "application/json",
        responseSchema: COURSE_SCHEMA,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    if (!text) throw new Error("No se pudo generar el contenido del curso.");
    
    return JSON.parse(text) as Course;
  } catch (error) {
    console.error("Error generating course:", error);
    throw error;
  }
};
