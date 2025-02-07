import { Button } from "../ui/button";
import { NavLink } from "react-router";
import { LayoutDashboard, Plus, Settings, Menu, Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useTheme } from "../../context/theme-context";
import { useAuth } from "../../context/auth-context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <NavLink to="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent/90 transition-all"
            >
              <img
                src="/logo.svg"
                alt="logo"
                className="hover:scale-105 transition-transform"
              />
            </Button>
          </NavLink>
        </div>

        <nav className={cn(
          "md:flex md:justify-end md:items-center md:gap-1",
          "fixed md:static inset-x-0 top-[3.5rem] p-4 border-b md:border-none bg-background/95 backdrop-blur md:backdrop-blur-none md:bg-transparent",
          "flex-col md:flex-row gap-2 md:gap-1",
          !isMenuOpen && "hidden"
        )}>
          {user ? (
            <>
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

              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="md:hidden"
              >
                Log out
              </Button>
            </>
          ) : (
            <div className="flex md:hidden flex-col gap-2">
              <NavLink to="/login">
                <Button variant="outline" className="w-full">Log in</Button>
              </NavLink>
              <NavLink to="/register">
                <Button className="w-full">Register</Button>
              </NavLink>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-4 w-4" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                <span>Light Mode</span>
              </>
            )}
          </Button>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:block text-sm">
                Hello, {user.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hidden md:flex"
              >
                Log out
              </Button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/login">
                <Button variant="ghost">Log in</Button>
              </NavLink>
              <NavLink to="/register">
                <Button>Register</Button>
              </NavLink>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full hidden md:flex"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {user && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;