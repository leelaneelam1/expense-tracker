
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  PieChart,
  WalletCards,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: WalletCards,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: PieChart,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
      <div className="flex h-full w-[200px] flex-col">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                Overview
              </h2>
              <nav className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    variant={
                      location.pathname === item.href ? "secondary" : "ghost"
                    }
                    className={cn(
                      "w-full justify-start",
                      location.pathname === item.href
                        ? "bg-secondary"
                        : "hover:bg-transparent hover:underline"
                    )}
                    asChild
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
