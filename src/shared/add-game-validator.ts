import { z } from "zod";


export const addGameValidator = z.object({
    name: z.string(),
    yearPublished: z.string().nullish(),
    minPlayers: z.number().int().nullish(),
    maxPlayers: z.number().int().nullish(),
    minPlaytime: z.number().int().nullish(),
    maxPlaytime: z.number().int().nullish(),
    description: z.string().nullish(),
    imageUrl: z.string().nullish()
})

export type AddGameType = z.infer<typeof addGameValidator>;