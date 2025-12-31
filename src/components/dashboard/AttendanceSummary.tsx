import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function AttendanceSummary() {
  const overallAttendance = 78;
  const classesAttended = 156;
  const totalClasses = 200;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-foreground">{overallAttendance}%</div>
          <p className="text-sm text-muted-foreground">
            {classesAttended} of {totalClasses} classes attended
          </p>
        </div>
        
        <Progress 
          value={overallAttendance} 
          className="h-2 mb-4"
        />
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>75% Required</span>
          <span className={overallAttendance >= 75 ? "text-success" : "text-destructive"}>
            {overallAttendance >= 75 ? "On Track" : "Below Threshold"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
