import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";

interface LMSLayoutProps {
  children: React.ReactNode;
}

export function LMSLayout({ children }: LMSLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </SidebarProvider>
  );
}
