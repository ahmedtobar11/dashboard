import { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';

export default function DragComponent() {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removeImage = useCallback(() => {
    setImage(null);
  }, []);

  return (
    <div className="w-full px-10 mx-auto p-4">
      {!image ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            accept="image/*"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-base font-medium text-gray-700">
                Drop your image here, or{' '}
                <span className="text-blue-500">browse</span>
              </p>
              <p className="text-sm text-gray-500">
                Support for JPG, PNG files
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img
            src={image}
            alt="Uploaded preview"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}
