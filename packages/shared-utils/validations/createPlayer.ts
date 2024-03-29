import { z } from "zod"
import { Avatar } from "../types/avatar"

const avatar: z.ZodType<Avatar> = z.enum([
  "bee",
  "crab",
  "dog",
  "elephant",
  "fox",
  "frog",
  "koala",
  "octopus",
  "penguin",
  "turtle",
  "whale",
])

export const createPlayer = z.object({
  name: z.string().min(1).max(100),
  avatar: avatar,
})

export type CreatePlayer = z.infer<typeof createPlayer>
