import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, Users, Calendar } from "lucide-react";

const attendanceData = {
  overall: 68, // Below 75%
  subjects: [
    { name: "Mathematics", attended: 15, total: 20, percentage: 75 },
    { name: "Physics", attended: 12, total: 18, percentage: 67 },
    { name: "Chemistry", attended: 14, total: 22, percentage: 64 },
    { name: "English", attended: 16, total: 20, percentage: 80 },
    { name: "Computer Science", attended: 10, total: 16, percentage: 63 },
    { name: "Biology", attended: 13, total: 19, percentage: 68 }
  ],
  totalAttended: 80,
  totalClasses: 115,
  requiredPercentage: 75
};

export default function AttendancePage() {
  const calculateRequiredClasses = (attended: number, total: number, targetPercentage: number = 75) => {
    // Formula: (attended + x) / (total + x) >= targetPercentage/100
    // Solving for x: x >= (targetPercentage/100 * total - attended) / (1 - targetPercentage/100)
    const required = Math.ceil((targetPercentage/100 * total - attended) / (1 - targetPercentage/100));
    return Math.max(0, required);
  };

  const overallRequired = calculateRequiredClasses(attendanceData.totalAttended, attendanceData.totalClasses);

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Overview</h1>
          <p className="text-muted-foreground">
            Track your attendance and maintain the required 75% threshold
          </p>
        </div>

        {/* Overall Attendance Alert */}
        {attendanceData.overall < 75 && (
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              Your overall attendance is {attendanceData.overall}%, which is below the required 75%. 
              You need to attend at least <strong>{overallRequired} more classes</strong> to reach the minimum requirement.
            </AlertDescription>
          </Alert>
        )}

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                <span className={getPercentageColor(attendanceData.overall)}>
                  {attendanceData.overall}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {attendanceData.totalAttended} of {attendanceData.totalClasses} classes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Needed</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {overallRequired}
              </div>
              <p className="text-xs text-muted-foreground">
                To reach 75% attendance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Target</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">75%</div>
              <p className="text-xs text-muted-foreground">
                Minimum required
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={attendanceData.overall >= 75 ? "default" : "destructive"} className="text-sm">
                {attendanceData.overall >= 75 ? "Good Standing" : "Below Threshold"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {attendanceData.subjects.map((subject, index) => {
              const requiredForSubject = calculateRequiredClasses(subject.attended, subject.total);
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {subject.attended} of {subject.total} classes attended
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getPercentageColor(subject.percentage)}`}>
                        {subject.percentage}%
                      </div>
                      {subject.percentage < 75 && (
                        <p className="text-xs text-destructive">
                          Need {requiredForSubject} more
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getProgressColor(subject.percentage)}`}
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>
                  
                  {subject.percentage < 75 && (
                    <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800 dark:text-yellow-200 text-sm">
                        Attend {requiredForSubject} more {subject.name} classes to reach 75% attendance
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </LMSLayout>
  );
}