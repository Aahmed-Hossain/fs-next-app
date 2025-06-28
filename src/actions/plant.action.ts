/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
"use server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma";

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

export async function getPlantById(id: string) {
    return await prisma.plants.findUnique({
        where: { id: parseInt(id, 10) },
    })
}

export async function createPlant(data: Prisma.PlantsCreateInput) {
    console.log(data);
    try {
        const currentUserId = await getUserId()
        if (!currentUserId) return;

        const newPlant = await prisma.plants.create({
            data: { ...data, userId: currentUserId }
        })
        revalidatePath('/plants');
        return newPlant;

    } catch (error) {
        console.error('Error in creating plant', error);
        throw error;
    }
}

export async function editPlant(id: number, data: Prisma.PlantsUpdateInput) {
    try {
        const currentUserId = await getUserId()
        if (!currentUserId) return;

        const updatedPlant = await prisma.plants.update({
            where: { id },
            data: { ...data, userId: currentUserId }
        })
        revalidatePath('/plants');
        return updatedPlant;

    } catch (error) {
        console.error('Error in creating plant', error);
        throw error;
    }
}

export async function deletePlant(id: number) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) return;

        const deleted = await prisma.plants.delete({
            where: { id },
        });

        revalidatePath("/plants");
        return deleted;
    } catch (error) {
        console.error("Error deleting plant", error);
        throw error;
    }
}
