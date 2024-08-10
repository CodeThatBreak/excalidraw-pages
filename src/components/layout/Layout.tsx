import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

const Layout = ({ children }) => {
  const headerElement = React.Children.toArray(children).find(
    (child) => child.type === Layout.Header
  );

  const mainElement = React.Children.toArray(children).find(
    (child) => child.type === Layout.Main
  );

  return (
    <div className="flex min-h-screen w-full h-dvh">
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          {headerElement}
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">{mainElement}</main>
      </div>
    </div>
  );
};

Layout.Header = ({ children }) => children;
Layout.Main = ({ children }) => children;

export { Layout };
