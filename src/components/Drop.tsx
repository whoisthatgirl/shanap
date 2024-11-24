import React from "react";
import { useDropzone } from "react-dropzone";


interface DropProps {
    onDrop: (acceptedFiles: File[]) => void;
    children: React.ReactNode;

}

const DropFile: React.FC<DropProps> = ({ onDrop, children}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "application/pdf": [] },
    maxFiles: 4,
    minSize:4,
    maxSize:15 * 1024 * 1024,
         
            
  });

  return (
    <div
      {...getRootProps({
        className:
          `border-2 border-dashed p-10 m-9 text-center rounded-lg cursor-pointer ` +
          (isDragActive
            ? "border-red-500"
            : "border-gray-100 hover:border-gray-200"),
        onDrop: (event) => event.stopPropagation(),
      })}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default DropFile;