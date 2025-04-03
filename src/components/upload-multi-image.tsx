"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import envConfig from "@/config/env-config";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Image, ImagePlus, Trash, Upload } from "lucide-react";
import { useState } from "react";

interface UploadImageProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function UploadMultiImage({
  disabled,
  onChange,
  onRemove,
  value,
}: UploadImageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      await uploadFiles(Array.from(event.target.files));
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files) {
      await uploadFiles(Array.from(event.dataTransfer.files));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    const uploadedImages: string[] = [];

    try {
      const totalFiles = files.length;
      let completedFiles = 0;

      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          setError(
            `File "${file.name}" is not an image. Only image files are allowed.`
          );
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          `${envConfig.CLOUDINARY_UPLOAD_PRESET}`
        );
        formData.append("folder", "E-commerce");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${envConfig.CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        const imageUrl = response.data.secure_url;
        uploadedImages.push(imageUrl);

        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
      }

      onChange(uploadedImages);
    } catch (error) {
      setError("An error occurred while uploading images. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {value.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              <AnimatePresence>
                {value.map((url, index) => (
                  <motion.div
                    key={url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
                      {index === 0 && (
                        <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                          Main
                        </div>
                      )}
                      <Button
                        type="button"
                        onClick={() => onRemove(url)}
                        variant="destructive"
                        size="icon"
                        disabled={disabled}
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <img
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        alt="Product"
                        src={url || "/placeholder.svg"}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-center">
              <label
                htmlFor="file-upload"
                className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer border ${
                  disabled || isUploading
                    ? "cursor-not-allowed opacity-60 border-gray-200 bg-gray-100"
                    : "border-primary bg-primary/5 hover:bg-primary/10 active:bg-primary/20 transition-all duration-200"
                }`}
              >
                <ImagePlus className="h-4 w-4 text-primary mr-2" />
                <span className="text-primary font-medium">
                  Add More Images
                </span>
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Upload Product Images
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4 max-w-md">
              Drag and drop image files here, or click to browse
            </p>
            <Button
              type="button"
              disabled={disabled || isUploading}
              className="flex items-center"
              variant="outline"
              asChild
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                <Image className="h-4 w-4 mr-2" />
                Browse Files
              </label>
            </Button>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center text-primary">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {value.length > 0 && (
        <p className="text-sm text-gray-500">
          {value.length} {value.length === 1 ? "image" : "images"} uploaded.
          First image will be used as the main product image.
        </p>
      )}
    </div>
  );
}
