import Image from "next/image";
import React from "react";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  endpoint: "postImage";
  onChange: (url: string) => void;
  value: string;
}

export default function ImageUpload({
  endpoint,
  onChange,
  value,
}: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        <Image
          src={value}
          alt="uploading image"
          fill
          className="rounded-lg object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 rounded-full shadow-xl"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <div className="w-24 flex items-center">
      <UploadDropzone<OurFileRouter, "postImage">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast.success("Image uploaded");
          if (res && res[0]?.ufsUrl) {
            onChange(res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
