import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image, Link, X } from 'lucide-react';

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

const ImageUploadField = ({ 
  label = "Image", 
  value, 
  onChange, 
  placeholder = "Enter image URL or paste image link" 
}: ImageUploadFieldProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleClear = () => {
    onChange('');
    setImageError(false);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setImageError(false);
            }}
            className="pl-9"
          />
        </div>
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {value && showPreview && !imageError && (
        <div className="relative mt-2 rounded-lg overflow-hidden border bg-muted/50 p-2">
          <img
            src={value}
            alt="Preview"
            className="max-h-32 w-auto rounded object-cover mx-auto"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      
      {value && imageError && (
        <div className="mt-2 p-4 rounded-lg border border-dashed border-destructive/50 bg-destructive/10 text-center">
          <Image className="w-8 h-8 mx-auto text-destructive/50 mb-2" />
          <p className="text-sm text-destructive">Failed to load image preview</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
