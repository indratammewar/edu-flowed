import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const recentItems = [
  {
    id: 1,
    type: "assignment",
    title: "Mathematics Problem Set 3",
    subject: "Mathematics",
    timestamp: "2 hours ago",
    link: "/assignments",
    icon: FileText,
  },
  {
    id: 2,
    type: "class",
    title: "Physics Lab Session",
    subject: "Physics",
    timestamp: "5 hours ago",
    link: "/classes",
    icon: BookOpen,
  },
  {
    id: 3,
    type: "document",
    title: "Chemistry Notes Chapter 4",
    subject: "Chemistry",
    timestamp: "1 day ago",
    link: "/classes",
    icon: FileText,
  },
  {
    id: 4,
    type: "class",
    title: "English Literature Discussion",
    subject: "English",
    timestamp: "1 day ago",
    link: "/classes",
    icon: BookOpen,
  },
  {
    id: 5,
    type: "assignment",
    title: "Computer Science Project",
    subject: "Computer Science",
    timestamp: "2 days ago",
    link: "/assignments",
    icon: FileText,
  },
];

export function RecentItems() {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recently Accessed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.link}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
              >
                <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.subject} • {item.timestamp}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
