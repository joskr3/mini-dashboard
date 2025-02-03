import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Plus, Settings, Menu } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full hover:bg-accent/90 transition-all"
          >
            <img
              src="./logo.svg"
              alt="logo"
              className="hover:scale-105 transition-transform"
            />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Navigation Links */}
        <nav className={cn(
          "md:flex md:justify-end md:gap-1",
          "fixed md:static inset-x-0 top-[3.5rem] p-4 border-b md:border-none bg-background/95 backdrop-blur md:backdrop-blur-none md:bg-transparent",
          "flex-col md:flex-row gap-2 md:gap-1",
          !isMenuOpen && "hidden"
        )}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks/new"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <Plus className="h-4 w-4" />
            <span>New Task</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;