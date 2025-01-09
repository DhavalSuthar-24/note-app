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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@trpc/server");
const express_2 = require("@trpc/server/adapters/express");
const prismaClient_1 = require("./connection/prismaClient");
const appRoute_1 = require("./routes/appRoute");
const createContext = ({ req, res }) => ({});
const t = server_1.initTRPC.context().create();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/trpc', (0, express_2.createExpressMiddleware)({
    router: appRoute_1.appRouter,
    createContext,
}));
const PORT = process.env.PORT;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, prismaClient_1.initializeDatabase)();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    });
}
startServer().catch((e) => {
    console.error('Failed to start server:', e);
});
