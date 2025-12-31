import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Home, BarChart3, TrendingUp, TrendingDown, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Sample data
const attendanceData = [
  { name: "Present", value: 78, color: "hsl(142, 71%, 45%)" },
  { name: "Absent", value: 22, color: "hsl(0, 84%, 60%)" },
];

const subjectAttendance = [
  { subject: "DSA", attendance: 85, total: 40 },
  { subject: "DBMS", attendance: 82, total: 35 },
  { subject: "CN", attendance: 68, total: 30 },
  { subject: "OS", attendance: 72, total: 38 },
  { subject: "SE", attendance: 90, total: 25 },
  { subject: "Biology", attendance: 88, total: 20 },
];

const monthlyTrend = [
  { month: "Aug", attendance: 92 },
  { month: "Sep", attendance: 85 },
  { month: "Oct", attendance: 78 },
  { month: "Nov", attendance: 75 },
  { month: "Dec", attendance: 80 },
];

const semesterMarks = [
  { semester: "Sem 1", cgpa: 8.2, sgpa: 8.2 },
  { semester: "Sem 2", cgpa: 8.0, sgpa: 7.8 },
  { semester: "Sem 3", cgpa: 8.3, sgpa: 8.9 },
  { semester: "Sem 4", cgpa: 8.4, sgpa: 8.6 },
];

const subjectPerformance = [
  { subject: "DSA", internal: 42, external: 68 },
  { subject: "DBMS", internal: 38, external: 72 },
  { subject: "CN", internal: 35, external: 58 },
  { subject: "OS", internal: 40, external: 65 },
  { subject: "SE", internal: 45, external: 78 },
];

export default function AnalyticsPage() {
  const currentCGPA = 8.4;
  const mostMissedDay = "Monday";

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
                <BarChart3 className="h-4 w-4" />
                Analytics
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your academic performance and attendance patterns
          </p>
        </div>

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="attendance" className="gap-2">
              <Calendar className="h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="academic" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Academic
            </TabsTrigger>
          </TabsList>

          {/* Attendance Analytics */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Overall Attendance</div>
                  <div className="text-3xl font-bold text-foreground mt-1">78%</div>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingDown className="h-4 w-4 text-destructive" />
                    <span className="text-destructive">-3% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Classes Attended</div>
                  <div className="text-3xl font-bold text-foreground mt-1">156/200</div>
                  <div className="text-sm text-muted-foreground mt-2">44 classes missed</div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Most Missed Day</div>
                  <div className="text-3xl font-bold text-foreground mt-1">{mostMissedDay}</div>
                  <div className="text-sm text-muted-foreground mt-2">12 absences</div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Subjects at Risk</div>
                  <div className="text-3xl font-bold text-destructive mt-1">2</div>
                  <div className="text-sm text-muted-foreground mt-2">Below 75% threshold</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Overall Attendance Pie Chart */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Overall Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendanceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {attendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Subject-wise Attendance */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Subject-wise Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectAttendance} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="subject" type="category" width={50} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Attendance']} />
                        <Bar 
                          dataKey="attendance" 
                          fill="hsl(217, 91%, 60%)"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Trend */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Attendance']} />
                      <Line 
                        type="monotone" 
                        dataKey="attendance" 
                        stroke="hsl(217, 91%, 60%)"
                        strokeWidth={2}
                        dot={{ fill: "hsl(217, 91%, 60%)", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Low Attendance Subjects */}
            <Card className="shadow-sm border-warning/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-warning" />
                  Low Attendance Subjects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjectAttendance
                  .filter(s => s.attendance < 75)
                  .map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.subject}</span>
                        <Badge variant="outline" className="text-destructive border-destructive">
                          {subject.attendance}%
                        </Badge>
                      </div>
                      <Progress value={subject.attendance} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Need {Math.ceil((0.75 * subject.total - subject.attendance * subject.total / 100) / 0.25)} more classes to reach 75%
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Analytics */}
          <TabsContent value="academic" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Current CGPA</div>
                  <div className="text-3xl font-bold text-foreground mt-1">{currentCGPA}</div>
                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-success">+0.1 from last sem</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Last Semester SGPA</div>
                  <div className="text-3xl font-bold text-foreground mt-1">8.6</div>
                  <div className="text-sm text-muted-foreground mt-2">Best: 8.9 (Sem 3)</div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Subjects Cleared</div>
                  <div className="text-3xl font-bold text-foreground mt-1">24/24</div>
                  <div className="text-sm text-success mt-2">No backlogs</div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Class Rank</div>
                  <div className="text-3xl font-bold text-foreground mt-1">#12</div>
                  <div className="text-sm text-muted-foreground mt-2">Out of 60 students</div>
                </CardContent>
              </Card>
            </div>

            {/* CGPA Trend */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">CGPA & SGPA Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={semesterMarks}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis domain={[6, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="cgpa" 
                        stroke="hsl(217, 91%, 60%)"
                        strokeWidth={2}
                        name="CGPA"
                        dot={{ fill: "hsl(217, 91%, 60%)", strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sgpa" 
                        stroke="hsl(142, 71%, 45%)"
                        strokeWidth={2}
                        name="SGPA"
                        dot={{ fill: "hsl(142, 71%, 45%)", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Subject-wise Performance (Current Sem)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="internal" name="Internal (50)" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="external" name="External (100)" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LMSLayout>
  );
}
