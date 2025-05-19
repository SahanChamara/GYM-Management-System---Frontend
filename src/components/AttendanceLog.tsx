
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Clock, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock attendance data
const mockAttendanceData = [
  {
    id: "MEM5421",
    name: "John Doe",
    time: new Date(new Date().setHours(new Date().getHours() - 1)),
    status: "checked-in"
  },
  {
    id: "MEM7834",
    name: "Sarah Smith",
    time: new Date(new Date().setHours(new Date().getHours() - 2)),
    status: "checked-out"
  },
  {
    id: "MEM2345",
    name: "Michael Johnson",
    time: new Date(new Date().setHours(new Date().getHours() - 3)),
    status: "checked-in"
  },
  {
    id: "MEM9876",
    name: "Lisa Brown",
    time: new Date(new Date().setHours(new Date().getHours() - 3.5)),
    status: "checked-out"
  },
  {
    id: "MEM4567",
    name: "David Williams",
    time: new Date(new Date().setHours(new Date().getHours() - 4)),
    status: "checked-in"
  }
];

interface AttendanceLogProps {
  newAttendance?: {
    id: string;
    name: string;
    time: Date;
    status: string;
  };
}

const AttendanceLog: React.FC<AttendanceLogProps> = ({ newAttendance }) => {
  // Combine mock data with new attendance if provided
  const attendanceData = newAttendance 
    ? [newAttendance, ...mockAttendanceData.slice(0, 4)] 
    : mockAttendanceData;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <CalendarCheck className="mr-2 h-5 w-5" />
          Recent Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attendanceData.map((entry, index) => (
            <div 
              key={`${entry.id}-${index}`}
              className={cn(
                "p-3 border rounded-lg flex items-center gap-3",
                index === 0 && newAttendance ? "animate-fade-in border-gym-blue bg-blue-50" : "border-gray-200",
                entry.status === "checked-in" ? "border-l-4 border-l-gym-green" : "border-l-4 border-l-gym-orange"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{entry.name}</p>
                <p className="text-xs text-gray-500">{entry.id}</p>
              </div>
              <div className="text-right flex items-center gap-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {format(entry.time, "h:mm a")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceLog;
