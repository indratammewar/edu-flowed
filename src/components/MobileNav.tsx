import { Home, BookOpen, MessageSquare, Radio, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "AI", url: "/ai-assistant", icon: Sparkles },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Channels", url: "/channels", icon: Radio },
];

export function MobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
              isActive(item.url)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
