'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Globe, FileText, Upload, Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TrainBotPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('qa');

  // Q&A Form State
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Website Form State
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Document Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleQASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      toast.error('Please provide both question and answer');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/trainbot/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Q&A pair added successfully!');
        setQuestion('');
        setAnswer('');
      } else {
        toast.error(result.error || 'Failed to add Q&A pair');
      }
    } catch (error) {
      toast.error('Failed to add Q&A pair');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebsiteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) {
      toast.error('Please provide a website URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/trainbot/website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: websiteUrl }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Website content processed successfully!');
        setWebsiteUrl('');
      } else {
        toast.error(result.error || 'Failed to process website');
      }
    } catch (error) {
      toast.error('Failed to process website');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a document to upload');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('document', selectedFile);

      const response = await fetch('/api/trainbot/document', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Document processed successfully!');
        setSelectedFile(null);
        // Reset file input
        
        const fileInput = document.getElementById('document-upload') as HTMLInputElement;
        
        if (fileInput) fileInput.value = '';
        
      } else {
        toast.error(result.error || 'Failed to process document');
      }
    } catch (error) {
      toast.error('Failed to process document');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Train Bot</h1>
        <p className="text-gray-600 mt-1">
          Add knowledge to your AI bot by uploading Q&A pairs, website content, and documents.
        </p>
      </div>

      {/* Main Content */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Knowledge Base Training
          </CardTitle>
          <CardDescription className="text-gray-600">
            Choose a method to add knowledge to your bot's training data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="qa" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Q&A
              </TabsTrigger>
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            {/* Q&A Tab */}
            <TabsContent value="qa" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Add Q&A Pair
                  </CardTitle>
                  <CardDescription>
                    Create question and answer pairs to train your bot on specific topics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleQASubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="question">Question</Label>
                      <Input
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the question..."
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="answer">Answer</Label>
                      <Textarea
                        id="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter the answer..."
                        rows={4}
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Add Q&A Pair
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Website Tab */}
            <TabsContent value="website" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Process Website
                  </CardTitle>
                  <CardDescription>
                    Extract and process content from a website URL to train your bot.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleWebsiteSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website-url">Website URL</Label>
                      <Input
                        id="website-url"
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://example.com"
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Process Website
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Upload Document
                  </CardTitle>
                  <CardDescription>
                    Upload PDF or DOCX files to extract and process their content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDocumentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="document-upload">Document</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="document-upload"
                          type="file"
                          accept=".pdf,.docx"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          disabled={isLoading}
                          className="flex-1"
                        />
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">
                        Supported formats: PDF, DOCX (Max size: 10MB)
                      </p>
                    </div>
                    {selectedFile && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">
                          Selected: {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                    <Button type="submit" disabled={isLoading || !selectedFile} className="w-full">
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Upload Document
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}