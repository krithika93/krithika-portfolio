import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/case-study/visual-metonymy", label: "Case Study" },
    { href: "/builder", label: "Builder" },
    { href: "/vision", label: "Vision" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex flex-1 items-center space-x-6 overflow-x-auto pb-1 md:pb-0">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                location === item.href 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              }`}
              data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="ml-4 flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
