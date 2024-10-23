import type { PropsWithChildren } from "react";
import Navigation from "./Navigation";
import Footer from "../src/components/Footer";
import React from "react";


type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}