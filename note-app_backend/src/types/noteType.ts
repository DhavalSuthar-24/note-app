import { z } from "zod";



// =====types=====
export type Note ={
    id:number;
    title:string;
    description:string;
    category:string;
    createdAt:Date;
    updatedAt?:Date;
}



//======zod schema======
export const createNoteInput = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

export const updateNoteInput = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});
