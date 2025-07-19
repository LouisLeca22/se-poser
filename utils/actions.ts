'use server'

import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from "./schemas"
import db from "./db"
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "./supabase"
import { validateFrenchAddress } from "@/utils/validateFrenchAddress"


const getAuthUser = async () => {
    const user = await currentUser()
    if (!user) throw new Error("Vous devez être connecté pour accéder à cette page")

    if (!user.privateMetadata.hasProfile) redirect("/profile/create")
    return user
}


const renderError = (error: unknown): { message: string } => {
    console.log(error)
    return {
        message: error instanceof Error ? error.message : "Une erreur est survenue"
    }
}

export const createProfileAction = async (prevState: any, formData: FormData) => {
    try {
        const user = await currentUser()
        if (!user) throw new Error("Vous devez être connecté pour créer un profil")
        const rawData = Object.fromEntries(formData)
        const validatedFields = validateWithZodSchema(profileSchema, rawData)

        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? "",
                ...validatedFields,
            }
        })
        await clerkClient.users.updateUserMetadata(user.id, { privateMetadata: { hasProfile: true } })
    } catch (error) {
        renderError(error)
    }

    redirect("/")
}

export const fetchProfileImage = async () => {
    const user = await currentUser()
    if (!user) return null

    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        },
        select: {
            profileImage: true
        }
    })

    return profile?.profileImage
}

export const fetchProfile = async () => {
    const user = await getAuthUser()
    const profile = await db.profile.findUnique({
        where: {
            clerkId: user.id
        }
    })

    if (!profile) redirect("/profile/create")

    return profile
}

export const updateProfileAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();

    try {
        const rawData = Object.fromEntries(formData);
        const validatedFields = validateWithZodSchema(profileSchema, rawData)

        await db.profile.update({
            where: {
                clerkId: user.id,
            },
            data: validatedFields,
        });

        revalidatePath('/profile');
        return { message: 'Profile updated successfully' };
    } catch (error) {
        return renderError(error);
    }
};

export const updateProfileImageAction = async (
    prevState: any,
    formData: FormData,
): Promise<{ message: string }> => {
    const user = await getAuthUser()
    try {
        const image = formData.get("image") as File
        const validatedFields = validateWithZodSchema(imageSchema, { image })
        const fullPath = await uploadImage(validatedFields.image)
        await db.profile.update({
            where: {
                clerkId: user.id
            },
            data: {
                profileImage: fullPath
            }
        })
        revalidatePath("/profile")
        return { message: "Photo de profil mise à jour" }
    } catch (error) {
        return renderError(error)
    }
}


export const createPropertyAction = async (
    prevData: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser()
    try {

        const rawData = Object.fromEntries(formData)

        const file = formData.get("image") as File

        const validatedFields = validateWithZodSchema(propertySchema, rawData)
        const validatedFile = validateWithZodSchema(imageSchema, { image: file })
        const fullPath = await uploadImage(validatedFile.image)
        const validatedAddress = await validateFrenchAddress(validatedFields.address)

        if (!validatedAddress) {
            throw new Error("l'Adresse renseignée n'est pas correcte")
        }

        await db.property.create({
            data: {
                ...validatedFields,
                ...validatedAddress,
                image: fullPath,
                profileId: user.id
            }
        })

    } catch (error) {
        return renderError(error)
    }

    redirect("/")
}

export const fetchProperties = async ({ search = '', category, city }: { search?: string, category?: string, city?: string }) => {
    const properties = await db.property.findMany({
        where: {
            category,
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { tagline: { contains: search, mode: 'insensitive' } },
            ],
            city
        },
        select: {
            id: true,
            name: true,
            image: true,
            tagline: true,
            city: true,
            price: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return properties
}