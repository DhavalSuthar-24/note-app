import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  { useState } from 'react';
import {trpc} from "./utils/trpcClient"
import Home from './pages/Home';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';



function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_BASE_URL,
        }),
      ],
    })
  );
  

  return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
        <Home />
    </QueryClientProvider>
      </trpc.Provider>
  );
}
export default App
