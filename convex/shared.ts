/**
 * File shared between client & server.
 * Do not import any client-specific or server-specific code
 */

import { z } from "zod";
import { zId } from "./lib/zodUtils";

export const ClientGameStateZ = z.object({
  gameCode: z.string(),
  hosting: z.boolean(),
  players: z.array(
    z.object({
      me: z.boolean(),
      name: z.string(),
      pictureUrl: z.string(),
      submitted: z.boolean(),
      score: z.number(),
      likes: z.number(),
    })
  ),
  state: z.union([
    z.object({
      stage: z.union([z.literal("lobby"), z.literal("generate")]),
    }),
    z.object({
      stage: z.literal("rounds"),
      roundId: zId("rounds"),
    }),
    z.object({
      stage: z.literal("recap"),
    }),
  ]),
  nextGameId: z.nullable(zId("games")),
});

export type ClientGameState = z.infer<typeof ClientGameStateZ>;

export const LabelStateZ = z.object({
  stage: z.literal("label"),
  mine: z.boolean(),
  imageUrl: z.string(),
  stageEnd: z.number(),
  submitted: z.array(
    z.object({
      me: z.boolean(),
      name: z.string(),
      pictureUrl: z.string(),
    })
  ),
});

export type LabelState = z.infer<typeof LabelStateZ>;

export const GuessStateZ = z.object({
  stage: z.literal("guess"),
  mine: z.boolean(),
  imageUrl: z.string(),
  stageEnd: z.number(),
  submitted: z.array(
    z.object({
      me: z.boolean(),
      name: z.string(),
      pictureUrl: z.string(),
    })
  ),
  options: z.array(z.string()),
});

export type GuessState = z.infer<typeof GuessStateZ>;

const userIdString = z.string();
export const RevealStateZ = z.object({
  stage: z.literal("reveal"),
  me: userIdString,
  authorId: userIdString,
  imageUrl: z.string(),
  stageEnd: z.number(),
  users: z.map(
    z.string(),
    z.object({
      me: z.boolean(),
      name: z.string(),
      pictureUrl: z.string(),
    })
  ),
  results: z.array(
    z.object({
      authorId: userIdString,
      prompt: z.string(),
      votes: z.array(userIdString),
      likes: z.array(userIdString),
      // userid to score
      scoreDeltas: z.map(userIdString, z.number()),
    })
  ),
});

export type RevealState = z.infer<typeof RevealStateZ>;
