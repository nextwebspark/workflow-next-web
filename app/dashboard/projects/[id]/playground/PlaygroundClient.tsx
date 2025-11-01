'use client';

import { useState } from 'react';
import { PlaygroundSettingsPanel } from './components/PlaygroundSettingsPanel';
import { ChatWidget } from './components/ChatWidget';

const defaultSettings = {
  model: 'gpt-4',
  contextWindow: 4096,
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxTokens: 1000,
  learningRate: 0.001,
  frequencyPenalty: 0,
  presencePenalty: 0,
  stopSequence: '',
};

export default function PlaygroundClient({ projectId }: { projectId: string }) {
  const [settings, setSettings] = useState(defaultSettings);

  const handleSettingsChange = (newSettings: Partial<typeof defaultSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-dot-pattern relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
      <div className="relative h-full flex">
        <div className="w-[320px] shrink-0 border-r bg-background/50 backdrop-blur-sm overflow-y-auto">
          <PlaygroundSettingsPanel
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </div>
        <div className="flex-1 h-full">
          <ChatWidget projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
