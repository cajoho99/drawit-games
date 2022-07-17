import { createRouter } from "./context";
import { z } from "zod";
import { Game } from "@prisma/client";

export const gameRouter = createRouter()
  .query("get", {
    input: z
      .object({
        id: z.string(),
      }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.game.findFirst({
        where: {
            id: input.id
        }
      })
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.game.findMany();
    },
  })
  .mutation("add", {
    input: z.object({
        name: z.string(),
        yearPublished: z.string().nullish(),
        minPlayers: z.number().int().nullish(),
        maxPlayers: z.number().int().nullish(),
        minPlaytime: z.number().int().nullish(),
        maxPlaytime: z.number().int().nullish(),
        description: z.string().nullish(),
        imageUrl: z.string().nullish()
    }),
    async resolve({ctx, input}) {
        const game: Game = await ctx.prisma.game.create({
            data: {
                name: input.name ,
                yearPublished: input.yearPublished ,
                minPlayers: input.minPlayers ,
                maxPlayers: input.maxPlayers ,
                minPlaytime: input.minPlaytime ,
                maxPlaytime: input.maxPlaytime ,
                description: input.description ,
                imageUrl: input.imageUrl 
            },
          });

        return { success: true, game: game };
    }
  });
