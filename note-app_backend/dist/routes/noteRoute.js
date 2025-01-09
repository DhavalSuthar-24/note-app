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
exports.noteRouter = void 0;
const trpc_1 = require("../utils/trpc");
const zod_1 = require("zod");
const noteController_1 = require("../controllers/noteController");
const noteType_1 = require("../types/noteType");
exports.noteRouter = (0, trpc_1.router)({
    getAll: trpc_1.publicProcedure.input(zod_1.z.object({
        page: zod_1.z.number().min(1).optional()
    }))
        .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        var _b;
        const page = (_b = input.page) !== null && _b !== void 0 ? _b : 1;
        return yield (0, noteController_1.getAllNotes)(page);
    })),
    create: trpc_1.publicProcedure
        .input(noteType_1.createNoteInput)
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield (0, noteController_1.createNote)(input);
    })),
    update: trpc_1.publicProcedure
        .input(noteType_1.updateNoteInput)
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield (0, noteController_1.updateNote)(input);
    })),
    delete: trpc_1.publicProcedure
        .input(zod_1.z.number())
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        return yield (0, noteController_1.deleteNote)(input);
    })),
});
