'use server';

import { z } from 'zod';

const faqSchema = z.object({
  type: z.string(),
  question: z.string(),
  answer: z.string(),
});

const payloadSchema = z.object({
  namespace: z.string(),
  data: z.array(faqSchema),
});

export async function submitFaqData(projectId: string, qas: { type: string; question: string; answer: string }[]) {
  const payload = {
    namespace: projectId,
    data: qas.map(qa => ({ type: qa.type, question: qa.question, answer: qa.answer })),
  };

  try {
    const validatedPayload = payloadSchema.parse(payload);

    const response = await fetch(process.env.EXTERNAL_API_URL!,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.EXTERNAL_API_KEY!,
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        success: false,
        message: `API request failed with status ${response.status}: ${errorBody}`,
      };
    }

    const result = await response.json();
    return { success: true, message: 'FAQ data submitted successfully!', data: result };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: `Invalid payload: ${error.message}` };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
