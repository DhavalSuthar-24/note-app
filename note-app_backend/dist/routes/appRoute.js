"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const noteRoute_1 = require("./noteRoute");
const t = server_1.initTRPC.create();
exports.appRouter = t.router({
    note: noteRoute_1.noteRouter,
});
