import { useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image, Link, X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Compress and convert image to WebP on the client side
 */
const compressImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP with quality setting
        const webpDataUrl = canvas.toDataURL('image/webp', quality / 100);
        resolve(webpDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Convert data URL to Blob
 */
const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/webp';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const ImageUploadField = ({ 
  label = "Image", 
  value, 
  onChange, 
  placeholder = "Enter image URL or upload a file",
  quality = 80,
  maxWidth = 1920,
  maxHeight = 1920
}: ImageUploadFieldProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    setImageError(false);
  };

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    try {
      // Compress and convert to WebP client-side
      setUploadProgress(30);
      const compressedDataUrl = await compressImage(file, maxWidth, maxHeight, quality);
      
      setUploadProgress(50);
      
      // Convert to blob for upload
      const blob = dataURLtoBlob(compressedDataUrl);
      
      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
      const webpFileName = `uploads/${cleanName}_${timestamp}_${randomId}.webp`;

      setUploadProgress(70);

      // Upload directly to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(webpFileName, blob, {
          contentType: 'image/webp',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      setUploadProgress(90);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(webpFileName);

      setUploadProgress(100);
      onChange(urlData.publicUrl);
      setImageError(false);
      
      // Calculate compression ratio
      const originalSize = file.size;
      const compressedSize = blob.size;
      const savedPercent = Math.round((1 - compressedSize / originalSize) * 100);
      
      toast.success(`Image uploaded! Compressed by ${savedPercent}%`);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onChange, quality, maxWidth, maxHeight]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      {/* File upload area */}
      <div
        className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="space-y-2">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Compressing & uploading... {uploadProgress}%
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drop an image here or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Auto-converts to WebP & compresses
            </p>
          </div>
        )}
      </div>

      {/* URL input */}
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
            disabled={uploading}
          />
        </div>
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleClear}
            disabled={uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Preview */}
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
