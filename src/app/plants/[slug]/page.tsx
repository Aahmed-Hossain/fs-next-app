import React from "react";
import PlantCard from "../PlantCard";
import { getPlantById } from "@/actions/plant.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

export default async function page({ params }: { params: { slug: string } }) {
  const [id] = params.slug.split("-");
  const plant = await getPlantById(id);
  const user = await stackServerApp.getUser();

  if (!user) {
    return <SignIn />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      <PlantCard plant={plant} />
    </div>
  );
}
