import { useState } from 'react';
import { Upload, FileText, X, Edit } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface JobDescriptionInputProps {
  onTextChange: (text: string) => void;
  fileName?: string;
  textContent?: string;
  onClear?: () => void;
}

export function JobDescriptionInput({ 
  onTextChange, 
  fileName, 
  textContent,
  onClear 
}: JobDescriptionInputProps) {
  const [activeTab, setActiveTab] = useState<string>('type');
  const [typedText, setTypedText] = useState<string>(textContent || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      onTextChange(text);
      setTypedText(text);
    };
    reader.readAsText(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTypedText(text);
    onTextChange(text);
  };

  const hasContent = fileName || typedText.trim().length > 0;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-2">Job Description</h3>
      <p className="text-sm text-gray-600 mb-4">Upload a file or type/paste the job description</p>
      
      {hasContent && (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            {fileName ? (
              <>
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">{fileName}</span>
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">
                  Job description added ({typedText.split(/\s+/).length} words)
                </span>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTypedText('');
              onClear?.();
            }}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="type">
            <Edit className="h-4 w-4 mr-2" />
            Type/Paste
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="type" className="mt-4">
          <Textarea
            placeholder="Paste or type the job description here...&#10;&#10;Example:&#10;We are looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and AWS. The ideal candidate should have strong problem-solving skills and experience with agile methodologies..."
            value={typedText}
            onChange={handleTextChange}
            className="min-h-[200px] resize-y"
          />
          <p className="text-xs text-gray-500 mt-2">
            {typedText.split(/\s+/).filter(w => w.length > 0).length} words
          </p>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">TXT, PDF, DOC, DOCX</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
