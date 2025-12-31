import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, ArrowRight, Video, FileText } from "lucide-react";

interface PrimaryActionProps {
  action: {
    type: "class" | "assignment" | "attendance";
    title: string;
    urgency: "critical" | "warning" | "moderate";
    timeLeft: string;
    consequence: string;
    actionLabel: string;
    onAction: () => void;
  };
}

export function PrimaryAction({ action }: PrimaryActionProps) {
  const urgencyStyles = {
    critical: {
      bg: "bg-destructive/10 border-destructive/30",
      icon: "bg-destructive text-destructive-foreground",
      text: "text-destructive",
      button: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
    },
    warning: {
      bg: "bg-warning/10 border-warning/30",
      icon: "bg-warning text-warning-foreground",
      text: "text-warning",
      button: "bg-warning hover:bg-warning/90 text-warning-foreground",
    },
    moderate: {
      bg: "bg-primary/10 border-primary/30",
      icon: "bg-primary text-primary-foreground",
      text: "text-primary",
      button: "bg-primary hover:bg-primary/90 text-primary-foreground",
    },
  };

  const styles = urgencyStyles[action.urgency];
  const Icon = action.type === "class" ? Video : action.type === "assignment" ? FileText : AlertTriangle;

  return (
    <Card className={`${styles.bg} border shadow-sm`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${styles.icon} shrink-0`}>
            <Icon className="h-6 w-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold uppercase tracking-wide ${styles.text}`}>
                {action.urgency === "critical" ? "Action Required Now" : 
                 action.urgency === "warning" ? "Action Needed Soon" : "Upcoming Action"}
              </span>
            </div>
            
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {action.title}
            </h2>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{action.timeLeft}</span>
            </div>
            
            <p className={`text-sm ${action.urgency === "critical" ? "text-destructive" : "text-muted-foreground"}`}>
              {action.consequence}
            </p>
          </div>
          
          <Button 
            onClick={action.onAction}
            className={`${styles.button} shrink-0 gap-2`}
          >
            {action.actionLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Default primary action based on current priorities
export function DashboardPrimaryAction() {
  // This would be dynamic based on actual data
  // Priority: 1. Ongoing class to join, 2. Assignment due within 24h, 3. Low attendance subject class today
  
  const primaryAction = {
    type: "assignment" as const,
    title: "Submit: English Essay on Hamlet",
    urgency: "critical" as const,
    timeLeft: "Due in 4 hours",
    consequence: "Late submissions receive 10% penalty per day. After 3 days, submission closes.",
    actionLabel: "Submit Now",
    onAction: () => {
      window.location.href = "/assignments";
    },
  };

  return <PrimaryAction action={primaryAction} />;
}
