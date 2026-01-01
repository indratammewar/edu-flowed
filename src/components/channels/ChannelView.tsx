import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, MoreVertical, Users, ArrowLeft, Lock, Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ChannelPost {
  id: string;
  content: string;
  timestamp: string;
  author: string;
  authorRole: string;
  isAnnouncement?: boolean;
}

interface ChannelMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  isMe: boolean;
}

interface ChannelDetails {
  id: string;
  name: string;
  type: "official" | "unofficial";
  memberCount: number;
  description?: string;
}

interface ChannelViewProps {
  channel: ChannelDetails | null;
  posts?: ChannelPost[];
  messages?: ChannelMessage[];
  onSendMessage?: (content: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChannelView({ 
  channel, 
  posts = [], 
  messages = [], 
  onSendMessage, 
  onBack, 
  showBackButton = false 
}: ChannelViewProps) {
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [posts, messages]);

  const handleSend = () => {
    if (messageText.trim() && onSendMessage) {
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

  if (!channel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-secondary/30">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Megaphone className="h-10 w-10 text-primary/50" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">EduFlow Channels</h3>
          <p className="text-muted-foreground max-w-sm">
            Select a channel to view announcements and discussions
          </p>
        </div>
      </div>
    );
  }

  const isOfficial = channel.type === "official";

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Channel Header */}
      <div className="flex items-center gap-3 p-3 border-b border-border bg-card">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-10 w-10 bg-primary">
          <AvatarFallback className="bg-transparent text-primary-foreground">
            {isOfficial ? <Megaphone className="h-5 w-5" /> : <Users className="h-5 w-5" />}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground">{channel.name}</h3>
            {isOfficial && (
              <Badge variant="secondary" className="text-[10px]">Official</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {channel.memberCount} members
          </p>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {isOfficial ? (
          // Official Channel - Broadcast Posts
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-lg p-4 border border-border">
                {post.isAnnouncement && (
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className="h-4 w-4 text-primary" />
                    <Badge variant="outline" className="text-primary border-primary">
                      Announcement
                    </Badge>
                  </div>
                )}
                <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {post.author.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{post.author}</span>
                    <span className="text-xs text-muted-foreground">• {post.authorRole}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Unofficial Channel - Chat Messages
          <div className="space-y-3">
            <div className="flex justify-center my-4">
              <span className="px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground">
                TODAY
              </span>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${
                    message.isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card text-foreground rounded-bl-sm border border-border"
                  }`}
                >
                  {!message.isMe && (
                    <p className="text-xs font-medium text-primary mb-1">{message.sender}</p>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <div className={`text-right mt-1 ${
                    message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    <span className="text-[10px]">{message.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input Area - Only for unofficial channels */}
      {isOfficial ? (
        <div className="p-3 border-t border-border bg-secondary/50">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Only admins can post in this channel</span>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
