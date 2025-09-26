import { LMSLayout } from "@/components/LMSLayout";
import { UpcomingClasses } from "@/components/dashboard/UpcomingClasses";
import { AttendanceOverview } from "@/components/dashboard/AttendanceOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentAnnouncements } from "@/components/dashboard/RecentAnnouncements";
const Index = () => {
  return <LMSLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Student!</h1>
          <p className="text-muted-foreground">
            Here's what's happening in your learning journey today.
          </p>
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
    </LMSLayout>;
};
export default Index;