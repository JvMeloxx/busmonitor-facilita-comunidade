
import { useState } from 'react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus } from 'lucide-react';
import { Advertisement } from '@/utils/ads/types';
import { AdvertisementForm } from '@/components/ads/AdvertisementForm';
import { AdvertisementList } from '@/components/ads/AdvertisementList';
import { TableNames } from '@/hooks/useSupabaseTypes';

export default function AdvertisementDashboard() {
  const [isAdding, setIsAdding] = useState(false);
  const { useData } = useSupabaseData();
  const { data, isLoading } = useData<'advertisements'>('advertisements');
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  // Type assertion to ensure the data is treated as Advertisement[]
  const advertisements = data as unknown as Advertisement[];

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gerenciar Anúncios</CardTitle>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2" />
            Novo Anúncio
          </Button>
        </CardHeader>
        <CardContent>
          {isAdding ? (
            <AdvertisementForm onCancel={() => setIsAdding(false)} />
          ) : (
            <AdvertisementList advertisements={advertisements || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
