import { useState } from "react";
import { LMSLayout } from "@/components/LMSLayout";
import { ChannelList } from "@/components/channels/ChannelList";
import { ChannelView } from "@/components/channels/ChannelView";
import { useTheme } from "@/components/ThemeProvider";

// Mock data for channels
const mockChannels = [
  {
    id: "1",
    name: "College Announcements",
    type: "official" as const,
    category: "college" as const,
    lastMessage: "Semester exam schedule released",
    timestamp: "10:00",
    unreadCount: 3,
    memberCount: 1250,
    icon: "megaphone" as const,
  },
  {
    id: "2",
    name: "CS Department",
    type: "official" as const,
    category: "department" as const,
    lastMessage: "Workshop on AI/ML next week",
    timestamp: "09:30",
    unreadCount: 1,
    memberCount: 450,
    icon: "building" as const,
  },
  {
    id: "3",
    name: "Exam Cell",
    type: "official" as const,
    category: "exam" as const,
    lastMessage: "Hall ticket distribution starts Monday",
    timestamp: "Yesterday",
    unreadCount: 0,
    memberCount: 1250,
    icon: "graduation" as const,
  },
  {
    id: "4",
    name: "CSE-A 2024",
    type: "unofficial" as const,
    category: "class" as const,
    lastMessage: "Anyone has the notes for DBMS?",
    timestamp: "11:45",
    unreadCount: 15,
    memberCount: 65,
    icon: "users" as const,
  },
  {
    id: "5",
    name: "Coding Club",
    type: "unofficial" as const,
    category: "club" as const,
    lastMessage: "LeetCode contest tonight at 8!",
    timestamp: "Yesterday",
    unreadCount: 5,
    memberCount: 120,
    icon: "users" as const,
  },
  {
    id: "6",
    name: "DSA Study Group",
    type: "unofficial" as const,
    category: "study" as const,
    lastMessage: "Let's practice graphs tomorrow",
    timestamp: "Mon",
    unreadCount: 0,
    memberCount: 28,
    icon: "book" as const,
  },
];

// Mock posts for official channels
const mockPosts: Record<string, Array<{
  id: string;
  content: string;
  timestamp: string;
  author: string;
  authorRole: string;
  isAnnouncement?: boolean;
}>> = {
  "1": [
    {
      id: "1",
      content: "Dear Students,\n\nThe semester examination schedule for January 2026 has been released. Please check the academic portal for your individual timetables.\n\nKey dates:\n• Exams begin: January 15, 2026\n• Hall tickets available: January 10, 2026\n• Last date for fee payment: January 8, 2026",
      timestamp: "Today, 10:00 AM",
      author: "Academic Office",
      authorRole: "Admin",
      isAnnouncement: true,
    },
    {
      id: "2",
      content: "Library timings extended during exam period:\n• Regular hours: 8 AM - 10 PM\n• Weekends: 9 AM - 8 PM",
      timestamp: "Yesterday, 3:00 PM",
      author: "Library",
      authorRole: "Staff",
      isAnnouncement: false,
    },
  ],
  "2": [
    {
      id: "1",
      content: "Workshop Announcement: Introduction to AI/ML\n\nDate: January 12, 2026\nTime: 2:00 PM - 5:00 PM\nVenue: Seminar Hall B\n\nRegistration link will be shared soon. Limited seats available!",
      timestamp: "Today, 9:30 AM",
      author: "Dr. Sarah Johnson",
      authorRole: "HOD - CS",
      isAnnouncement: true,
    },
  ],
  "3": [
    {
      id: "1",
      content: "Hall Ticket Distribution:\n\nHall tickets for the upcoming semester examinations will be available for collection from Monday, January 10, 2026.\n\nTiming: 10 AM - 4 PM\nVenue: Exam Cell Office\n\nPlease bring your ID card for verification.",
      timestamp: "Yesterday, 2:00 PM",
      author: "Exam Cell",
      authorRole: "Admin",
      isAnnouncement: true,
    },
  ],
};

// Mock messages for unofficial channels
const mockMessages: Record<string, Array<{
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  isMe: boolean;
}>> = {
  "4": [
    { id: "1", content: "Hey everyone! Ready for the DBMS lab tomorrow?", timestamp: "10:30", sender: "Rahul Sharma", isMe: false },
    { id: "2", content: "Yeah, almost done with the prep", timestamp: "10:32", sender: "Me", isMe: true },
    { id: "3", content: "Anyone has the notes for normalization?", timestamp: "11:00", sender: "Priya Patel", isMe: false },
    { id: "4", content: "I have them, will share in a bit", timestamp: "11:05", sender: "Amit Kumar", isMe: false },
    { id: "5", content: "Thanks Amit! 🙏", timestamp: "11:06", sender: "Priya Patel", isMe: false },
    { id: "6", content: "Anyone has the notes for DBMS?", timestamp: "11:45", sender: "Neha Singh", isMe: false },
  ],
  "5": [
    { id: "1", content: "LeetCode contest tonight at 8! Who's joining?", timestamp: "18:00", sender: "Contest Bot", isMe: false },
    { id: "2", content: "I'm in!", timestamp: "18:05", sender: "Me", isMe: true },
    { id: "3", content: "Count me in too", timestamp: "18:10", sender: "Arjun Reddy", isMe: false },
  ],
  "6": [
    { id: "1", content: "Let's practice graphs tomorrow", timestamp: "15:00", sender: "Study Lead", isMe: false },
    { id: "2", content: "Perfect! I need help with Dijkstra's", timestamp: "15:05", sender: "Me", isMe: true },
  ],
};

export default function ChannelsPage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const { readingMode } = useTheme();

  const selectedChannelData = selectedChannel
    ? mockChannels.find((c) => c.id === selectedChannel)
    : null;

  const handleSendMessage = (content: string) => {
    if (!selectedChannel) return;

    const newMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "Me",
      isMe: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChannel]: [...(prev[selectedChannel] || []), newMessage],
    }));
  };

  const handleBack = () => {
    setSelectedChannel(null);
  };

  return (
    <LMSLayout hideHeader hidePadding>
      <div className={`h-[calc(100vh-4rem)] md:h-screen flex ${readingMode ? "reading-mode-content" : ""}`}>
        {/* Channel List - Hidden on mobile when channel is open */}
        <div className={`w-full md:w-80 lg:w-96 shrink-0 ${selectedChannel ? "hidden md:flex" : "flex"} flex-col`}>
          <ChannelList
            channels={mockChannels}
            selectedId={selectedChannel}
            onSelect={setSelectedChannel}
          />
        </div>

        {/* Channel View - Full screen on mobile when open */}
        <div className={`flex-1 ${!selectedChannel ? "hidden md:flex" : "flex"}`}>
          <ChannelView
            channel={selectedChannelData ? {
              id: selectedChannelData.id,
              name: selectedChannelData.name,
              type: selectedChannelData.type,
              memberCount: selectedChannelData.memberCount,
            } : null}
            posts={selectedChannel && selectedChannelData?.type === "official" ? mockPosts[selectedChannel] || [] : undefined}
            messages={selectedChannel && selectedChannelData?.type === "unofficial" ? messages[selectedChannel] || [] : undefined}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            showBackButton={true}
          />
        </div>
      </div>
    </LMSLayout>
  );
}
