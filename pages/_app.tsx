import React from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";
import UserStyle from "@/styles/userStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <UserStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
