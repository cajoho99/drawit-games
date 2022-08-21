import { createRouter } from "./context";
import { z } from "zod";
import { Game } from "@prisma/client";

export const gameRouter = createRouter()
  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.game.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.game.findMany();
    },
  })
  .mutation("addWithBggId", {
    input: z.object({
      bggId: z.number(),
    }),
    async resolve({ ctx, input }) {
      const things = await ctx.bggClient.thing.query({ id: input.bggId });

      if (things.length == 0 || !things[0]) {
        throw Error("A boardgame with that id was not found");
      } else if (things.length > 1) {
        throw Error("More than one boardgame with that id was found");
      }

      const thing = things[0];
      const game: Game = await ctx.prisma.game.create({
        data: {
          name: thing.name,
          yearPublished: thing.yearpublished + "",
          minPlayers: thing.minplayers,
          maxPlayers: thing.maxplayers,
          minPlaytime: thing.minplaytime,
          maxPlaytime: thing.maxplaytime,
          description: thing.description,
          imageUrl: thing.image,
          bggId: thing.id + "",
        },
      });

      return { success: true, game: game };
    },
  })
  .mutation("addWithData", {
    input: z.object({
      name: z.string(),
      yearPublished: z.string().nullish(),
      minPlayers: z.number().int().positive().nullish(),
      maxPlayers: z.number().int().positive().nullish(),
      minPlaytime: z.number().int().positive().nullish(),
      maxPlaytime: z.number().int().positive().nullish(),
      description: z.string().nullish(),
      imageUrl: z.string().nullish(),
      bggId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const game: Game = await ctx.prisma.game.create({
        data: {
          name: input.name,
          yearPublished: input.yearPublished,
          minPlayers: input.minPlayers,
          maxPlayers: input.maxPlayers,
          minPlaytime: input.minPlaytime,
          maxPlaytime: input.maxPlaytime,
          description: input.description,
          imageUrl: input.imageUrl,
          bggId: input.bggId,
        },
      });

      return { success: true, game: game };
    },
  });
