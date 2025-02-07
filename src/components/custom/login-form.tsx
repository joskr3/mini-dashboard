// components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { NavLink } from "react-router";
import { LoginFormData } from "../../lib/types";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isSubmitting?: boolean;
}

export function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const { register, handleSubmit } = useForm<LoginFormData>();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Bienvenido de nuevo</h1>
            <div className="text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <NavLink to="/register" className="underline underline-offset-4">
                Regístrate
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input id="username" {...register("username", { required: true })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...register("password", { required: true })} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}