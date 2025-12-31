import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  TrendingDown, 
  Users, 
  Calendar, 
  Home,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// Risk-based attendance data
const attendanceData = {
  overall: 68,
  totalAttended: 80,
  totalClasses: 115,
  requiredPercentage: 75,
  remainingClasses: 25, // Classes left in semester
  subjects: [
    { 
      name: "Computer Networks", 
      attended: 12, 
      total: 18, 
      percentage: 67,
      upcomingClasses: 8,
      riskState: "critical" as const,
    },
    { 
      name: "Operating Systems", 
      attended: 14, 
      total: 19, 
      percentage: 74,
      upcomingClasses: 7,
      riskState: "warning" as const,
    },
    { 
      name: "Chemistry", 
      attended: 14, 
      total: 20, 
      percentage: 70,
      upcomingClasses: 6,
      riskState: "warning" as const,
    },
    { 
      name: "Data Structures", 
      attended: 18, 
      total: 22, 
      percentage: 82,
      upcomingClasses: 8,
      riskState: "safe" as const,
    },
    { 
      name: "Database Systems", 
      attended: 17, 
      total: 20, 
      percentage: 85,
      upcomingClasses: 6,
      riskState: "safe" as const,
    },
    { 
      name: "Software Engineering", 
      attended: 16, 
      total: 18, 
      percentage: 89,
      upcomingClasses: 5,
      riskState: "safe" as const,
    }
  ],
};

export default function AttendancePage() {
  // Calculate classes needed to reach 75%
  const calculateRecovery = (attended: number, total: number, upcoming: number) => {
    // How many consecutive classes needed to reach 75%
    // (attended + x) / (total + x) >= 0.75
    // x >= (0.75 * total - attended) / 0.25
    const needed = Math.ceil((0.75 * total - attended) / 0.25);
    const canRecover = needed <= upcoming;
    return { needed: Math.max(0, needed), canRecover, upcoming };
  };

  // Simulate what happens if next class is missed
  const simulateMiss = (attended: number, total: number) => {
    return Math.round((attended / (total + 1)) * 100);
  };

  const getRiskStyles = (risk: "critical" | "warning" | "safe") => {
    switch (risk) {
      case "critical":
        return {
          border: "border-destructive/40",
          bg: "bg-destructive/5",
          badge: "bg-destructive text-destructive-foreground",
          text: "text-destructive",
          icon: XCircle,
        };
      case "warning":
        return {
          border: "border-warning/40",
          bg: "bg-warning/5",
          badge: "bg-warning text-warning-foreground",
          text: "text-warning",
          icon: AlertTriangle,
        };
      case "safe":
        return {
          border: "border-success/40",
          bg: "bg-success/5",
          badge: "bg-success text-success-foreground",
          text: "text-success",
          icon: CheckCircle2,
        };
    }
  };

  const overallRecovery = calculateRecovery(
    attendanceData.totalAttended, 
    attendanceData.totalClasses, 
    attendanceData.remainingClasses
  );

  const criticalSubjects = attendanceData.subjects.filter(s => s.riskState === "critical");
  const warningSubjects = attendanceData.subjects.filter(s => s.riskState === "warning");
  const safeSubjects = attendanceData.subjects.filter(s => s.riskState === "safe");

  return (
    <LMSLayout>
      <div className="space-y-6">
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
                <Users className="h-4 w-4" />
                Attendance
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header with prediction */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Risk Analysis</h1>
          <p className="text-muted-foreground mt-1">
            {attendanceData.remainingClasses} classes remaining this semester
          </p>
        </div>

        {/* Overall Risk Alert */}
        {attendanceData.overall < 75 && (
          <Alert className="border-destructive/40 bg-destructive/10">
            <XCircle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-foreground ml-2">
              <div className="font-semibold text-destructive mb-1">
                Overall attendance at {attendanceData.overall}% — Below 75% threshold
              </div>
              <p className="text-sm">
                {overallRecovery.canRecover ? (
                  <>
                    <span className="font-medium">Recovery possible:</span> Attend the next{" "}
                    <span className="font-bold text-foreground">{overallRecovery.needed} classes consecutively</span>{" "}
                    to reach 75%.
                  </>
                ) : (
                  <>
                    <span className="font-medium text-destructive">Recovery unlikely:</span> You would need to attend more classes than remaining in the semester.
                  </>
                )}
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className={attendanceData.overall < 70 ? "border-destructive/30" : attendanceData.overall < 75 ? "border-warning/30" : ""}>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overall</div>
              <div className={`text-3xl font-bold ${
                attendanceData.overall < 70 ? "text-destructive" : 
                attendanceData.overall < 75 ? "text-warning" : "text-foreground"
              }`}>
                {attendanceData.overall}%
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 text-destructive" />
                Dropped 5% this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Classes Attended</div>
              <div className="text-3xl font-bold text-foreground">
                {attendanceData.totalAttended}/{attendanceData.totalClasses}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {attendanceData.totalClasses - attendanceData.totalAttended} missed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">To Recover</div>
              <div className={`text-3xl font-bold ${overallRecovery.canRecover ? "text-foreground" : "text-destructive"}`}>
                {overallRecovery.needed}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Consecutive classes needed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Risk Status</div>
              <Badge className={`text-sm mt-1 ${
                criticalSubjects.length > 0 ? "bg-destructive" :
                warningSubjects.length > 0 ? "bg-warning" : "bg-success"
              }`}>
                {criticalSubjects.length > 0 ? `${criticalSubjects.length} Critical` :
                 warningSubjects.length > 0 ? `${warningSubjects.length} At Risk` : "All Safe"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Critical Subjects */}
        {criticalSubjects.length > 0 && (
          <Card className="border-destructive/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-destructive">Critical — Immediate Action Required</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalSubjects.map((subject) => {
                const recovery = calculateRecovery(subject.attended, subject.total, subject.upcomingClasses);
                const afterMiss = simulateMiss(subject.attended, subject.total);
                
                return (
                  <div key={subject.name} className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subject.attended} of {subject.total} attended
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-destructive">{subject.percentage}%</div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-secondary rounded-full h-2 mb-3">
                      <div 
                        className="h-2 rounded-full bg-destructive transition-all"
                        style={{ width: `${subject.percentage}%` }}
                      />
                    </div>
                    
                    {/* Predictions */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 p-2 rounded bg-background">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">If you miss the next class:</span>{" "}
                          <span className="text-destructive">
                            Drops to {afterMiss}%
                            {afterMiss < 65 && " — May lose exam eligibility"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 p-2 rounded bg-background">
                        <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Recovery path:</span>{" "}
                          {recovery.canRecover ? (
                            <span className="text-foreground">
                              Attend next <span className="font-bold">{recovery.needed} classes</span> consecutively
                            </span>
                          ) : (
                            <span className="text-destructive font-medium">
                              Cannot reach 75% with remaining {recovery.upcoming} classes
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Warning Subjects */}
        {warningSubjects.length > 0 && (
          <Card className="border-warning/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="text-warning">At Risk — Monitor Closely</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {warningSubjects.map((subject) => {
                const recovery = calculateRecovery(subject.attended, subject.total, subject.upcomingClasses);
                const afterMiss = simulateMiss(subject.attended, subject.total);
                const afterTwoMiss = Math.round((subject.attended / (subject.total + 2)) * 100);
                
                return (
                  <div key={subject.name} className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subject.attended} of {subject.total} attended
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-warning">{subject.percentage}%</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-2 mb-3">
                      <div 
                        className="h-2 rounded-full bg-warning transition-all"
                        style={{ width: `${subject.percentage}%` }}
                      />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 p-2 rounded bg-background">
                        <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Missing next 2 classes:</span>{" "}
                          <span className="text-warning">
                            Drops to {afterTwoMiss}% — enters critical zone
                          </span>
                        </div>
                      </div>
                      
                      {subject.percentage < 75 && (
                        <div className="flex items-start gap-2 p-2 rounded bg-background">
                          <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">To reach 75%:</span>{" "}
                            <span className="text-foreground">
                              Attend next <span className="font-bold">{recovery.needed} classes</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Safe Subjects */}
        {safeSubjects.length > 0 && (
          <Card className="border-success/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-success">On Track</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {safeSubjects.map((subject) => {
                  // How many can be missed while staying above 75%
                  const canMiss = Math.floor((subject.attended - 0.75 * subject.total) / 0.75);
                  
                  return (
                    <div key={subject.name} className="p-3 rounded-lg bg-success/5 border border-success/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground text-sm">{subject.name}</h3>
                        <span className="text-lg font-bold text-success">{subject.percentage}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5 mb-2">
                        <div 
                          className="h-1.5 rounded-full bg-success transition-all"
                          style={{ width: `${Math.min(100, subject.percentage)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Buffer: Can miss {canMiss > 0 ? canMiss : 0} more class{canMiss !== 1 ? "es" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </LMSLayout>
  );
}
