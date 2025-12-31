import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, Clock, ArrowRight, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface RiskItem {
  id: string;
  type: "attendance" | "assignment" | "grade";
  subject: string;
  currentState: string;
  prediction: string;
  consequence: string;
  recoveryAction: string;
  severity: "critical" | "warning";
}

const riskItems: RiskItem[] = [
  {
    id: "1",
    type: "attendance",
    subject: "Computer Networks",
    currentState: "68% attendance",
    prediction: "If you miss the next class, you drop to 65%",
    consequence: "Below 65% = Ineligible for final exam",
    recoveryAction: "Attend next 4 classes consecutively",
    severity: "critical",
  },
  {
    id: "2",
    type: "attendance",
    subject: "Operating Systems",
    currentState: "72% attendance",
    prediction: "2 more absences will drop you below 70%",
    consequence: "Risk of deregistration from course",
    recoveryAction: "Attend next 3 classes",
    severity: "warning",
  },
  {
    id: "3",
    type: "assignment",
    subject: "CS Project",
    currentState: "Due in 18 hours",
    prediction: "No submission detected",
    consequence: "0 marks if not submitted. Worth 15% of grade.",
    recoveryAction: "Submit before deadline",
    severity: "critical",
  },
];

export function RiskAlerts() {
  const criticalRisks = riskItems.filter(r => r.severity === "critical");
  const warningRisks = riskItems.filter(r => r.severity === "warning");

  if (riskItems.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Critical Risks */}
      {criticalRisks.length > 0 && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-destructive/20">
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
              <h3 className="font-semibold text-destructive text-sm uppercase tracking-wide">
                Critical Risks ({criticalRisks.length})
              </h3>
            </div>
            
            <div className="space-y-3">
              {criticalRisks.map((risk) => (
                <div key={risk.id} className="p-3 rounded-lg bg-background border border-destructive/20">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{risk.subject}</span>
                        <span className="text-xs text-destructive font-medium">{risk.currentState}</span>
                      </div>
                      <p className="text-sm text-foreground mb-1">{risk.prediction}</p>
                      <p className="text-xs text-destructive font-medium">{risk.consequence}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Recovery: <span className="text-foreground font-medium">{risk.recoveryAction}</span>
                    </span>
                    <Link to={risk.type === "attendance" ? "/attendance" : "/assignments"}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
                        Take Action <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Warning Risks */}
      {warningRisks.length > 0 && (
        <Card className="border-warning/40 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-warning/20">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <h3 className="font-semibold text-warning text-sm uppercase tracking-wide">
                Watch List ({warningRisks.length})
              </h3>
            </div>
            
            <div className="space-y-2">
              {warningRisks.map((risk) => (
                <div key={risk.id} className="p-3 rounded-lg bg-background border border-warning/20">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{risk.subject}</span>
                        <span className="text-xs text-warning font-medium">{risk.currentState}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{risk.prediction}</p>
                    </div>
                    <Link to={risk.type === "attendance" ? "/attendance" : "/assignments"}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
