import type { PropsWithChildren } from "react";
import React from "react";


type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <header>
      </header>
      <main className="container">{children}</main>
      <footer>
      <footer />
    </>
  );
}