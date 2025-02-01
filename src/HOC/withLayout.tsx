/* eslint-disable @typescript-eslint/no-explicit-any */

import Footer from "../components/custom/footer";
import Header from "../components/custom/header";

export function withLayout(Component: any) {
  return function (props: any) {
    return (
      <>
        <Header />
        <main className="h-dvh">
          <Component {...props} />
        </main>
        <Footer />
      </>
    );
  };
}
