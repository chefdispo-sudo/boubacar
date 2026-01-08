
import { GoogleGenAI } from "@google/genai";
import { COURSE_BUILDER_PROMPT, COURSE_SCHEMA } from "./constants";
import { CourseFormData, Course, Source } from "./types";

export const generateCourse = async (formData: CourseFormData): Promise<Course> => {
  // Correctly initialize GoogleGenAI using process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      // Switched to gemini-3-pro-preview for complex instructional design tasks
      model: "gemini-3-pro-preview",
      contents: COURSE_BUILDER_PROMPT(formData),
      config: {
        responseMimeType: "application/json",
        responseSchema: COURSE_SCHEMA,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    const course = JSON.parse(text) as Course;

    // Rule: Extract grounding metadata URLs when using Google Search and add them to the course sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      const searchSources: Source[] = groundingChunks
        .filter((chunk: any) => chunk && chunk.web)
        .map((chunk: any) => ({
          title: chunk.web.title || "Web Reference",
          url: chunk.web.uri,
          type: "web"
        }));
      
      if (searchSources.length > 0) {
        course.sources = [...(course.sources || []), ...searchSources];
      }
    }

    return course;
  } catch (error) {
    console.error("Error generating course:", error);
    throw error;
  }
};
