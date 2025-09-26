import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const clubEvents = [
  {
    id: 1,
    title: "Tech Club Workshop: React Best Practices",
    description: "Learn advanced React patterns and best practices from industry experts.",
    date: "2024-03-25",
    time: "2:00 PM - 4:00 PM",
    location: "Computer Lab A",
    organizer: "Tech Club",
    attendees: 45,
    category: "Workshop",
    priority: "high"
  },
  {
    id: 2,
    title: "Science Fair 2024",
    description: "Annual science fair showcasing innovative student projects across all departments.",
    date: "2024-03-28",
    time: "10:00 AM - 5:00 PM",
    location: "Main Auditorium",
    organizer: "Science Club",
    attendees: 120,
    category: "Competition",
    priority: "medium"
  },
  {
    id: 3,
    title: "Cultural Night: International Food Festival",
    description: "Celebrate diversity with food, music, and cultural performances from around the world.",
    date: "2024-03-30",
    time: "6:00 PM - 9:00 PM",
    location: "Student Center",
    organizer: "Cultural Club",
    attendees: 200,
    category: "Cultural",
    priority: "high"
  },
  {
    id: 4,
    title: "Photography Workshop: Portrait Techniques",
    description: "Master the art of portrait photography with professional equipment and guidance.",
    date: "2024-04-02",
    time: "1:00 PM - 3:00 PM",
    location: "Art Studio",
    organizer: "Photography Club",
    attendees: 25,
    category: "Workshop",
    priority: "low"
  },
  {
    id: 5,
    title: "Hackathon 2024: Build for Social Good",
    description: "48-hour coding challenge to create applications that make a positive social impact.",
    date: "2024-04-05",
    time: "9:00 AM - 9:00 AM (2 days)",
    location: "Innovation Lab",
    organizer: "Coding Club",
    attendees: 80,
    category: "Competition",
    priority: "high"
  },
  {
    id: 6,
    title: "Book Club Discussion: The Future of AI",
    description: "Monthly book discussion focusing on artificial intelligence and its societal implications.",
    date: "2024-04-08",
    time: "4:00 PM - 5:30 PM",
    location: "Library Conference Room",
    organizer: "Book Club",
    attendees: 15,
    category: "Discussion",
    priority: "medium"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-destructive text-destructive-foreground";
    case "medium": return "bg-warning text-warning-foreground";
    case "low": return "bg-muted text-muted-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Workshop": return "bg-primary text-primary-foreground";
    case "Competition": return "bg-accent text-accent-foreground";
    case "Cultural": return "bg-secondary text-secondary-foreground";
    case "Discussion": return "bg-muted text-muted-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

export default function Notifications() {
  return (
    <LMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-2">Stay updated with upcoming club events and activities</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Club Events
              </CardTitle>
              <CardDescription>
                Don't miss out on exciting club activities and events happening on campus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {clubEvents.map((event) => (
                <Card key={event.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(event.priority)}>
                          {event.priority}
                        </Badge>
                        <Badge variant="outline" className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        Organized by <span className="font-medium text-foreground">{event.organizer}</span>
                      </span>
                      <div className="flex gap-2">
                        <button className="text-sm text-primary hover:text-primary-hover font-medium">
                          Learn More
                        </button>
                        <button className="text-sm bg-primary text-primary-foreground hover:bg-primary-hover px-3 py-1 rounded-md">
                          RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </LMSLayout>
  );
}