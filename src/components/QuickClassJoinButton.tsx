import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LiveClass {
  id: number;
  subject: string;
  time: string;
}

export function QuickClassJoinButton() {
  const [liveClass, setLiveClass] = useState<LiveClass | null>(null);

  useEffect(() => {
    // Simulate checking for live classes
    // In a real app, this would check the current time against the schedule
    const checkLiveClasses = () => {
      const currentHour = new Date().getHours();
      
      // Example: If it's between 11 AM and 12:30 PM, show Physics class
      if (currentHour >= 11 && currentHour < 13) {
        setLiveClass({
          id: 2,
          subject: "Physics Lab Session",
          time: "11:00 - 12:30",
        });
      } else {
        setLiveClass(null);
      }
    };

    checkLiveClasses();
    const interval = setInterval(checkLiveClasses, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  if (!liveClass) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 z-50 animate-pulse"
            onClick={() => {
              // Handle join class action
              console.log("Joining class:", liveClass.subject);
            }}
          >
            <Video className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">Join Live Class</p>
            <p className="text-sm text-muted-foreground">
              {liveClass.subject}
            </p>
            <p className="text-xs text-muted-foreground">{liveClass.time}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
