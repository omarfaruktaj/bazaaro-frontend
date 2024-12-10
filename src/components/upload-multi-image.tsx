import envConfig from "@/config/env-config";
import axios from "axios";
import { Image, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setIsUploading(true);
      const files = Array.from(event.target.files);
      const uploadedImages: string[] = [];

      try {
        for (const file of files) {
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
        }
        onChange(uploadedImages);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Handle error (optional)
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center flex-wrap gap-4">
        {value.length > 0 &&
          value.map((url) => (
            <div
              key={url}
              className="relative w-24 h-24 sm:w-24 sm:h-24 rounded-lg overflow-hidden border  hover:shadow-md transition-shadow transform hover:scale-105"
            >
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                disabled={disabled}
                className="absolute top-1 right-1 h-7 w-7 bg-red-500 hover:bg-red-600 text-white z-10"
              >
                <Trash className="h-4 w-4" />
              </Button>
              <img
                className="object-cover w-full h-full"
                alt="Uploaded"
                src={url}
              />
            </div>
          ))}
      </div>

      <label
        htmlFor="file-upload"
        className={`flex items-center justify-center mt-1 px-6 py-3 rounded-lg cursor-pointer border border-input
    ${
      disabled || isUploading
        ? "cursor-not-allowed opacity-60 "
        : "border-primary bg-primary-50 hover:bg-primary-100 active:bg-primary-200 transition-all duration-200"
    }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Image className="text-3xl text-primary" />
          <p className="text-primary font-semibold">Browse to upload images</p>
        </div>
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {isUploading && <p className="mt-2 text-primary">Uploading...</p>}
    </div>
  );
}
