import { useState } from "react";
import { LMSLayout } from "@/components/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Search, User, MessageCircle, Clock, Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    email: "sarah.johnson@university.edu",
    status: "online",
    lastSeen: "now"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    subject: "Physics",
    email: "michael.chen@university.edu", 
    status: "offline",
    lastSeen: "2 hours ago"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    subject: "Chemistry",
    email: "emily.rodriguez@university.edu",
    status: "online",
    lastSeen: "5 minutes ago"
  },
  {
    id: 4,
    name: "Prof. David Williams",
    subject: "English",
    email: "david.williams@university.edu",
    status: "offline",
    lastSeen: "1 day ago"
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    subject: "Computer Science",
    email: "lisa.thompson@university.edu",
    status: "online",
    lastSeen: "now"
  }
];

const recentMessages = [
  {
    id: 1,
    facultyId: 1,
    facultyName: "Dr. Sarah Johnson",
    subject: "Mathematics",
    message: "Your recent assignment submission looks great! Just a small correction needed in problem 7.",
    timestamp: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    facultyId: 3,
    facultyName: "Dr. Emily Rodriguez", 
    subject: "Chemistry",
    message: "Lab session tomorrow has been moved to Room 205. Please come prepared with safety goggles.",
    timestamp: "5 hours ago",
    unread: false
  },
  {
    id: 3,
    facultyId: 5,
    facultyName: "Dr. Lisa Thompson",
    subject: "Computer Science", 
    message: "Great progress on your project! Let's schedule a meeting to discuss the final phase.",
    timestamp: "1 day ago",
    unread: false
  }
];

export default function MessagesPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = facultyMembers.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!selectedFaculty || !messageText.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log("Sending message to faculty ID:", selectedFaculty, "Message:", messageText);
    setMessageText("");
    // Show success toast
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-green-500' : 'bg-gray-400';
  };

  return (
    <LMSLayout>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Messages
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Connect with your faculty members and stay updated
          </p>
        </div>

        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose Message</TabsTrigger>
            <TabsTrigger value="recent">Recent Messages ({recentMessages.filter(m => m.unread).length})</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Faculty Directory */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Faculty Directory
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search faculty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredFaculty.map((faculty) => (
                    <div
                      key={faculty.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedFaculty === faculty.id 
                          ? 'bg-primary/10 border-primary' 
                          : 'hover:bg-secondary/50'
                      }`}
                      onClick={() => setSelectedFaculty(faculty.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground">{faculty.name}</h3>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(faculty.status)}`} />
                          </div>
                          <p className="text-sm text-muted-foreground">{faculty.subject}</p>
                          <p className="text-xs text-muted-foreground">Last seen: {faculty.lastSeen}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Message Composer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Compose Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedFaculty ? (
                    <>
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Sending to:</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {facultyMembers.find(f => f.id === selectedFaculty)?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {facultyMembers.find(f => f.id === selectedFaculty)?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {facultyMembers.find(f => f.id === selectedFaculty)?.subject}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Textarea
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={6}
                        className="resize-none"
                      />

                      <Button 
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="w-full"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a faculty member to start messaging</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {recentMessages.map((message) => (
              <Card key={message.id} className={`${message.unread ? 'border-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {message.facultyName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{message.facultyName}</h3>
                          {message.unread && <Badge variant="destructive" className="text-xs">New</Badge>}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {message.timestamp}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{message.subject}</p>
                      <p className="text-sm text-foreground">{message.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </LMSLayout>
  );
}