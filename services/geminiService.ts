import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A simple check, though the environment should have it.
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const askAITutor = async (question: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please contact the administrator.";
  }
  
  try {
    const prompt = `You are an expert academic tutor for university students. Your tone is helpful, encouraging, and clear. Explain the following concept concisely, using analogies or simple examples where possible. Break down complex ideas into smaller, easy-to-understand parts. Do not refuse to answer. The question is: "${question}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while trying to answer your question. Please try again later.";
  }
};
