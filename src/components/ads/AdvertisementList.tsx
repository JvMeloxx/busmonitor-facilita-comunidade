
import { Advertisement } from '@/utils/ads/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface AdvertisementListProps {
  advertisements: Advertisement[];
}

export function AdvertisementList({ advertisements }: AdvertisementListProps) {
  const { update } = useSupabaseData();
  const { mutate: updateAd } = update('advertisements');

  const handleActiveToggle = (id: string, currentActive: boolean) => {
    updateAd({ id, active: !currentActive });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Duração</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Ativo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advertisements.map((ad) => (
          <TableRow key={ad.id}>
            <TableCell>{ad.type}</TableCell>
            <TableCell>{ad.link_url || '-'}</TableCell>
            <TableCell>{ad.duration}s</TableCell>
            <TableCell>{ad.priority}</TableCell>
            <TableCell>
              <Switch 
                checked={ad.active} 
                onCheckedChange={() => handleActiveToggle(ad.id, ad.active)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
