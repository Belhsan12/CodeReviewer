
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const reviewCode = async (code: string, language: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const prompt = `
    You are an expert senior software engineer and a world-class code reviewer.
    Your feedback is always constructive, clear, and professional.

    Please provide a detailed, constructive code review for the following ${language} code.

    Analyze the code based on the following criteria:
    1. **Bugs and Logic Errors:** Identify any potential bugs, logical fallacies, or unhandled edge cases. Provide specific examples.
    2. **Performance:** Suggest optimizations for performance, memory usage, or efficiency. Explain why your suggestions improve performance.
    3. **Security:** Point out any potential security vulnerabilities (e.g., XSS, SQL injection, insecure handling of secrets, etc.).
    4. **Best Practices & Readability:** Comment on code style, naming conventions, and whether the code adheres to established best practices and idioms for ${language}. Suggest improvements for clarity and maintainability.
    5. **Architecture & Design:** Comment on the overall structure and design. Are there any design patterns that could be applied? Is the code modular and well-organized?

    Structure your feedback using Markdown. Use headings for each section (e.g., "### Bugs and Logic Errors"). Use code blocks (\`\`\`) for code snippets and suggestions.
    Start with a brief, high-level summary of the code's quality before diving into the detailed points.

    Here is the code to review:
    \`\`\`${language.toLowerCase()}
    ${code}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get code review from Gemini API. Please check the console for details.");
  }
};
