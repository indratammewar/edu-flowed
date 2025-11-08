import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, FileText, CheckCircle2, Home } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const assignments = {
  pending: [
    {
      id: 1,
      title: "Mathematics Problem Set 3",
      subject: "Mathematics",
      dueDate: "2024-01-20",
      description: "Solve problems 1-15 from Chapter 4",
      priority: "high"
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics", 
      dueDate: "2024-01-25",
      description: "Complete analysis of pendulum experiment",
      priority: "medium"
    },
    {
      id: 3,
      title: "Chemistry Research Paper",
      subject: "Chemistry",
      dueDate: "2024-02-01",
      description: "Write 2000 words on organic compounds",
      priority: "low"
    }
  ],
  nearDeadline: [
    {
      id: 4,
      title: "English Essay",
      subject: "English",
      dueDate: "2024-01-18",
      description: "Critical analysis of Shakespeare's Hamlet",
      priority: "urgent"
    },
    {
      id: 5,
      title: "Computer Science Project",
      subject: "Computer Science",
      dueDate: "2024-01-19",
      description: "Build a simple calculator app",
      priority: "urgent"
    }
  ],
  completed: [
    {
      id: 6,
      title: "Biology Lab Worksheet",
      subject: "Biology",
      submittedDate: "2024-01-10",
      description: "Plant cell observation and analysis",
      grade: "A"
    },
    {
      id: 7,
      title: "History Timeline",
      subject: "History",
      submittedDate: "2024-01-08",
      description: "World War II major events timeline", 
      grade: "B+"
    }
  ]
};

export default function AssignmentsPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
                <FileText className="h-4 w-4" />
                Assignments
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
          <p className="text-muted-foreground">
            Track your assignments, deadlines, and submissions
          </p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending ({assignments.pending.length})</TabsTrigger>
            <TabsTrigger value="near-deadline">Near Deadline ({assignments.nearDeadline.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({assignments.completed.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {assignments.pending.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{assignment.subject}</p>
                    </div>
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      <span className="text-xs">({getDaysUntilDue(assignment.dueDate)} days left)</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="near-deadline" className="space-y-4">
            {assignments.nearDeadline.map((assignment) => (
              <Card key={assignment.id} className="border-destructive bg-destructive/5 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="w-5 h-5 text-destructive" />
                        {assignment.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{assignment.subject}</p>
                    </div>
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-destructive font-medium">
                      <CalendarDays className="w-4 h-4" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      <span className="text-xs">({getDaysUntilDue(assignment.dueDate)} days left)</span>
                    </div>
                    <Button size="sm" variant="destructive">
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {assignments.completed.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        {assignment.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{assignment.subject}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      {assignment.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4" />
                    Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </LMSLayout>
  );
}