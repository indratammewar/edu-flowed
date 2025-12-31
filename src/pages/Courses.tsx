import { useState } from "react";
import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Home, BookOpen, User, FileText, ClipboardList, BarChart2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface Subject {
  id: string;
  name: string;
  code: string;
  theoryTeacher: string;
  practicalTeacher: string | null;
  hasPractical: boolean;
  attendance: number;
  credits: number;
}

const subjects: Subject[] = [
  {
    id: "1",
    name: "Data Structures & Algorithms",
    code: "CS301",
    theoryTeacher: "Dr. Rajesh Kumar",
    practicalTeacher: "Mr. Amit Singh",
    hasPractical: true,
    attendance: 85,
    credits: 4,
  },
  {
    id: "2",
    name: "Database Management Systems",
    code: "CS302",
    theoryTeacher: "Prof. Meera Sharma",
    practicalTeacher: "Ms. Priya Gupta",
    hasPractical: true,
    attendance: 82,
    credits: 4,
  },
  {
    id: "3",
    name: "Computer Networks",
    code: "CS303",
    theoryTeacher: "Dr. Anil Verma",
    practicalTeacher: "Mr. Rahul Joshi",
    hasPractical: true,
    attendance: 68,
    credits: 4,
  },
  {
    id: "4",
    name: "Operating Systems",
    code: "CS304",
    theoryTeacher: "Prof. Sunita Patel",
    practicalTeacher: "Mr. Vijay Reddy",
    hasPractical: true,
    attendance: 72,
    credits: 4,
  },
  {
    id: "5",
    name: "Software Engineering",
    code: "CS305",
    theoryTeacher: "Dr. Kavita Nair",
    practicalTeacher: "Ms. Anjali Mehta",
    hasPractical: true,
    attendance: 90,
    credits: 3,
  },
  {
    id: "6",
    name: "Science of Nature (Biology)",
    code: "GE101",
    theoryTeacher: "Dr. Sanjay Rao",
    practicalTeacher: null,
    hasPractical: false,
    attendance: 88,
    credits: 2,
  },
];

const notes = [
  { id: 1, title: "Unit 1 - Introduction to DSA", date: "Dec 10, 2024", type: "PDF" },
  { id: 2, title: "Unit 2 - Arrays and Linked Lists", date: "Dec 15, 2024", type: "PDF" },
  { id: 3, title: "Unit 3 - Trees and Graphs", date: "Dec 20, 2024", type: "PDF" },
];

const assignments = [
  { id: 1, title: "Assignment 1 - Array Operations", dueDate: "Dec 28, 2024", status: "submitted" },
  { id: 2, title: "Assignment 2 - Linked List Implementation", dueDate: "Jan 5, 2025", status: "pending" },
  { id: 3, title: "Lab Report - Sorting Algorithms", dueDate: "Jan 10, 2025", status: "pending" },
];

export default function CoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

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
                <BookOpen className="h-4 w-4" />
                Courses
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            View your enrolled subjects, notes, and assignments
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Subject List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-semibold text-lg mb-4">Enrolled Subjects</h2>
            {subjects.map((subject) => (
              <Card
                key={subject.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSubject?.id === subject.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{subject.code}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant={subject.hasPractical ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {subject.hasPractical ? "Theory + Practical" : "Theory Only"}
                        </Badge>
                        <span
                          className={`text-xs font-medium ${
                            subject.attendance >= 75
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {subject.attendance}%
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subject Details */}
          <div className="lg:col-span-2">
            {selectedSubject ? (
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedSubject.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedSubject.code} • {selectedSubject.credits} Credits
                      </p>
                    </div>
                    <Badge
                      className={
                        selectedSubject.hasPractical
                          ? "bg-primary"
                          : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {selectedSubject.hasPractical ? "Theory + Practical" : "Theory Only"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview" className="text-xs sm:text-sm">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="text-xs sm:text-sm">
                        Notes
                      </TabsTrigger>
                      <TabsTrigger value="assignments" className="text-xs sm:text-sm">
                        Assignments
                      </TabsTrigger>
                      <TabsTrigger value="attendance" className="text-xs sm:text-sm">
                        Attendance
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Theory Faculty</span>
                          </div>
                          <p className="text-foreground">{selectedSubject.theoryTeacher}</p>
                        </div>
                        {selectedSubject.hasPractical && (
                          <div className="p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4 text-accent" />
                              <span className="text-sm font-medium">Practical Instructor</span>
                            </div>
                            <p className="text-foreground">{selectedSubject.practicalTeacher}</p>
                          </div>
                        )}
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Subject Attendance</span>
                          <span
                            className={`font-bold ${
                              selectedSubject.attendance >= 75
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          >
                            {selectedSubject.attendance}%
                          </span>
                        </div>
                        <Progress value={selectedSubject.attendance} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                          {selectedSubject.attendance >= 75
                            ? "You're on track! Keep it up."
                            : "Warning: Below 75% threshold. Attend more classes."}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="space-y-3">
                      {notes.map((note) => (
                        <div
                          key={note.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{note.title}</p>
                              <p className="text-sm text-muted-foreground">{note.date}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="assignments" className="space-y-3">
                      {assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-accent/10">
                              <ClipboardList className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{assignment.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Due: {assignment.dueDate}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              assignment.status === "submitted" ? "default" : "secondary"
                            }
                            className={
                              assignment.status === "submitted"
                                ? "bg-success"
                                : ""
                            }
                          >
                            {assignment.status === "submitted" ? "Submitted" : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="attendance" className="space-y-4">
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-4">
                          <BarChart2 className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">
                          {selectedSubject.attendance}% Attendance
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {Math.round(selectedSubject.attendance * 0.4)} of 40 classes attended
                        </p>
                        {selectedSubject.hasPractical && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Theory: {Math.round(selectedSubject.attendance * 0.25)}/25 • Practical:{" "}
                            {Math.round(selectedSubject.attendance * 0.15)}/15
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">Select a Subject</h3>
                  <p className="text-muted-foreground text-center mt-1">
                    Choose a subject from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </LMSLayout>
  );
}
