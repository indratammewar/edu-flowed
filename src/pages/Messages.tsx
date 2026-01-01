import { useState } from "react";
import { LMSLayout } from "@/components/LMSLayout";
import { ConversationList } from "@/components/messages/ConversationList";
import { ChatView } from "@/components/messages/ChatView";
import { useTheme } from "@/components/ThemeProvider";

// Mock data for conversations
const mockConversations = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    avatar: "",
    lastMessage: "Your assignment looks great!",
    timestamp: "10:30",
    unreadCount: 2,
    online: true,
    role: "faculty" as const,
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    avatar: "",
    lastMessage: "Please submit by Friday",
    timestamp: "09:15",
    unreadCount: 0,
    online: false,
    role: "faculty" as const,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    avatar: "",
    lastMessage: "Lab session rescheduled to Room 205",
    timestamp: "Yesterday",
    unreadCount: 1,
    online: true,
    role: "faculty" as const,
  },
  {
    id: "4",
    name: "Prof. David Williams",
    avatar: "",
    lastMessage: "See you in class tomorrow",
    timestamp: "Yesterday",
    unreadCount: 0,
    online: false,
    role: "faculty" as const,
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    avatar: "",
    lastMessage: "Great progress on your project!",
    timestamp: "Mon",
    unreadCount: 0,
    online: true,
    role: "faculty" as const,
  },
  {
    id: "6",
    name: "Rahul Sharma",
    avatar: "",
    lastMessage: "Did you complete the notes?",
    timestamp: "Mon",
    unreadCount: 3,
    online: true,
    role: "student" as const,
  },
  {
    id: "7",
    name: "Priya Patel",
    avatar: "",
    lastMessage: "Thanks for the help!",
    timestamp: "Sun",
    unreadCount: 0,
    online: false,
    role: "student" as const,
  },
];

// Mock messages for each conversation
const mockMessages: Record<string, Array<{
  id: string;
  content: string;
  timestamp: string;
  sender: "me" | "them";
  status: "sent" | "delivered" | "read";
}>> = {
  "1": [
    { id: "1", content: "Hello Dr. Johnson, I have a question about the assignment.", timestamp: "09:30", sender: "me", status: "read" },
    { id: "2", content: "Of course! What would you like to know?", timestamp: "09:32", sender: "them", status: "read" },
    { id: "3", content: "I'm confused about problem 5. Could you explain the approach?", timestamp: "09:35", sender: "me", status: "read" },
    { id: "4", content: "Sure! For problem 5, you need to apply the chain rule first, then simplify.", timestamp: "09:40", sender: "them", status: "read" },
    { id: "5", content: "Let me know if you need more help.", timestamp: "09:41", sender: "them", status: "read" },
    { id: "6", content: "Thank you! That makes sense now.", timestamp: "10:00", sender: "me", status: "read" },
    { id: "7", content: "Your assignment looks great!", timestamp: "10:30", sender: "them", status: "read" },
  ],
  "2": [
    { id: "1", content: "Good morning Professor Chen!", timestamp: "08:00", sender: "me", status: "read" },
    { id: "2", content: "Good morning! How can I help?", timestamp: "08:15", sender: "them", status: "read" },
    { id: "3", content: "When is the physics lab report due?", timestamp: "08:20", sender: "me", status: "read" },
    { id: "4", content: "Please submit by Friday", timestamp: "09:15", sender: "them", status: "read" },
  ],
  "3": [
    { id: "1", content: "Lab session rescheduled to Room 205", timestamp: "14:00", sender: "them", status: "read" },
  ],
  "6": [
    { id: "1", content: "Hey, are you coming to the study session?", timestamp: "18:00", sender: "them", status: "read" },
    { id: "2", content: "Yes, I'll be there at 6!", timestamp: "18:05", sender: "me", status: "read" },
    { id: "3", content: "Did you complete the notes?", timestamp: "19:00", sender: "them", status: "delivered" },
  ],
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const { readingMode } = useTheme();

  const selectedContact = selectedConversation
    ? mockConversations.find((c) => c.id === selectedConversation)
    : null;

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;

    const newMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me" as const,
      status: "sent" as const,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessage],
    }));

    // Update last message in conversation list
    // In real app, this would sync with backend
  };

  const handleBack = () => {
    setSelectedConversation(null);
  };

  return (
    <LMSLayout hideHeader hidePadding>
      <div className={`h-[calc(100vh-4rem)] md:h-screen flex ${readingMode ? "reading-mode-content" : ""}`}>
        {/* Conversation List - Hidden on mobile when chat is open */}
        <div className={`w-full md:w-80 lg:w-96 shrink-0 ${selectedConversation ? "hidden md:flex" : "flex"} flex-col`}>
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
        </div>

        {/* Chat View - Full screen on mobile when open */}
        <div className={`flex-1 ${!selectedConversation ? "hidden md:flex" : "flex"}`}>
          <ChatView
            contact={selectedContact ? {
              ...selectedContact,
              lastSeen: selectedContact.online ? undefined : "today at 9:30 AM",
            } : null}
            messages={selectedConversation ? messages[selectedConversation] || [] : []}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            showBackButton={true}
          />
        </div>
      </div>
    </LMSLayout>
  );
}
