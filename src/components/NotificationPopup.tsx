import { useState } from "react";
import { X, Calendar, Clock, MapPin, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const upcomingEvents = [
  {
    id: 1,
    title: "Mathematics Quiz",
    type: "assessment",
    date: "2024-01-18",
    time: "10:00 AM",
    location: "Room 101",
    description: "Chapter 4-5 covering derivatives and integrals"
  },
  {
    id: 2,
    title: "Physics Lab Session", 
    type: "lab",
    date: "2024-01-19",
    time: "2:00 PM",
    location: "Lab 205",
    description: "Pendulum experiment and data collection"
  },
  {
    id: 3,
    title: "English Essay Submission",
    type: "assignment",
    date: "2024-01-20",
    time: "11:59 PM",
    location: "Online Portal",
    description: "Critical analysis of Hamlet - 1500 words"
  },
  {
    id: 4,
    title: "Chemistry Seminar",
    type: "seminar",
    date: "2024-01-22",
    time: "3:00 PM", 
    location: "Auditorium A",
    description: "Guest lecture on Organic Chemistry applications"
  },
  {
    id: 5,
    title: "Mid-term Exams Begin",
    type: "exam",
    date: "2024-01-25",
    time: "9:00 AM",
    location: "Various Rooms",
    description: "Two week examination period starts"
  }
];

export function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  if (!isOpen) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assessment': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'lab': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assignment': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'seminar': return 'bg-green-100 text-green-800 border-green-200';
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assessment': return '📝';
      case 'lab': return '🔬';
      case 'assignment': return '📄';
      case 'seminar': return '🎤';
      case 'exam': return '📊';
      default: return '📅';
    }
  };

  const getDaysFromNow = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return `${Math.ceil(diffDays / 7)} week(s)`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] bg-background border shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Upcoming Events
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] px-6 pb-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getTypeIcon(event.type)}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-foreground leading-tight">
                          {event.title}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getTypeColor(event.type)} ml-2`}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span className="text-primary font-medium ml-1">
                            ({getDaysFromNow(event.date)})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}