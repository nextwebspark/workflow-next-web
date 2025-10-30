'use client';

import { ChatWidget } from '@/app/dashboard/projects/[id]/playground/components/ChatWidget';
import { useParams } from 'next/navigation';

export default function ChatWidgetPage() {
  const params = useParams();
  const projectId = params.id as string;

  return (
    <div className="w-full h-screen bg-white">
      <ChatWidget
        projectId={projectId}
        isEmbedded={true}
        className="w-full h-full max-w-full max-h-full rounded-none border-none shadow-none"
      />
    </div>
  );
}
