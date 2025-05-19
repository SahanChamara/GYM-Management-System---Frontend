
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, CheckCircle, Clock, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock notification data
const mockNotifications = [
  {
    id: "n1",
    title: "Payment Due Reminder",
    message: "Your monthly membership payment of $49.99 is due in 3 days.",
    time: "10 minutes ago",
    read: false,
    type: "payment",
    priority: "high",
  },
  {
    id: "n2",
    title: "New Class Added",
    message: "A new 'Power Yoga' class has been added on Thursdays at 7:00 PM.",
    time: "1 hour ago",
    read: false,
    type: "class",
    priority: "medium",
  },
  {
    id: "n3",
    title: "Personal Trainer Session",
    message: "Reminder: You have a session with trainer Mike Strong tomorrow at 5:30 PM.",
    time: "3 hours ago",
    read: true,
    type: "trainer",
    priority: "high",
  },
  {
    id: "n4",
    title: "Membership Renewal",
    message: "Your membership expires in 7 days. Renew now to avoid interruption.",
    time: "1 day ago",
    read: false,
    type: "payment",
    priority: "high",
  },
  {
    id: "n5",
    title: "Gym Holiday Hours",
    message: "The gym will have special hours during the upcoming holiday weekend.",
    time: "2 days ago",
    read: true,
    type: "announcement",
    priority: "medium",
  },
  {
    id: "n6",
    title: "Locker Renewal",
    message: "Your locker rental expires next week. Please renew at the front desk.",
    time: "3 days ago",
    read: true,
    type: "payment",
    priority: "low",
  },
  {
    id: "n7",
    title: "New Promotion",
    message: "Bring a friend for free this weekend! Special promotion for all members.",
    time: "4 days ago",
    read: true,
    type: "announcement",
    priority: "medium",
  },
  {
    id: "n8",
    title: "Survey Feedback",
    message: "We value your opinion. Please take a moment to complete our gym satisfaction survey.",
    time: "5 days ago",
    read: true,
    type: "announcement",
    priority: "low",
  },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "low":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case "payment":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "class":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "trainer":
        return <Clock className="h-5 w-5 text-green-500" />;
      case "announcement":
        return <BellRing className="h-5 w-5 text-yellow-500" />;
      default:
        return <BellRing className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-red-500">{unreadCount} New</Badge>
          )}
        </div>
        <Button 
          variant="outline"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle className="flex items-center">
            <BellRing className="mr-2 h-5 w-5" />
            Your Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="class">Classes</TabsTrigger>
              <TabsTrigger value="announcement" className="hidden md:block">Announcements</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <Card 
                        key={notification.id} 
                        className={cn(
                          "card-hover transition-all",
                          !notification.read && "border-l-4 border-l-primary"
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {getTypeIcon(notification.type)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{notification.title}</h3>
                                  <Badge className={getPriorityColor(notification.priority)}>
                                    {notification.priority}
                                  </Badge>
                                  {!notification.read && (
                                    <Badge className="bg-primary">New</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {!notification.read && (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => removeNotification(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <BellRing className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-lg font-medium">No Notifications</p>
                      <p className="text-muted-foreground">
                        {activeTab === "all" 
                          ? "You don't have any notifications at the moment." 
                          : `You don't have any ${activeTab} notifications.`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
