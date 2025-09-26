import { useState } from "react";
import { LMSLayout } from "@/components/LMSLayout";
import { UpcomingClasses } from "@/components/dashboard/UpcomingClasses";
import { AttendanceOverview } from "@/components/dashboard/AttendanceOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentAnnouncements } from "@/components/dashboard/RecentAnnouncements";
import { NotificationPopup } from "@/components/NotificationPopup";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
const Index = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <LMSLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Student!</h1>
            <p className="text-muted-foreground">
              Here's what's happening in your learning journey today.
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowNotifications(true)}
            className="relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <UpcomingClasses />
            <RecentAnnouncements />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AttendanceOverview />
            <QuickActions />
          </div>
        </div>
      </div>
    </LMSLayout>
    
    <NotificationPopup 
      isOpen={showNotifications}
      onClose={() => setShowNotifications(false)}
    />
    </>
  );
};
export default Index;