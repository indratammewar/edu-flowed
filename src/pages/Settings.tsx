import { useState } from "react";
import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Home, Settings2, Lock, Bell, Eye, Palette, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function SettingsPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    assignments: true,
    attendance: true,
    messages: true,
    announcements: true,
    email: false,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showAttendance: false,
  });

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsChangingPassword(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsChangingPassword(false);
    setPasswords({ current: "", new: "", confirm: "" });
    toast.success("Password changed successfully");
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification settings updated");
  };

  const handlePrivacyToggle = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Privacy settings updated");
  };

  return (
    <LMSLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1">
                <Settings2 className="h-4 w-4" />
                Settings
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences
          </p>
        </div>

        {/* Change Password */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Change Password</CardTitle>
            </div>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="Enter current password"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <Button
              onClick={handlePasswordChange}
              disabled={isChangingPassword || !passwords.current || !passwords.new || !passwords.confirm}
              className="gap-2"
            >
              {isChangingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </div>
            <CardDescription>Choose what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Assignment Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified about upcoming deadlines</p>
              </div>
              <Switch
                checked={notifications.assignments}
                onCheckedChange={() => handleNotificationToggle("assignments")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Attendance Alerts</p>
                <p className="text-sm text-muted-foreground">Receive alerts when attendance is low</p>
              </div>
              <Switch
                checked={notifications.attendance}
                onCheckedChange={() => handleNotificationToggle("attendance")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Messages</p>
                <p className="text-sm text-muted-foreground">Get notified when faculty sends messages</p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={() => handleNotificationToggle("messages")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Announcements</p>
                <p className="text-sm text-muted-foreground">Important announcements from college</p>
              </div>
              <Switch
                checked={notifications.announcements}
                onCheckedChange={() => handleNotificationToggle("announcements")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Also send notifications via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={() => handleNotificationToggle("email")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Privacy Settings</CardTitle>
            </div>
            <CardDescription>Control your profile visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Show Profile to Classmates</p>
                <p className="text-sm text-muted-foreground">Allow others to see your profile info</p>
              </div>
              <Switch
                checked={privacy.showProfile}
                onCheckedChange={() => handlePrivacyToggle("showProfile")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Show Attendance to Others</p>
                <p className="text-sm text-muted-foreground">Display your attendance on leaderboards</p>
              </div>
              <Switch
                checked={privacy.showAttendance}
                onCheckedChange={() => handlePrivacyToggle("showAttendance")}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Theme */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">App Theme</CardTitle>
            </div>
            <CardDescription>Customize the app appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You can change the theme using the toggle in the header. The app defaults to a light, clean theme for better readability.
            </p>
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-lg bg-background border-2 border-primary flex items-center justify-center">
                <span className="text-xs font-medium">Light</span>
              </div>
              <div className="w-16 h-16 rounded-lg bg-slate-900 border-2 border-border flex items-center justify-center">
                <span className="text-xs font-medium text-white">Dark</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LMSLayout>
  );
}
