import { type ReactNode, Children, isValidElement } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const headerElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === Layout.Header
  );

  const mainElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === Layout.Main
  );

  return (
    <div className="flex min-h-screen w-full h-dvh">
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background py-2 px-4 md:px-6">
          {headerElement}
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">{mainElement}</main>
      </div>
    </div>
  );
};

Layout.Header = ({ children }: { children: ReactNode }): JSX.Element => (
  <>{children}</>
);
Layout.Main = ({ children }: { children: ReactNode }): JSX.Element => (
  <>{children}</>
);

export { Layout };
