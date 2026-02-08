
import { GoogleGenAI, Type } from "@google/genai";
import { AuditReport, FirstProgram } from "../types";
import { PROGRAM_RUBRICS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzePortfolio(
  text: string, 
  program: FirstProgram
): Promise<AuditReport> {
  const rubric = PROGRAM_RUBRICS[program];
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the following Engineering Portfolio text based on the ${program} rubric:
    
    Rubric requirements:
    ${rubric}

    Portfolio Text:
    ${text}
    
    Provide a detailed audit report.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER, description: "Final score from 0-100" },
          summary: { type: Type.STRING, description: "A judge's summary of the document" },
          categories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                score: { type: Type.NUMBER },
                reasoning: { type: Type.STRING },
                evidence: { type: Type.ARRAY, items: { type: Type.STRING } },
                gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["name", "score", "reasoning", "evidence", "gaps", "suggestions"]
            }
          },
          waterDetection: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                originalText: { type: Type.STRING },
                reasoning: { type: Type.STRING },
                suggestion: { type: Type.STRING }
              },
              required: ["originalText", "reasoning", "suggestion"]
            }
          },
          checklist: {
            type: Type.OBJECT,
            properties: {
              today: { type: Type.ARRAY, items: { type: Type.STRING } },
              thisWeek: { type: Type.ARRAY, items: { type: Type.STRING } },
              beforeSeason: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["today", "thisWeek", "beforeSeason"]
          }
        },
        required: ["overallScore", "summary", "categories", "waterDetection", "checklist"]
      }
    }
  });

  return JSON.parse(response.text.trim()) as AuditReport;
}

export async function rewriteParagraph(original: string, tone: 'strong' | 'judge-friendly' | 'concise'): Promise<string> {
  const prompt = `Rewrite the following paragraph to be ${tone}. 
  If it lacks metrics, use placeholders like [insert metric]. 
  Do not invent facts, only improve structure and clarity.
  
  Paragraph: "${original}"`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });

  return response.text.trim();
}
