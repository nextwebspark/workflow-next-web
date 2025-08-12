'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { auth, currentUser   } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name) {
    throw new Error('Project name is required');
  }

  // Get user email from Clerk
  //const { clerkClient } = await import('@clerk/nextjs/server');
  const user = await currentUser()
  

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert({
      name,
      description: description || null,
      user_email: user?.emailAddresses[0]?.emailAddress || '',
      status: 'Onboarding',
      trigger: 'Manual',
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  revalidatePath('/dashboard');
  return { success: true, project: data };
}

export async function getProjectsByUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }
  
  // Get Clerk user data
  //const { clerkClient } = await import('@clerk/nextjs/server');
  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress

  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('user_email', email)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data;
}