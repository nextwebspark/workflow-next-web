'use server';

import { z } from 'zod';

/**
 * Mocks connecting a service for a project.
 * In a real app, this would handle the OAuth callback and store tokens in the database.
 */
export async function connectService(projectId: string, service: string): Promise<{ success: boolean; message: string }> {
  console.log(`Connecting ${service} for project ${projectId}...`);
  // Simulate storing credentials
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: `${service} connected successfully.` };
}

/**
 * Mocks disconnecting a service for a project.
 * In a real app, this would revoke tokens and remove them from the database.
 */
export async function disconnectService(projectId: string, service: string): Promise<{ success: boolean; message: string }> {
  console.log(`Disconnecting ${service} for project ${projectId}...`);
  // Simulate removing credentials
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: `${service} disconnected.` };
}

/**
 * Simulates a background workflow trigger when a new file is "added" to a connected service.
 */
export async function triggerWorkflow(
  projectId: string,
  source: string,
  fileName: string,
  fileUrl: string
): Promise<{ success: boolean; message: string }> {
  const payload = {
    namespace: projectId,
    source,
    fileName,
    fileUrl,
  };

  console.log('Triggering background workflow with payload:', payload);

  try {
    const response = await fetch(process.env.EXTERNAL_API_URL! + '/drive/workflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.EXTERNAL_API_KEY!,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, message: `Workflow trigger failed: ${response.statusText}` };
    }
    return { success: true, message: `Workflow for ${fileName} started.` };
  } catch (error) {
    console.error('Workflow trigger error:', error);
    return { success: false, message: 'Failed to trigger workflow.' };
  }
}