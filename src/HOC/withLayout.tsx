/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import Footer from "../components/custom/footer";
import Header from "../components/custom/header";
import { useAuth } from "../hooks/use-auth-hook";
import { useNavigate } from "react-router";

export function withLayout(Component: any) {
  return function (props: any) {

    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (!user) {
        navigate('/login')
      }
    }, [user, navigate])
    
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
