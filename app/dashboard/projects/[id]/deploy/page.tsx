'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, MessageSquare, Globe, Bot, Instagram, MessageCircle, Settings, Workflow } from 'lucide-react';

const integrations = [
  { name: 'Zapier', icon: Zap, description: 'Connect with thousands of apps.' },
  { name: 'n8n', icon: Workflow, description: 'Connect with n8n workflows.' },
  { name: 'Slack', icon: MessageSquare, description: 'Integrate with your team\'s workspace.' },
  { name: 'WordPress', icon: Globe, description: 'Connect your WordPress site.' },
  { name: 'WhatsApp', icon: MessageCircle, description: 'Engage with users on WhatsApp.' },
  { name: 'Messenger', icon: Bot, description: 'Connect with Facebook Messenger.' },
  { name: 'Instagram', icon: Instagram, description: 'Integrate with Instagram DMs.' },
  { name: 'Zendesk', icon: MessageSquare, description: 'Sync with your Zendesk support.' },
  { name: 'API', icon: Settings, description: 'Use our API for custom integrations.' },
];

export default function DeployPage() {
  const params = useParams();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations & Deploy</h1>
        <p className="text-gray-600 mt-1">
          Connect your project to other services and deploy your chat widget.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Chat Widget</CardTitle>
          <CardDescription className="text-gray-600">Embed a chat widget on your website.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="floating-chat" />
            <Label htmlFor="floating-chat">Enable Floating Chat Window</Label>
          </div>
          <Link href={`/dashboard/projects/${params.id}/deploy/manage`}>
            <Button>Manage</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrations.map((service) => (
          <Card key={service.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <service.icon className="h-10 w-10 text-gray-600" />
                <div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button variant="outline" className="w-full">Setup</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}