'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SourcePage } from '@/components/source/source-page';
import { Plus, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { submitTextData } from '@/lib/actions/externalApi';

interface TextEntry {
  id: string;
  title: string;
  content: string;
}

export default function TextPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const [texts, setTexts] = useState<TextEntry[]>([
    { id: Date.now().toString(), title: '', content: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleAddText = () => {
    setTexts((prev) => [
      ...prev,
      { id: Date.now().toString(), title: '', content: '' },
    ]);
  };

  const handleChange = (id: string, field: keyof TextEntry, value: string) => {
    setTexts((prev) =>
      prev.map((text) => (text.id === id ? { ...text, [field]: value } : text))
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const hasEmptyFields = texts.some((text) => !text.title || !text.content);
    if (hasEmptyFields) {
      toast.error('Please fill out all title and text fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitTextData(projectId, texts);
      if (result.success) {
        toast.success(result.message);
        setTexts([{ id: Date.now().toString(), title: '', content: '' }]);
        setSubmissionSuccess(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    }
    setIsSubmitting(false);
  };

  if (submissionSuccess) {
    return (
      <SourcePage title="Text" description="Create text entries for your project.">
        <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Text saved successfully!</h2>
          <Button onClick={() => setSubmissionSuccess(false)}>Add Another Text</Button>
        </div>
      </SourcePage>
    );
  }

  return (
    <SourcePage
      title="Text"
      description="Create text entries for your project."
    >
      <div className="space-y-6">
        {texts.map((text, index) => (
          <div
            key={text.id}
            className="border rounded-xl p-4 bg-white/60 backdrop-blur-sm shadow-sm space-y-3"
          >
            <h3 className="font-semibold text-gray-700">Text #{index + 1}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <Input
                  placeholder="Enter a title"
                  value={text.title}
                  onChange={(e) => handleChange(text.id, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Text</label>
                <Textarea
                  placeholder="Enter your text content"
                  value={text.content}
                  onChange={(e) => handleChange(text.id, 'content', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button onClick={handleAddText} variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Text
          </Button>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </SourcePage>
  );
}