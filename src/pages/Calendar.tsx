import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Home, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// Generate schedule data dynamically based on today's date
const getScheduleData = () => {
  const today = new Date();
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
  const todayKey = formatDate(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = formatDate(tomorrow);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  const dayAfterKey = formatDate(dayAfter);

  return {
    [todayKey]: [
      { time: "09:00", subject: "Mathematics", location: "Room 101", type: "lecture" },
      { time: "11:00", subject: "Physics", location: "Lab 205", type: "lab" },
      { time: "14:00", subject: "Chemistry", location: "Room 103", type: "lecture" },
      { time: "16:00", subject: "Computer Science", location: "Lab 301", type: "lab" }
    ],
    [tomorrowKey]: [
      { time: "10:00", subject: "English", location: "Room 201", type: "lecture" },
      { time: "13:00", subject: "Computer Science", location: "Lab 301", type: "lab" }
    ],
    [dayAfterKey]: [
      { time: "09:00", subject: "Biology", location: "Lab 102", type: "lab" },
      { time: "15:00", subject: "History", location: "Room 105", type: "lecture" }
    ]
  };
};

const scheduleData = getScheduleData();

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getScheduleForDate = (date: Date | undefined) => {
    if (!date) return [];
    const dateKey = formatDateKey(date);
    return scheduleData[dateKey as keyof typeof scheduleData] || [];
  };

  const selectedSchedule = getScheduleForDate(selectedDate);

  const getTypeColor = (type: string) => {
    return type === 'lecture' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground';
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
                <CalendarDays className="h-4 w-4" />
                Calendar
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Calendar</h1>
          <p className="text-muted-foreground">
            View your daily schedule and upcoming classes
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Schedule for {selectedDate?.toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSchedule.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No classes scheduled for this date
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedSchedule.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="text-sm font-medium text-muted-foreground min-w-[60px]">
                        {item.time}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{item.subject}</h3>
                          <Badge className={getTypeColor(item.type)}>
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </LMSLayout>
  );
}