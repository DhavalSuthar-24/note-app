import { prisma } from "../connection/prismaClient";
import { createNoteInput,updateNoteInput } from '../types/noteType';
import { Note } from "../types/noteType";



 export const getAllNotes =  async(page:number =1):Promise<Note[]> =>{
    const pageSize =20;

    return await prisma.note.findMany({
        skip:(page-1)*pageSize,
        take:pageSize

 });
  }


export const createNote = async (input:unknown):Promise<Note> =>{
    const validatedInput  = createNoteInput.parse(input)
    return await prisma.note.create({
        data:validatedInput,
    })
}

export const updateNote = async(input:unknown):Promise<Note>=>{
const validatedInput = updateNoteInput.parse(input)
return await prisma.note.update({
    where:{id:validatedInput.id},
    data:validatedInput,
})
}

export const deleteNote = async (id:number):Promise<number>=>{
    await prisma.note.delete({
        where:{id},
    });
    return id;
}