
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, CalendarPlus, Users } from "lucide-react";

// Mock schedule data
const classes = [
  {
    id: "C001",
    title: "Morning Yoga",
    trainer: "Lisa Johnson",
    time: "06:00 - 07:00",
    day: "Monday",
    capacity: 15,
    enrolled: 12,
    location: "Studio 1",
    level: "All Levels",
  },
  {
    id: "C002",
    title: "CrossFit Challenge",
    trainer: "Mike Strong",
    time: "07:30 - 08:30",
    day: "Monday",
    capacity: 10,
    enrolled: 10,
    location: "Main Floor",
    level: "Advanced",
  },
  {
    id: "C003",
    title: "Pilates",
    trainer: "Sarah Williams",
    time: "09:00 - 10:00",
    day: "Monday",
    capacity: 12,
    enrolled: 8,
    location: "Studio 2",
    level: "Intermediate",
  },
  {
    id: "C004",
    title: "HIIT Workout",
    trainer: "David Rodriguez",
    time: "17:00 - 18:00",
    day: "Monday",
    capacity: 15,
    enrolled: 14,
    location: "Main Floor",
    level: "Intermediate",
  },
  {
    id: "C005",
    title: "Spinning Class",
    trainer: "Emma Turner",
    time: "18:30 - 19:30",
    day: "Monday",
    capacity: 20,
    enrolled: 15,
    location: "Spin Studio",
    level: "All Levels",
  },
  {
    id: "C006",
    title: "Power Yoga",
    trainer: "Lisa Johnson",
    time: "06:00 - 07:00",
    day: "Tuesday",
    capacity: 15,
    enrolled: 10,
    location: "Studio 1",
    level: "Intermediate",
  },
  {
    id: "C007",
    title: "Boot Camp",
    trainer: "Mike Strong",
    time: "07:30 - 08:30",
    day: "Tuesday",
    capacity: 12,
    enrolled: 8,
    location: "Outdoor Area",
    level: "Advanced",
  },
  {
    id: "C008",
    title: "Senior Fitness",
    trainer: "Sarah Williams",
    time: "10:00 - 11:00",
    day: "Tuesday",
    capacity: 15,
    enrolled: 10,
    location: "Studio 2",
    level: "Beginner",
  },
  {
    id: "C009",
    title: "Boxing Fundamentals",
    trainer: "David Rodriguez",
    time: "17:00 - 18:00",
    day: "Tuesday",
    capacity: 12,
    enrolled: 9,
    location: "Boxing Area",
    level: "All Levels",
  },
  {
    id: "C010",
    title: "Zumba",
    trainer: "Emma Turner",
    time: "18:30 - 19:30",
    day: "Tuesday",
    capacity: 20,
    enrolled: 18,
    location: "Studio 1",
    level: "All Levels",
  },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SchedulePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState("Monday");
  
  const filteredClasses = classes.filter(cls => cls.day === activeDay);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Class Schedule</h1>
        <Button className="gym-gradient-blue gap-1">
          <CalendarPlus className="h-5 w-5" />
          <span>Add New Class</span>
        </Button>
      </div>

      <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="w-full">
        <TabsList className="grid grid-cols-7 w-full">
          {daysOfWeek.map(day => (
            <TabsTrigger key={day} value={day} className="text-xs sm:text-sm whitespace-nowrap">
              {day}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {daysOfWeek.map(day => (
          <TabsContent key={day} value={day}>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {day}'s Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {filteredClasses.length > 0 ? (
                      filteredClasses.map((cls) => (
                        <Card key={cls.id} className="card-hover">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                                  {cls.title.substring(0, 2)}
                                </div>
                                <div>
                                  <h3 className="font-medium text-lg">{cls.title}</h3>
                                  <p className="text-sm text-muted-foreground">Instructor: {cls.trainer}</p>
                                </div>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <Badge variant="outline" className="bg-primary text-primary-foreground">
                                  {cls.time}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-medium">{cls.location}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Level</p>
                                <p className="font-medium">{cls.level}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Capacity</p>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span className="font-medium">{cls.enrolled}/{cls.capacity}</span>
                                  {cls.enrolled === cls.capacity && (
                                    <Badge className="bg-red-500">Full</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button 
                                disabled={cls.enrolled === cls.capacity}
                                className={cls.enrolled === cls.capacity ? "bg-gray-400" : "bg-primary"}
                              >
                                Book Class
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium">No Classes Scheduled</p>
                        <p className="text-muted-foreground">There are no classes scheduled for {day}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SchedulePage;
