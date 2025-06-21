/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
"use server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: String) {
    try {
        const currentUserId = await getUserId()
        const whereClause: any = {
            userId: currentUserId
        }

        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm.trim(),
                mode: 'insensitive'
            }
        }
        const userPlants = await prisma.plants.findMany({
            where: whereClause,
            orderBy: {
                createdAt: 'desc'
            }
        })
        revalidatePath('/')
        return { success: true, userPlants }
    } catch (error) {
        console.error("Error in getPlants:", error);
        return { success: false, error: "Failed to fetch plants", userPlants: [] };
    }
}
