import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  type LinksFunction,
} from "react-router";

import stylesheet from "./tailwind.css?url";
import { useState } from "react";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0f172a] text-slate-100 min-h-screen selection:bg-fuchsia-500/30">
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  )
}