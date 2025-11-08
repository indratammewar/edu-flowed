import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Keyboard } from "lucide-react";

interface ShortcutsOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortcuts: Array<{
    key: string;
    ctrl?: boolean;
    description: string;
  }>;
}

export function KeyboardShortcutsOverlay({
  open,
  onOpenChange,
  shortcuts,
}: ShortcutsOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these shortcuts to navigate quickly
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
            >
              <span className="text-sm text-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.ctrl && (
                  <Badge variant="outline" className="font-mono">
                    Ctrl
                  </Badge>
                )}
                <Badge variant="outline" className="font-mono">
                  {shortcut.key.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
