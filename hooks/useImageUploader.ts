import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UseImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

export function useImageUploader({ onFilesSelected }: UseImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
  };
}
