import { SquarePen } from "lucide-react";
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
import { editPlant, getPlantById } from "@/actions/plant.action";
import toast from "react-hot-toast";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;
interface ModalEditPlantProps {
  plant: Plant;
}

export function ModalEditPlant({ plant }: ModalEditPlantProps) {
  const [formData, setFormData] = useState({
    name: plant?.name.trim(),
    description: (plant?.description || "").trim(),
    category: plant?.category.trim(),
    price: plant?.price,
    stock: plant?.stock,
    userId: plant?.userId.trim(),
    imageUrl: (plant?.imageUrl || "").trim(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!formData.price || isNaN(formData.price)) {
      toast.error("Valid price is required");
      return;
    }
    if (!formData.stock || isNaN(formData.stock)) {
      toast.error("Valid stock is required");
      return;
    }

    try {
      const updatedPlant = await editPlant(plant.id, formData);
      console.log("plant updated:", updatedPlant);
      toast.success("Plant updated succesfully");
    } catch (error) {
      console.error("error on editing ", error);
      toast.error("Error on editing plant");
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
        <SquarePen className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit the plant?</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form to edit the plant.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-7/12">
              <Label htmlFor="name" className="mb-2">
                Name: <span className="text-red-500">*</span>
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
                Category: <span className="text-red-500">*</span>
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
            <Label htmlFor="description" className="mb-2 required">
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

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full mb-2">
              <Label htmlFor="price" className="mb-2">
                Price: <span className="text-red-500">*</span>
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
                Stock: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Save</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
