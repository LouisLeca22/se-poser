import * as z from "zod"
import { ZodSchema } from "zod"

export const profileSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    username: z.string().min(2, { message: "Le nom d'utilisateur doit contenir au moins 2 caractères" })
})

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
    console.log("✅ Données reçues par le schema :", data);  // Ajoute ceci

    const result = schema.safeParse(data)
    if (!result.success) {
        const errors = result.error.errors.map((error) => error.message)
        throw new Error(errors.join(","))
    }

    return result.data
}

export const imageSchema = z.object({
    image: validateFile()
})

function validateFile() {
    const maxUploadSize = 1024 * 1024
    const acceptedFileTypes = ["image/"]
    return z.instanceof(File)
        .refine((file) => {
            return !file || file.size <= maxUploadSize
        }, "La taille du fichier doit être inférieure à 1 Mo")
        .refine((file) => {
            return !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        }, "Le fichier doit être une image")
}



export const propertySchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Le nom doit contenir au moins 2 caractères.',
        })
        .max(100, {
            message: 'Le nom doit contenir au maximum 100 caractères.',
        }),
    tagline: z
        .string()
        .min(2, {
            message: "La phrase d'accroche doit contenir au moins 2 caractères",
        })
        .max(100, {
            message: "La phrase d'accroche doit contenir au maximum 100 caractères",
        }),
    price: z.coerce.number().int().min(0, {
        message: 'Le prix doit être un nombre positif ',
    }),
    category: z.string(),
    description: z.string().refine(
        (description) => {
            const wordCount = description.split(' ').length;
            return wordCount >= 10 && wordCount <= 1000;
        },
        {
            message: 'La description doit contenir entre 10 et 1000 mots',
        }
    ),
    address: z.string().min(5, "L'adresse doit contenir au minimum 5 caractères"),
    guests: z.coerce.number().int().min(0, {
        message: 'guest amount must be a positive number.',
    }),
    bedrooms: z.coerce.number().int().min(0, {
        message: 'bedrooms amount must be a positive number.',
    }),
    beds: z.coerce.number().int().min(0, {
        message: 'beds amount must be a positive number.',
    }),
    baths: z.coerce.number().int().min(0, {
        message: 'bahts amount must be a positive number.',
    }),
    amenities: z.string(),
});

export const createReviewSchema = z.object({
    propertyId: z.string(),
    rating: z.coerce.number().int().min(1).max(5),
    comment: z.string().min(10, { message: "L'avis doit contenir au minimum 10 caractères" }).max(10000)
})