'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SourcePage } from '@/components/source/source-page';
import { Plus, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { submitFaqData } from '@/lib/actions/externalApi';

interface QA {
  id: string;
  type: string;
  question: string;
  answer: string;
}

export default function QaPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const [qas, setQas] = useState<QA[]>([
    { id: Date.now().toString(), type: '', question: '', answer: '' },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleAddQA = () => {
    setQas((prev) => [
      ...prev,
      { id: Date.now().toString(), type: '', question: '', answer: '' },
    ]);
  };

  const handleChange = (id: string, field: keyof QA, value: string) => {
    setQas((prev) =>
      prev.map((qa) => (qa.id === id ? { ...qa, [field]: value } : qa))
    );
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 1000)); // Simulate API call
    console.log('Draft saved:', qas);
    setIsSaving(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const hasEmptyFields = qas.some((qa) => !qa.question || !qa.answer);
    if (hasEmptyFields) {
      toast.error('Please fill out all question and answer fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitFaqData(projectId, qas);
      if (result.success) {
        toast.success(result.message);
        setQas([{ id: Date.now().toString(), type: '', question: '', answer: '' }]);
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
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4"> FAQ saved successfully!</h2>
          <Button onClick={() => setSubmissionSuccess(false)}>Add Another Question</Button>
        </div>
      </div>
    );
  }

  return (
    <SourcePage
      title="Q&A"
      description="Create question and answer pairs for your project."
    >
      <div className="space-y-6">

        {qas.map((qa, index) => (
          <div
            key={qa.id}
            className={cn(
              'border rounded-xl p-4 bg-white/60 backdrop-blur-sm shadow-sm space-y-3 transition-all',
              'hover:shadow-md'
            )}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">
                Q&A #{index + 1}
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Type</label>
                <Select
                  onValueChange={(value) =>
                    handleChange(qa.id, 'type', value)
                  }
                  value={qa.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Question
                </label>
                <Textarea
                  placeholder="Enter your question"
                  value={qa.question}
                  onChange={(e) =>
                    handleChange(qa.id, 'question', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Answer
                </label>
                <Textarea
                  placeholder="Enter your answer"
                  value={qa.answer}
                  onChange={(e) =>
                    handleChange(qa.id, 'answer', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Q/A button */}
        <div className="flex justify-center">
          <Button
            onClick={handleAddQA}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add New Q&A
          </Button>
        </div>

        {/* Save / Submit Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button
            variant="secondary"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </SourcePage>
  );
}
