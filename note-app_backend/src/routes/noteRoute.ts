import { publicProcedure, router } from '../utils/trpc';
import { z } from 'zod';
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/noteController'; 
import { createNoteInput,updateNoteInput } from '../types/noteType';


export const noteRouter = router({
  getAll: publicProcedure.input(z.object({
      page: z.number().min(1).optional()
    }))
    .query(async ({ input }) => {
      const page = input.page ?? 1;
      return await getAllNotes(page);
    }),


  create: publicProcedure
    .input(createNoteInput)
    .mutation(async ({ input }) => {
      return await createNote(input); 
    }),

  update: publicProcedure
    .input(updateNoteInput)
    .mutation(async ({ input }) => {
      return await updateNote(input); 
    }),

  delete: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      return await deleteNote(input);
    }),
});
