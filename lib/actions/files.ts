'use server';

import { z } from 'zod';

const fileUploadResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export async function uploadFiles(
  projectId: string,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const files = formData.getAll('file') as File[];

  if (!files.length) {
    return { success: false, message: 'No files to upload.' };
  }

  // The incoming `formData` from the client contains the files.
  // We'll add the projectId to it before sending to the external API.
  formData.append('projectId', projectId);

  try {
    const response = await fetch(process.env.EXTERNAL_API_URL! + 'file/upload', {
      method: 'POST',
      headers: {
        'api-key': process.env.EXTERNAL_API_KEY!,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('API Error:', errorBody);
      return {
        success: false,
        message: `API request failed with status ${response.status}.`,
      };
    }

    const result = await response.json();
    const validatedResult = fileUploadResponseSchema.parse(result);

    return { success: validatedResult.success, message: validatedResult.message || 'Files uploaded successfully!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: `Invalid API response: ${error.message}` };
    }
    console.error('File upload failed:', error);
    return { success: false, message: 'An unexpected error occurred during the upload.' };
  }
}