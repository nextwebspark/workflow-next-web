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

    const response = await fetch(process.env.EXTERNAL_API_URL!+ 'faq/save',
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

const textSchema = z.object({
  type: z.literal('text'),
  title: z.string(),
  content: z.string(),
});

const textPayloadSchema = z.object({
  namespace: z.string(),
  data: z.array(textSchema),
});

export async function submitTextData(projectId: string, texts: { title: string; content: string }[]) {
  const payload = {
    namespace: projectId,
    data: texts.map(text => ({ type: 'text' as const, title: text.title, content: text.content })),
  };

  try {
    const validatedPayload = textPayloadSchema.parse(payload);

    const response = await fetch(process.env.EXTERNAL_API_URL! + '/text/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.EXTERNAL_API_KEY!,
      },
      body: JSON.stringify(validatedPayload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return { success: false, message: `API request failed with status ${response.status}: ${errorBody}` };
    }

    const result = await response.json();
    return { success: true, message: 'Text data submitted successfully!', data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: `Invalid payload: ${error.message}` };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

const websiteSchema = z.object({
  type: z.literal('website'),
  url: z.string().url({ message: "Invalid URL format." }),
});

const websitePayloadSchema = z.object({
  namespace: z.string(),
  data: z.array(websiteSchema),
});

export async function submitWebsiteData(projectId: string, websites: { url: string }[]) {
  const payload = {
    namespace: projectId,
    data: websites.map(site => ({ type: 'website' as const, url: site.url })),
  };

  try {
    const validatedPayload = websitePayloadSchema.parse(payload);

    const response = await fetch(process.env.EXTERNAL_API_URL! + '/website/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.EXTERNAL_API_KEY!,
      },
      body: JSON.stringify(validatedPayload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return { success: false, message: `API request failed with status ${response.status}: ${errorBody}` };
    }

    const result = await response.json();
    return { success: true, message: 'Website links submitted successfully!', data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstErrorMessage = Object.values(error.flatten().fieldErrors)[0]?.[0];
      return { success: false, message: firstErrorMessage || 'Invalid payload.' };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
