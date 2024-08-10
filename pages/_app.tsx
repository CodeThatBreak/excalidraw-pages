import { AppProps } from "next/app";
import "../src/app/globals.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ApolloProvider>
  );
}
