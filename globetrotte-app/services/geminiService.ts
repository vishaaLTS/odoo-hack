
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTravelSuggestions = async (city: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 5 popular activities and estimated costs for a traveler in ${city}. Return the result as a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              cost: { type: Type.NUMBER },
              category: { type: Type.STRING },
              description: { type: Type.STRING },
              duration: { type: Type.STRING },
            },
            required: ["name", "cost", "category", "description", "duration"],
          },
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return null;
  }
};

export const getTripSummary = async (tripDescription: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the following trip description: "${tripDescription}", summarize it in 3 bullet points focusing on the vibe, budget level, and key highlights.`,
      });
      return response.text;
    } catch (error) {
      return "Unable to generate summary at this time.";
    }
};
