'use client';

import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { SourcePage } from '@/components/source/source-page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { connectService, disconnectService, triggerWorkflow } from '@/lib/actions/integrations';
import { HardDrive, Book, Database, FileUp } from 'lucide-react';
import { toast } from 'sonner';

type ServiceName = 'Google Drive' | 'Notion' | 'Supabase';
type PendingAction = { service: ServiceName; type: 'connect' | 'disconnect' | 'trigger' } | null;

const integrations = [
  { name: 'Google Drive' as ServiceName, icon: HardDrive, description: 'Sync files from your Google Drive.' },
  { name: 'Notion' as ServiceName, icon: Book, description: 'Import pages and databases from Notion.' },
  { name: 'Supabase' as ServiceName, icon: Database, description: 'Connect to your Supabase database tables.' },
];

export default function IntegrationsPage() { 
  const { id: projectId } = useParams<{ id:string }>();
  const [isTransitioning, startTransition] = useTransition(); // isTransitioning indicates if any transition is active
  const [pendingAction, setPendingAction] = useState<PendingAction>(null); // Tracks specific action
  const [connectedServices, setConnectedServices] = useState<Record<ServiceName, boolean>>({
    'Google Drive': false,
    'Notion': false,
    'Supabase': false,
  });

  const handleConnect = (serviceName: ServiceName) => {
    setPendingAction({ service: serviceName, type: 'connect' });
    startTransition(async () => {
      const result = await connectService(projectId, serviceName);
      if (result.success) {
        toast.success(result.message);
        setConnectedServices(prev => ({ ...prev, [serviceName]: true }));
      } else {
        toast.error(result.message);
      }
      setPendingAction(null); // Clear pending action after completion
    });
  };

  const handleDisconnect = (serviceName: ServiceName) => {
    setPendingAction({ service: serviceName, type: 'disconnect' });
    startTransition(async () => {
      const result = await disconnectService(projectId, serviceName);
      if (result.success) {
        toast.info(result.message);
        setConnectedServices(prev => ({ ...prev, [serviceName]: false }));
      } else {
        toast.error(result.message);
      }
      setPendingAction(null); // Clear pending action after completion
    });
  };

  const handleSimulateUpload = (serviceName: ServiceName) => {
    setPendingAction({ service: serviceName, type: 'trigger' });
    startTransition(async () => {
      const fileName = `test-file-${Date.now()}.pdf`;
      const fileUrl = `https://${serviceName.toLowerCase().replace(' ', '')}.com/files/${fileName}`;
      toast.loading(`Simulating upload from ${serviceName}...`);
      const result = await triggerWorkflow(projectId, serviceName, fileName, fileUrl);
      toast.dismiss();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      setPendingAction(null); // Clear pending action after completion
    });
  };

  return (
    <SourcePage
      title="Integrations"
      description="Connect external data sources to your project."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((service) => {
          const isConnected = connectedServices[service.name];
          const isConnecting = pendingAction?.service === service.name && pendingAction.type === 'connect';
          const isDisconnecting = pendingAction?.service === service.name && pendingAction.type === 'disconnect';
          const isTriggering = pendingAction?.service === service.name && pendingAction.type === 'trigger';

          return (
            <Card key={service.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <service.icon className="h-8 w-8 text-gray-600" />
                  <div>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-green-600 font-medium text-sm">
                      ✅ Connected
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleDisconnect(service.name)}
                        disabled={isDisconnecting || isTransitioning}
                      >
                        {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full flex items-center gap-2"
                        onClick={() => handleSimulateUpload(service.name)}
                        disabled={isTriggering || isTransitioning}
                        title="Simulate a file upload to trigger the background workflow"
                      >
                        <FileUp className="h-4 w-4" />
                        {isTriggering ? 'Triggering...' : 'Trigger'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleConnect(service.name)}
                    disabled={isConnecting || isTransitioning}
                  >
                    {isConnecting ? 'Connecting...' : 'Connect'}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SourcePage>
  );
}
