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
import { Trash2 } from "lucide-react";
import { deletePlant, getPlantById } from "@/actions/plant.action";
import toast from "react-hot-toast";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

interface ModalDeletePlantProps {
  plant: Plant;
}

export function ModalDeletePlant({ plant }: ModalDeletePlantProps) {
  const handleDelete = async () => {
    try {
      await deletePlant(plant.id);
      toast.success(`"${plant.name}" deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer transition-colors" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you really want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the plant <strong>{plant.name}</strong>
            . This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
