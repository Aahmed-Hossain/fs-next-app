import { stackServerApp } from "@/stack";
import React from "react";
import { SignUp } from "@stackframe/stack";
import TableInventory from "@/components/TableInventory";
import { getPlants } from "@/actions/plant.action";

export default async function page() {
  const user = await stackServerApp.getUser();
  const plantsResult = await getPlants();
  const plants = plantsResult?.success ? plantsResult.userPlants : [];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      {user ? (
        <div>
          <TableInventory plants={plants} />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <SignUp />
        </div>
      )}
    </div>
  );
}
