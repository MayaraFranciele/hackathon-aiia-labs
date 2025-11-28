import {
  Home,
  TrendingUp,
  FileText,
  Zap,
  CreditCard,
  Smartphone,
  ShoppingBag,
  Shield,
  Landmark,
  Moon,
  Sun,
  Wallet ,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Controle de Gastos", url: "/spending", icon: TrendingUp },
  { title: "Extrato", url: "/statement", icon: FileText },
];

const servicesItems = [
  { title: "PIX", url: "/pix", icon: Zap },
  { title: "Pagamentos", url: "/payments", icon: CreditCard },
  { title: "Recargas", url: "/recharge", icon: Smartphone },
  { title: "Cashback", url: "/cashback", icon: ShoppingBag },
  { title: "Seguros", url: "/insurance", icon: Shield },
  { title: "Empréstimos", url: "/loans", icon: Landmark },
];

interface AppSidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function AppSidebar({ isDarkMode, toggleDarkMode }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="group will-change-transform"
    >
      <SidebarContent className="flex flex-col h-full">

        <div className="px-4 py-5 border-b border-sidebar-border flex items-center justify-center">
          <div className="flex items-center justify-center w-full">
            <span
              className={`text-2xl font-bold text-sidebar-primary transition-opacity duration-200 ${
                isCollapsed ? "opacity-0 absolute" : "opacity-100"
              }`}
            >
              RedHub
            </span>
            
            <Wallet className="w-7 h-7 text-sidebar-primary" />

            {isCollapsed && (
              <span className="font-bold text-xl text-sidebar-primary">
                RH
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Serviços</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {servicesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-4 pb-3">
          <button
            onClick={toggleDarkMode}
            aria-label="Alternar tema"
            className={`
              w-full flex items-center gap-3 py-3 rounded-xl
              ${isCollapsed ? "justify-center bg-transparent" : "justify-start bg-sidebar-accent hover:bg-sidebar-accent/80 px-4"}
              transition-colors
            `}
          >
            <div
              className="transition-transform duration-300"
              style={{
                transform: isDarkMode ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </div>

            {!isCollapsed && (
              <span className="text-sm font-medium">
                {isDarkMode ? "Modo Claro" : "Modo Escuro"}
              </span>
            )}
          </button>
        </div>

        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Usuário
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  usuario@email.com
                </p>
              </div>
            </div>
          </div>
        )}

      </SidebarContent>
    </Sidebar>
  );
}
