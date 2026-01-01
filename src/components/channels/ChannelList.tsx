import { useState } from "react";
import { Search, Megaphone, Users, GraduationCap, Building, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Channel {
  id: string;
  name: string;
  type: "official" | "unofficial";
  category: "college" | "department" | "exam" | "class" | "club" | "study";
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  memberCount: number;
  icon: "megaphone" | "building" | "graduation" | "users" | "book";
}

interface ChannelListProps {
  channels: Channel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const iconMap = {
  megaphone: Megaphone,
  building: Building,
  graduation: GraduationCap,
  users: Users,
  book: BookOpen,
};

const categoryColors = {
  college: "bg-primary",
  department: "bg-accent",
  exam: "bg-destructive",
  class: "bg-warning",
  club: "bg-purple-500",
  study: "bg-blue-400",
};

export function ChannelList({ channels, selectedId, onSelect }: ChannelListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "official" && channel.type === "official") ||
      (activeTab === "unofficial" && channel.type === "unofficial");
    return matchesSearch && matchesTab;
  });

  const officialChannels = filteredChannels.filter((c) => c.type === "official");
  const unofficialChannels = filteredChannels.filter((c) => c.type === "unofficial");

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground mb-3">Channels</h2>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search channels"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary border-0"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="official">Official</TabsTrigger>
            <TabsTrigger value="unofficial">Groups</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Channel List */}
      <ScrollArea className="flex-1">
        {activeTab === "all" || activeTab === "official" ? (
          officialChannels.length > 0 && (
            <div className="py-2">
              {activeTab === "all" && (
                <div className="px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Official Channels
                  </span>
                </div>
              )}
              <div className="divide-y divide-border">
                {officialChannels.map((channel) => {
                  const IconComponent = iconMap[channel.icon];
                  return (
                    <div
                      key={channel.id}
                      onClick={() => onSelect(channel.id)}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-secondary/50 ${
                        selectedId === channel.id ? "bg-secondary" : ""
                      }`}
                    >
                      <Avatar className={`h-12 w-12 ${categoryColors[channel.category]}`}>
                        <AvatarFallback className="bg-transparent text-white">
                          <IconComponent className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground truncate">{channel.name}</h3>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              Official
                            </Badge>
                          </div>
                          <span className={`text-xs ${channel.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                            {channel.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-sm text-muted-foreground truncate pr-2">{channel.lastMessage}</p>
                          {channel.unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground h-5 min-w-[20px] flex items-center justify-center text-xs rounded-full">
                              {channel.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ) : null}

        {activeTab === "all" || activeTab === "unofficial" ? (
          unofficialChannels.length > 0 && (
            <div className="py-2">
              {activeTab === "all" && (
                <div className="px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Groups
                  </span>
                </div>
              )}
              <div className="divide-y divide-border">
                {unofficialChannels.map((channel) => {
                  const IconComponent = iconMap[channel.icon];
                  return (
                    <div
                      key={channel.id}
                      onClick={() => onSelect(channel.id)}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-secondary/50 ${
                        selectedId === channel.id ? "bg-secondary" : ""
                      }`}
                    >
                      <Avatar className={`h-12 w-12 ${categoryColors[channel.category]}`}>
                        <AvatarFallback className="bg-transparent text-white">
                          <IconComponent className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground truncate">{channel.name}</h3>
                          <span className={`text-xs ${channel.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                            {channel.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-sm text-muted-foreground truncate pr-2">{channel.lastMessage}</p>
                          {channel.unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground h-5 min-w-[20px] flex items-center justify-center text-xs rounded-full">
                              {channel.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ) : null}
      </ScrollArea>
    </div>
  );
}
