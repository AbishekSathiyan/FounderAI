import OpenAI from "openai";

export const generateExplanation = async (req, res) => {
  try {
    // Safety check
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key not loaded" });
    }

    const { result, inputs } = req.body;

    if (!result || !inputs) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // Initialize OpenAI inside function
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a UAE business setup expert.

User Profile:
Industry: ${inputs.industry}
Budget: AED ${inputs.budget}
Visas: ${inputs.visas}

Recommended Free Zone: ${result.name}
Total Cost: AED ${result.totalCost}

Write a professional explanation (max 120 words)
explaining why this free zone is suitable.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional consultant." },
        { role: "user", content: prompt },
      ],
    });

    res.json({
      explanation: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "AI generation failed" });
  }
};