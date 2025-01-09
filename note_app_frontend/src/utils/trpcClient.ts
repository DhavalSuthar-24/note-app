import { createTRPCReact } from '@trpc/react-query';
import {AppRouter } from "../../../note-app_backend/src/routes/appRoute";
export const trpc = createTRPCReact<AppRouter>();

  
