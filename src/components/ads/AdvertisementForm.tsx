
import { useState } from 'react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdvertisementFormProps {
  onCancel: () => void;
  advertisement?: any;
}

export function AdvertisementForm({ onCancel, advertisement }: AdvertisementFormProps) {
  const { insert } = useSupabaseData();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    type: advertisement?.type || 'image',
    url: advertisement?.url || '',
    link_url: advertisement?.link_url || '',
    duration: advertisement?.duration || 5,
    full_screen: advertisement?.full_screen || false,
    cta_text: advertisement?.cta_text || '',
    active: advertisement?.active || true,
    priority: advertisement?.priority || 0
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('ad-media')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('ad-media')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, url: publicUrl }));
      toast({
        title: "Sucesso",
        description: "Arquivo enviado com sucesso"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { mutate } = insert('advertisements');
    
    // Call mutate with the form data
    mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Anúncio criado com sucesso"
        });
        onCancel();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Tipo</Label>
        <select 
          className="w-full p-2 border rounded"
          value={formData.type}
          onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="image">Imagem</option>
          <option value="video">Vídeo</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Mídia</Label>
        <Input 
          type="file" 
          accept={formData.type === 'image' ? 'image/*' : 'video/*'}
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </div>

      <div className="space-y-2">
        <Label>Link (opcional)</Label>
        <Input 
          type="url" 
          value={formData.link_url}
          onChange={e => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Duração (segundos)</Label>
        <Input 
          type="number" 
          value={formData.duration}
          onChange={e => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
        />
      </div>

      <div className="space-y-2">
        <Label>Texto do CTA (opcional)</Label>
        <Input 
          value={formData.cta_text}
          onChange={e => setFormData(prev => ({ ...prev, cta_text: e.target.value }))}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch 
          checked={formData.full_screen}
          onCheckedChange={checked => setFormData(prev => ({ ...prev, full_screen: checked }))}
        />
        <Label>Tela cheia</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch 
          checked={formData.active}
          onCheckedChange={checked => setFormData(prev => ({ ...prev, active: checked }))}
        />
        <Label>Ativo</Label>
      </div>

      <div className="space-y-2">
        <Label>Prioridade</Label>
        <Input 
          type="number" 
          value={formData.priority}
          onChange={e => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isUploading || !formData.url}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
