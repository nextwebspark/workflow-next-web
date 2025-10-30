'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { SourcePage } from '@/components/source/source-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitWebsiteData } from '@/lib/actions/externalApi';
import { Plus, Send, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface WebsiteEntry {
  id: string;
  url: string;
}

export default function WebsitePage() {
  const { id: projectId } = useParams<{ id: string }>();
  const [websites, setWebsites] = useState<WebsiteEntry[]>([
    { id: Date.now().toString(), url: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleAddWebsite = () => {
    setWebsites((prev) => [...prev, { id: Date.now().toString(), url: '' }]);
  };

  const handleRemoveWebsite = (id: string) => {
    setWebsites((prev) => prev.filter((site) => site.id !== id));
  };

  const handleChange = (id: string, value: string) => {
    setWebsites((prev) =>
      prev.map((site) => (site.id === id ? { ...site, url: value } : site))
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const hasEmptyFields = websites.some((site) => !site.url.trim());
    if (hasEmptyFields) {
      toast.error('Please fill out all URL fields or remove empty ones.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitWebsiteData(projectId, websites);
      if (result.success) {
        toast.success(result.message);
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
      <SourcePage title="Website" description="Import content from websites and web pages.">
        <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Website links saved successfully!</h2>
          <Button onClick={() => {
            setWebsites([{ id: Date.now().toString(), url: '' }]);
            setSubmissionSuccess(false);
          }}>Add More Websites</Button>
        </div>
      </SourcePage>
    );
  }

  return (
    <SourcePage
      title="Website"
      description="Import content from websites and web pages."
    >
      <div className="space-y-6">
        {websites.map((site, index) => (
          <div key={site.id} className="flex items-center gap-3">
            <Input
              type="url"
              placeholder="https://example.com"
              value={site.url}
              onChange={(e) => handleChange(site.id, e.target.value)}
              className="flex-grow"
            />
            {websites.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => handleRemoveWebsite(site.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
        ))}
        <div className="flex justify-center">
          <Button onClick={handleAddWebsite} variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Another Website
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
