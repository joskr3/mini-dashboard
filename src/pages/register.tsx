import Footer from "../components/custom/footer";
import Header from "../components/custom/header";
import { RegisterForm } from "../components/custom/register-form";
import { useSignup } from "../hooks/use-auth-hook";


function RegisterPage() {
  const signupMutation = useSignup();

  return (
    <>
      <Header />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm onSubmit={signupMutation.mutate} isSubmitting={signupMutation.isPending} />
        </div>
      </div>
      <Footer />
    </>

  );
}

export default RegisterPage