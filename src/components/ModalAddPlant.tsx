import { Sprout } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ComboBox } from "./ComboBox";
import { useState } from "react";
import { createPlant } from "@/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

export function ModalAddPlant() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 1,
    stock: 1,
    userId: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Adding Plant");
    try {
      const newPlant = await createPlant(formData);
      console.log("plant created:", newPlant);
      toast.success("Plant created succesfully");
    } catch (error) {
      console.error("error on creating ", error);
      toast.error("Error on Creating plant");
    }
  };

  const handleChange = (field: string, value: string | number) => {
    if (field === "price" || field === "stock") {
      value = Number(value); // convert string to number
    }
    setFormData({ ...formData, [field]: value });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="border px-3 py-1 rounded-lg flex items-center gap-2">
          <Sprout className="h-4 w-4 text-green-600" />
          <span>Add Plant</span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a new plant?</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form to add new plant
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-7/12">
              <Label htmlFor="name" className="mb-2">
                Name:
              </Label>
              <Input
                id="name"
                placeholder="Write plant name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="w-full md:w-5/12 flex flex-col">
              <Label htmlFor="category" className="mb-2">
                Category:
              </Label>
              <div className="w-full">
                <ComboBox
                  value={formData.category}
                  onChange={(val) => handleChange("category", val)}
                />
              </div>
            </div>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="description" className="mb-2">
              Description:
            </Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Write plant descripion"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="mb-3 flex flex-col md:flex-row gap-3">
            <div className="w-full mb-2">
              <Label htmlFor="price" className="mb-2">
                Price:
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>

            <div className="w-full mb-3">
              <Label htmlFor="stock" className="mb-2">
                Stock:
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
              />
            </div>
          </div>

          <div>
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Add</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
