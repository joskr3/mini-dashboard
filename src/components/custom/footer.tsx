import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link, useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-dvw border-t bg-background/95">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full px-4 py-8 gap-8">
        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Quick Links */}
        <nav className="flex flex-col items-center md:items-center">
          <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
          <div className="flex  gap-2">
            <Link to="/" className={cn("text-sm text-muted-foreground hover:text-foreground transition-colors", "flex items-center gap-2 hover:underline")}>
              Inicio
            </Link>
            <Link to="/tasks" className={cn("text-sm text-muted-foreground hover:text-foreground transition-colors", "flex items-center gap-2 hover:underline")}>
              Tareas
            </Link>
            <Link to="/about" className={cn("text-sm text-muted-foreground hover:text-foreground transition-colors", "flex items-center gap-2 hover:underline")}>
              Acerca de
            </Link>
          </div>
        </nav>
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <Button
            variant="ghost"
            className="rounded-full p-2 hover:bg-accent/90 transition-all"
            onClick={() => navigate("/")}
          >
            <img
              src="./logo.svg"
              alt="logo"
              className="h-12 w-12 grayscale hover:grayscale-0 transition-all"
            />
          </Button>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Gestionando tareas con eficiencia
          </p>
        </div>

      </div>

      {/* Copyright Section */}
      <section className="w-full " >
        <Separator />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Task Manager. Todos los derechos reservados.</div>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Términos
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;