import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export async function POST(request: Request) {
  const { gpa } = await request.json();

  const response = await together.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Motivate the user for their GPA, give it in a single line without any formatting. give only the text, remove markdown formatting and give it in a single line with only text",
      },
      {
        role: "user",
        content: `Motivate the user for their GPA ${Number(gpa).toFixed(
          3
        )} out of 10`,
      },
    ],
    model: "deepseek-ai/DeepSeek-V3",
  });

  return new Response(
    JSON.stringify({
      message: response.choices[0]?.message?.content,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function GET() {
  const response = await together.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Motivate the user for their GPA, give it in a single line without any formatting. give only the text",
      },
      {
        role: "user",
        content: `Motivate the user for their GPA 10 out of 10`,
      },
    ],
    model: "deepseek-ai/DeepSeek-V3",
  });

  return new Response(
    JSON.stringify({
      message: response.choices[0]?.message?.content,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
