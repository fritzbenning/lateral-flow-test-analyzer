import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function useImageUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return {
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    onDrop,
  };
}
