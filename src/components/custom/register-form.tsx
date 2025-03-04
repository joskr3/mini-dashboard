// components/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RegisterFormData } from "../../lib/types";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  initialData?: Partial<RegisterFormData>;
  isSubmitting?: boolean;
}

export function RegisterForm({ onSubmit, initialData, isSubmitting }: RegisterFormProps) {
  const { register, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: initialData,
  });

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Bienvenido a Tasks.</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" {...register("name", { required: true })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input id="username" {...register("username", { required: true })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email", { required: true })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...register("password", { required: true })} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}