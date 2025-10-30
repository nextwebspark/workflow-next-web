'use client';

import { useState, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { uploadFiles } from '@/lib/actions/files';
import { toast } from 'sonner';

export function FileUploadSection({ projectId }: { projectId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { '*/*': [] },
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    startTransition(async () => {
      setUploading(true);
      // Simulate progress for UI feedback
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          files.forEach((file) => {
            newProgress[file.name] = (newProgress[file.name] || 0) + 10;
          });
          return newProgress;
        });
      }, 100);

      const result = await uploadFiles(projectId, formData);
      clearInterval(progressInterval);

      if (result.success) {
        toast.success(result.message);
        files.forEach((file) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        });
        // Optionally clear files after successful upload
        // setFiles([]);
      } else {
        toast.error(result.message);
        files.forEach((file) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
        });
      }
      setUploading(false);
    });
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition 
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <p className="text-gray-700 text-sm">
          {isDragActive
            ? 'Drop your files here...'
            : 'Drag and drop files here, or click to select files'}
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Files to upload:</h3>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex justify-between items-center border rounded-lg p-3 bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <div className="w-32">
                  <Progress value={uploadProgress[file.name] || 0} />
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button onClick={handleUpload} disabled={uploading || isPending}>
              {uploading || isPending ? 'Uploading...' : `Upload ${files.length} file(s)`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}