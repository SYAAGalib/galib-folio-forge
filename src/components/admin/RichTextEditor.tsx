import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Write your content here..." 
}: RichTextEditorProps) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block',
    'link', 'image',
    'color', 'background'
  ];

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="rich-text-editor">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="bg-background rounded-md"
        />
      </div>
      <style>{`
        .rich-text-editor .ql-container {
          min-height: 200px;
          font-size: 14px;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background: hsl(var(--muted));
        }
        .rich-text-editor .ql-editor {
          min-height: 150px;
        }
        .rich-text-editor .ql-toolbar.ql-snow,
        .rich-text-editor .ql-container.ql-snow {
          border-color: hsl(var(--border));
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }
        .dark .rich-text-editor .ql-stroke {
          stroke: hsl(var(--foreground));
        }
        .dark .rich-text-editor .ql-fill {
          fill: hsl(var(--foreground));
        }
        .dark .rich-text-editor .ql-picker-label {
          color: hsl(var(--foreground));
        }
        .dark .rich-text-editor .ql-picker-options {
          background: hsl(var(--popover));
          border-color: hsl(var(--border));
        }
        .dark .rich-text-editor .ql-picker-item {
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
