import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, User, Video, BookOpen, Calendar } from "lucide-react";

const todaysClasses = [
  {
    id: 1,
    subject: "Mathematics",
    instructor: "Dr. Sarah Johnson",
    time: "09:00 - 10:30",
    location: "Room 101",
    status: "upcoming",
    joinUrl: "#"
  },
  {
    id: 2,
    subject: "Physics",
    instructor: "Prof. Michael Chen", 
    time: "11:00 - 12:30",
    location: "Lab 205",
    status: "live",
    joinUrl: "#"
  },
  {
    id: 3,
    subject: "Chemistry",
    instructor: "Dr. Emily Rodriguez",
    time: "14:00 - 15:30", 
    location: "Room 103",
    status: "upcoming",
    joinUrl: "#"
  }
];

const weeklySchedule = {
  monday: [
    { subject: "Mathematics", time: "09:00", instructor: "Dr. Sarah Johnson", room: "Room 101" },
    { subject: "Physics", time: "11:00", instructor: "Prof. Michael Chen", room: "Lab 205" },
    { subject: "Chemistry", time: "14:00", instructor: "Dr. Emily Rodriguez", room: "Room 103" }
  ],
  tuesday: [
    { subject: "English", time: "10:00", instructor: "Prof. David Williams", room: "Room 201" },
    { subject: "Computer Science", time: "13:00", instructor: "Dr. Lisa Thompson", room: "Lab 301" }
  ],
  wednesday: [
    { subject: "Biology", time: "09:00", instructor: "Dr. Mark Davis", room: "Lab 102" },
    { subject: "History", time: "15:00", instructor: "Prof. Jennifer Wilson", room: "Room 105" }
  ],
  thursday: [
    { subject: "Mathematics", time: "09:00", instructor: "Dr. Sarah Johnson", room: "Room 101" },
    { subject: "Physics", time: "14:00", instructor: "Prof. Michael Chen", room: "Lab 205" }
  ],
  friday: [
    { subject: "Chemistry", time: "10:00", instructor: "Dr. Emily Rodriguez", room: "Room 103" },
    { subject: "Computer Science", time: "13:00", instructor: "Dr. Lisa Thompson", room: "Lab 301" }
  ]
};

const allCourses = [
  {
    code: "MATH101",
    name: "Calculus I", 
    instructor: "Dr. Sarah Johnson",
    credits: 4,
    schedule: "Mon, Wed, Fri - 09:00"
  },
  {
    code: "PHYS201",
    name: "General Physics",
    instructor: "Prof. Michael Chen",
    credits: 4,
    schedule: "Mon, Thu - 11:00"
  },
  {
    code: "CHEM150",
    name: "General Chemistry",
    instructor: "Dr. Emily Rodriguez", 
    credits: 3,
    schedule: "Mon, Wed, Fri - 14:00"
  },
  {
    code: "ENG102",
    name: "English Composition",
    instructor: "Prof. David Williams",
    credits: 3,
    schedule: "Tue, Thu - 10:00"
  },
  {
    code: "CS200", 
    name: "Programming Fundamentals",
    instructor: "Dr. Lisa Thompson",
    credits: 4,
    schedule: "Tue, Fri - 13:00"
  }
];

export default function ClassesPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Classes</h1>
          <p className="text-muted-foreground">
            Manage your class schedule and join ongoing sessions
          </p>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today's Classes</TabsTrigger>
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="courses">All Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {todaysClasses.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{classItem.subject}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        with {classItem.instructor}
                      </p>
                    </div>
                    <Badge className={getStatusColor(classItem.status)}>
                      {classItem.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {classItem.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {classItem.location}
                      </div>
                    </div>
                    <Button 
                      variant={classItem.status === 'live' ? 'default' : 'outline'}
                      className={classItem.status === 'live' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {classItem.status === 'live' ? (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Join Live
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 mr-2" />
                          Set Reminder
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            {Object.entries(weeklySchedule).map(([day, classes]) => (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="capitalize">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  {classes.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No classes scheduled</p>
                  ) : (
                    <div className="space-y-3">
                      {classes.map((classItem, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                          <div className="text-sm font-medium text-muted-foreground min-w-[60px]">
                            {classItem.time}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{classItem.subject}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {classItem.instructor}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {classItem.room}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            {allCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.code} • {course.credits} Credits
                      </p>
                    </div>
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      Instructor: {course.instructor}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Schedule: {course.schedule}
                    </div>
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