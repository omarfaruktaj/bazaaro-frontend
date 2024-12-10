import { useState } from "react";

import axios from "axios";
import { Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import envConfig from "@/config/env-config";

interface UploadImageProps {
  disabled?: boolean;
  onChange: (value: string | null) => void;
  onRemove: () => void;
  value: string | null;
}

export default function LogoInput({
  disabled,
  onChange,
  onRemove,
  value,
}: UploadImageProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setIsUploading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `${envConfig.CLOUDINARY_UPLOAD_PRESET}`);
      formData.append("folder", "gardenia");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${envConfig.CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        const imageUrl = response.data.secure_url;
        onChange(imageUrl);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error('Image upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col">
      {value ? (
        <div className="relative w-44 h-44 rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
          <Button
            type="button"
            onClick={onRemove}
            variant="destructive"
            size="icon"
            disabled={disabled}
            className="absolute top-1 right-1 h-7 w-7 bg-red-500 hover:bg-red-600 text-white z-10"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <img className="object-cover w-full h-full" alt="logo" src={value} />
        </div>
      ) : (
        <label
          htmlFor="file-upload-avatar"
          className={`flex items-center   w-44 h-44 justify-center mt-2 rounded-lg transition-colors border border-dashed border-primary ${
            disabled || isUploading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <div className="flex items-center justify-center flex-col py-3 cursor-pointer">
            <Upload className="text-[2rem]" />
            <p className="text-secondary-foreground text-center">Upload Logo</p>
          </div>
        </label>
      )}
      <input
        id="file-upload-avatar"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={disabled || isUploading}
        className="hidden mt-1"
      />
      {isUploading && <p className="mt-2 text-primary">Uploading...</p>}
    </div>
  );
}
