"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getAllNotes = void 0;
const prismaClient_1 = require("../connection/prismaClient");
const noteType_1 = require("../types/noteType");
const getAllNotes = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1) {
    const pageSize = 20;
    return yield prismaClient_1.prisma.note.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
    });
});
exports.getAllNotes = getAllNotes;
const createNote = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedInput = noteType_1.createNoteInput.parse(input);
    return yield prismaClient_1.prisma.note.create({
        data: validatedInput,
    });
});
exports.createNote = createNote;
const updateNote = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedInput = noteType_1.updateNoteInput.parse(input);
    return yield prismaClient_1.prisma.note.update({
        where: { id: validatedInput.id },
        data: validatedInput,
    });
});
exports.updateNote = updateNote;
const deleteNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.prisma.note.delete({
        where: { id },
    });
    return id;
});
exports.deleteNote = deleteNote;
