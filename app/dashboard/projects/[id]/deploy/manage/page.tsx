'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '@/components/ui/input';
import { Copy, Shield, Code, Smile, Send, ExternalLink, Bot, GripHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { ChatWidget } from '../../playground/components/ChatWidget';

const serverJwtCode = `const jwt = require("jsonwebtoken");

const payload = {
  userId: "USER_ID", // Unique identifier for the user
  // You can add any other user data here
};

const secret = "YOUR_SECRET_KEY"; // Keep this secret

const token = jwt.sign(payload, secret);`;

const clientJwtCode = `<script>
  window.nexwebConfig = {
    chatbotId: "YOUR_CHATBOT_ID",
    jwt: "THE_JWT_YOU_GENERATED_ON_THE_SERVER"
  }
</script>`;

function CodeBlock({ code, onCopy }: { code: string; onCopy: (code: string) => void }) {
  return (
    <div className="relative bg-gray-900 text-white rounded-md p-4 font-mono text-sm">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 text-gray-400 hover:bg-gray-700 hover:text-white"
        onClick={() => onCopy(code)}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <pre><code>{code}</code></pre>
    </div>
  );
}

export default function ChatWidgetManagePage() {
  const params = useParams();
  const projectId = params.id as string;
  const [embedType, setEmbedType] = useState('widget');

  // TODO: Move this URL to your .env.local file
  // e.g., NEXT_PUBLIC_CHAT_WIDGET_SRC=http://localhost:3000/embed.min.js
  const chatWidgetSrc = process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC || 'http://localhost:3000/embed.min.js';

const jsEmbedSnippet = `<script>
  window.nextwebConfig = {
    chatbotId: "${projectId}",
  }
</script>
<script
  src="${chatWidgetSrc}"
  chatbotId="${projectId}"
  id="${projectId}"
  defer>
</script>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Chat Widget</h1>
        <p className="text-gray-600 mt-1">Configure and embed your chat widget on any website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Chat Widget Options */}
          <Card>
            <CardHeader>
              <CardTitle>Chat Widget Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor="ai-styling">Allow AI to style your content</Label>
                <Switch id="ai-styling" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor="restrict-domains">Restrict embedding to specified domains</Label>
                <Switch id="restrict-domains" />
              </div>
            </CardContent>
          </Card>

          {/* Embed Type */}
          <Card>
            <CardHeader>
              <CardTitle>Embed Type</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={embedType} onValueChange={setEmbedType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="widget" id="r1" />
                  <Label htmlFor="r1">Chat widget</Label>
                </div>
                <p className="text-sm text-gray-500 pl-6">A floating chat bubble on your site. <a href="#" className="text-blue-600 hover:underline">Docs <ExternalLink className="inline h-3 w-3"/></a></p>
                <div className="flex items-center space-x-2 pt-2">
                  <RadioGroupItem value="iframe" id="r2" />
                  <Label htmlFor="r2">Iframe</Label>
                </div>
                <p className="text-sm text-gray-500 pl-6">Embed in an iframe. Note: some features are limited.</p>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Widget Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Allowed Domain</Label>
                <Input disabled value="example.com" />
              </div>
              <div>
                <Label>Embed Snippet</Label>
                <CodeBlock code={jsEmbedSnippet} onCopy={handleCopy} />
              </div>
            </CardContent>
          </Card>

          {/* Identity Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-blue-600" /> Identity Verification</CardTitle>
              <CardDescription>
                Secure your chatbot by verifying user identity with JWT.
                <a href="#" className="text-blue-600 hover:underline ml-2">Read Docs <ExternalLink className="inline h-3 w-3"/></a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Secret Key</Label>
                <div className="relative">
                  <Input type="password" value="********************" readOnly />
                  <Button variant="ghost" size="icon" className="absolute top-1/2 right-1.5 -translate-y-1/2 h-7 w-7" onClick={() => handleCopy("YOUR_SECRET_KEY_HERE")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-yellow-600 mt-1">Keep your secret key safe and never expose it on the client-side!</p>
              </div>
              <div>
                <Label>Server-side JWT Generation (Node.js)</Label>
                <CodeBlock code={serverJwtCode} onCopy={handleCopy} />
              </div>
              <div>
                <Label>Client-side Configuration</Label>
                <CodeBlock code={clientJwtCode} onCopy={handleCopy} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface Preview */}
        <div className="lg:col-span-1">
      <ChatWidget projectId={projectId} />
        </div>
      </div>
    </div>
  );
}