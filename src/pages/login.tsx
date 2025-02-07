import { LoginForm } from "../components/custom/login-form";
import { withLayout } from "../HOC/withLayout";
import { useLogin } from "../hooks/use-auth-hook";

function LoginPage() {
  const loginMutation = useLogin();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={loginMutation.mutate} isSubmitting={loginMutation.isPending} />
      </div>
    </div>
  );
}

export default withLayout(LoginPage);