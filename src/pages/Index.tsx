import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LMSLayout } from "@/components/LMSLayout";
import { TodayClasses } from "@/components/dashboard/TodayClasses";
import { AttendanceAlerts } from "@/components/dashboard/AttendanceAlerts";
import { AssignmentAlerts } from "@/components/dashboard/AssignmentAlerts";
import { AttendanceSummary } from "@/components/dashboard/AttendanceSummary";
import { QuickActions } from "@/components/dashboard/QuickActions";
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

  return (
    <>
      <LMSLayout>
        <div className="space-y-6">
          {/* Breadcrumb */}
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

          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Good {getGreeting()}, {firstName}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's your academic overview for today.
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowNotifications(true)}
              className="relative shrink-0"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
            </Button>
          </div>

          {/* Alerts Row */}
          <div className="grid gap-4 md:grid-cols-2">
            <AttendanceAlerts />
            <AssignmentAlerts />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Today's Classes */}
            <div className="lg:col-span-2 space-y-6">
              <TodayClasses />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <AttendanceSummary />
              <QuickActions />
            </div>
          </div>
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

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

export default Index;
