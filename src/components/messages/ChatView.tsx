import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, MoreVertical, Phone, Video, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "me" | "them";
  status: "sent" | "delivered" | "read";
}

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
  role: string;
}

interface ChatViewProps {
  contact: ChatContact | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChatView({ contact, messages, onSendMessage, onBack, showBackButton = false }: ChatViewProps) {
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <span className="text-muted-foreground">✓</span>;
      case "delivered":
        return <span className="text-muted-foreground">✓✓</span>;
      case "read":
        return <span className="text-primary">✓✓</span>;
    }
  };

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-secondary/30">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Send className="h-10 w-10 text-primary/50" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">EduFlow Messages</h3>
          <p className="text-muted-foreground max-w-sm">
            Select a conversation to start messaging with faculty or classmates
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-3 border-b border-border bg-card">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {contact.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{contact.name}</h3>
          <p className="text-xs text-muted-foreground">
            {contact.online ? "online" : contact.lastSeen ? `last seen ${contact.lastSeen}` : "offline"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {/* Date separator */}
          <div className="flex justify-center my-4">
            <span className="px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground">
              TODAY
            </span>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 ${
                  message.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card text-foreground rounded-bl-sm border border-border"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${
                  message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  <span className="text-[10px]">{message.timestamp}</span>
                  {message.sender === "me" && (
                    <span className="text-[10px]">{getStatusIcon(message.status)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-secondary border-0"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!messageText.trim()}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
