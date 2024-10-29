import React, { ReactNode } from 'react';
import Header from './components/Header'
import Main from './components/Main';
import Footer from './components/Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function App(): JSX.Element {
  return (
    <Layout children={undefined}>
      <Main />
    </Layout>
  );
}

export default App;
