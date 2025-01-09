"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteInput = exports.createNoteInput = void 0;
const zod_1 = require("zod");
//======zod schema======
exports.createNoteInput = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    category: zod_1.z.string().min(1, "Category is required"),
});
exports.updateNoteInput = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    category: zod_1.z.string().min(1, "Category is required"),
});
