import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LMSLayout } from "@/components/LMSLayout";
import { DashboardPrimaryAction } from "@/components/dashboard/PrimaryAction";
import { RiskAlerts } from "@/components/dashboard/RiskAlerts";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { NotificationPopup } from "@/components/NotificationPopup";
import { QuickClassJoinButton } from "@/components/QuickClassJoinButton";
import { KeyboardShortcutsOverlay } from "@/components/KeyboardShortcutsOverlay";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Bell, Home, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Index = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { shortcuts, showOverlay, setShowOverlay } = useKeyboardShortcuts();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ full_name: string | null }>({ full_name: null });
  const [notificationCount] = useState(2);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) setProfile(data);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const firstName = profile.full_name?.split(' ')[0] || 'Student';
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <LMSLayout>
        <div className="space-y-5">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-1.5 text-muted-foreground">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowNotifications(true)}
              className="relative shrink-0"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Contextual Header - No generic greeting */}
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">
              {firstName}, here's what needs your attention
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {currentDate}
            </p>
          </div>

          {/* Primary Action - Most urgent thing to do */}
          <DashboardPrimaryAction />

          {/* Quick Stats Row */}
          <QuickStats />

          {/* Risk Alerts - Critical and Warning items */}
          <RiskAlerts />

          {/* Today's Schedule with attendance context */}
          <TodaySchedule />
        </div>
      </LMSLayout>
      
      <NotificationPopup 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      <QuickClassJoinButton />
      <KeyboardShortcutsOverlay
        open={showOverlay}
        onOpenChange={setShowOverlay}
        shortcuts={shortcuts}
      />
    </>
  );
};

export default Index;
