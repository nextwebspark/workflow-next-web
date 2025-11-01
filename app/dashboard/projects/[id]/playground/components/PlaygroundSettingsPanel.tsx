'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'claude', name: 'Claude' },
  { id: 'gemini', name: 'Gemini' },
];

interface PlaygroundSettings {
  model: string;
  contextWindow: number;
  temperature: number;
  topP: number;
  topK: number;
  maxTokens: number;
  learningRate: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequence: string;
}

interface PlaygroundSettingsPanelProps {
  settings: PlaygroundSettings;
  onSettingsChange: (settings: Partial<PlaygroundSettings>) => void;
}

export function PlaygroundSettingsPanel({ settings, onSettingsChange }: PlaygroundSettingsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full p-4 space-y-4"
    >
      <Card className="p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Model</Label>
            <Select
              value={settings.model}
              onValueChange={(value) => onSettingsChange({ model: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Context Window</Label>
            <Input
              type="number"
              value={settings.contextWindow}
              onChange={(e) => onSettingsChange({ contextWindow: Number(e.target.value) })}
              min={1}
              className="mt-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Temperature ({settings.temperature.toFixed(2)})</Label>
            <Slider
              value={[settings.temperature]}
              onValueChange={([value]) => onSettingsChange({ temperature: value })}
              min={0}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Top-p ({settings.topP.toFixed(2)})</Label>
            <Slider
              value={[settings.topP]}
              onValueChange={([value]) => onSettingsChange({ topP: value })}
              min={0}
              max={1}
              step={0.1}
            />
          </div>

          <div>
            <Label>Top-k</Label>
            <Input
              type="number"
              value={settings.topK}
              onChange={(e) => onSettingsChange({ topK: Number(e.target.value) })}
              min={1}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Max Tokens</Label>
            <Input
              type="number"
              value={settings.maxTokens}
              onChange={(e) => onSettingsChange({ maxTokens: Number(e.target.value) })}
              min={1}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Learning Rate</Label>
            <Input
              type="number"
              value={settings.learningRate}
              onChange={(e) => onSettingsChange({ learningRate: Number(e.target.value) })}
              min={0}
              step={0.001}
              className="mt-1"
            />
          </div>

          <div className="space-y-2">
            <Label>Frequency Penalty ({settings.frequencyPenalty.toFixed(2)})</Label>
            <Slider
              value={[settings.frequencyPenalty]}
              onValueChange={([value]) => onSettingsChange({ frequencyPenalty: value })}
              min={0}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label>Presence Penalty ({settings.presencePenalty.toFixed(2)})</Label>
            <Slider
              value={[settings.presencePenalty]}
              onValueChange={([value]) => onSettingsChange({ presencePenalty: value })}
              min={0}
              max={2}
              step={0.1}
            />
          </div>

          <div>
            <Label>Stop Sequence</Label>
            <Input
              value={settings.stopSequence}
              onChange={(e) => onSettingsChange({ stopSequence: e.target.value })}
              placeholder="Enter comma-separated sequences"
              className="mt-1"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}