import type { AppProps } from "next/app";

import apolloClient from "@/lib/apollo";

// Global css
import "@radix-ui/themes/styles.css";
import "../src/app/globals.css";

// Provider
import { Theme } from "@radix-ui/themes";
import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { ThemeContext, ThemeMode } from "@/provider/ThemeProvider";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Dark);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Theme appearance={theme}>
          <Component {...pageProps} />
        </Theme>
      </ThemeContext.Provider>
    </ApolloProvider>
  );
}
