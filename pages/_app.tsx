import { useState } from "react";
import type { AppProps } from "next/app";

// Global css
import "@radix-ui/themes/styles.css";
import "../src/app/globals.css";

// Provider
import { Theme } from "@radix-ui/themes";
import { ThemeContext, ThemeMode } from "@/provider/ThemeProvider";

// Client
import apolloClient from "@/lib/apollo";

// Fragments
import { PREFERENCE_QUERY_FRAGMENT } from "@/fragments/preference";

// Constants
import { INITIAL_PREFERENCE } from "@/constants/preferenceKey";
import { ApolloProvider } from "@apollo/client";

type InitialProps = { initialPreference: { theme: ThemeMode } };

function MyApp({
  Component,
  pageProps,
  initialPreference,
}: AppProps & InitialProps): JSX.Element {
  const [theme, setTheme] = useState<ThemeMode>(initialPreference.theme);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Theme
          accentColor="gray"
          grayColor="slate"
          appearance={theme}
          panelBackground="solid"
        >
          <Component {...pageProps} />
        </Theme>
      </ThemeContext.Provider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async () => {
  const response = await apolloClient.query({
    query: PREFERENCE_QUERY_FRAGMENT,
    variables: { key: INITIAL_PREFERENCE },
  });

  const preference = response.data?.fetchPreference;
  const theme = preference?.value?.theme ?? ThemeMode.Light;

  return {
    initialPreference: { theme },
  };
};

export default MyApp;
