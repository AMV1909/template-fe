import { boolean, email, iso, object, string, z } from "zod";

export const userSchema = object({
    id: string(),
    firebaseId: string(),
    firstName: string(),
    lastName: string(),
    fullName: string(),
    email: email(),
    profilePictureUrl: string().nullable(),
    isDeleted: boolean(),
    createdAt: iso.datetime(),
    updatedAt: iso.datetime(),
});

export type User = z.infer<typeof userSchema>;
