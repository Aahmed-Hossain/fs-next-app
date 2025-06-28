"use client";
import { getPlantById } from "@/actions/plant.action";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Plant = Awaited<ReturnType<typeof getPlantById>>;
interface PlantProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantProps) {
  return (
    <div className="flex gap-4 border rounded p-4 shadow hover:shadow-md transition">
      <div className="w-1/2">
        {plant?.imageUrl && (
          <Image
            src={
              plant.imageUrl?.startsWith("http")
                ? plant.imageUrl
                : "/default.jpg"
            }
            alt={plant?.name}
            width={200}
            height={150}
            className="rounded"
          />
        )}
      </div>
      <div className="w-1/2">
        <h2 className="font-extrabold text-5xl">{plant?.name}</h2>
        <Badge
          variant="secondary"
          className="shrink-0 text-xs rounded-full my-2 bg-green-500 text-white uppercase"
        >
          {plant?.category}
        </Badge>
        <p className="text-sm mt-1">{plant?.description}</p>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">${plant?.price}</p>
            {plant ? (
              <p
                className={`text-sm font-medium ${
                  plant.stock > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-destructive"
                }`}
              >
                {plant.stock > 0 ? `${plant.stock} in stock` : "Out of stock"}
              </p>
            ) : (
              <p className="text-red-500">No plant data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
