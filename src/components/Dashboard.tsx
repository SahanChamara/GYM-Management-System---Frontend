
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRScanner from "./QRScanner";
import AttendanceLog from "./AttendanceLog";
import PaymentAlert from "./PaymentAlert";
import ReportPanel from "./ReportPanel";
import UserStats from "./UserStats";
import MembersPage from "./MembersPage";
import SchedulePage from "./SchedulePage";
import NotificationsPage from "./NotificationsPage";

interface DashboardProps {
  activeView: string;
}

const Dashboard: React.FC<DashboardProps> = ({ activeView }) => {
  const { toast } = useToast();
  const [showScanner, setShowScanner] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [newAttendance, setNewAttendance] = useState<any>(null);
  const [memberWithDue, setMemberWithDue] = useState<any>(null);

  const handleScanComplete = (memberId: string) => {
    // Simulate a random check for payment due
    const hasDue = Math.random() > 0.5;
    
    if (hasDue) {
      // Member has payment due, show alert
      setMemberWithDue({
        id: memberId,
        name: "John Doe",
        dueAmount: 49.99,
        dueDate: "2025-05-10"
      });
      setShowPaymentAlert(true);
    } else {
      // Member is all good, just log attendance
      const newEntry = {
        id: memberId,
        name: "John Doe",
        time: new Date(),
        status: "checked-in"
      };
      setNewAttendance(newEntry);
      toast({
        title: "Attendance Recorded",
        description: `${memberId} successfully checked in`,
      });
    }
    
    setShowScanner(false);
  };

  const handlePaymentCollected = () => {
    toast({
      title: "Payment Collected",
      description: `Successfully collected ${memberWithDue?.dueAmount.toFixed(2)} from ${memberWithDue?.name}`,
    });
    
    // Also log attendance after payment
    const newEntry = {
      id: memberWithDue?.id,
      name: memberWithDue?.name,
      time: new Date(),
      status: "checked-in"
    };
    setNewAttendance(newEntry);
    setShowPaymentAlert(false);
  };
  
  const handleRemindLater = () => {
    toast({
      title: "Reminder Set",
      description: `Payment reminder for ${memberWithDue?.name} has been scheduled`,
      variant: "default",
    });
    setShowPaymentAlert(false);
  };

  return (
    <div className="p-6">
      {activeView === "dashboard" && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Welcome back, Admin</p>
            </div>
            <Button 
              className="mt-4 md:mt-0 gym-gradient-blue"
              onClick={() => setShowScanner(true)}
            >
              <QrCode className="mr-2 h-5 w-5" />
              Scan Attendance
            </Button>
          </div>
          
          <div className="mb-6">
            <UserStats />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceLog newAttendance={newAttendance} />
            <ReportPanel />
          </div>
        </>
      )}

      {activeView === "attendance" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Attendance</h1>
            <Button 
              className="gym-gradient-blue"
              onClick={() => setShowScanner(true)}
            >
              <QrCode className="mr-2 h-5 w-5" />
              Scan Attendance
            </Button>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {showScanner ? (
              <QRScanner 
                onClose={() => setShowScanner(false)}
                onScanComplete={handleScanComplete}
              />
            ) : (
              <AttendanceLog newAttendance={newAttendance} />
            )}
          </div>
        </div>
      )}

      {activeView === "members" && (
        <MembersPage />
      )}

      {activeView === "schedule" && (
        <SchedulePage />
      )}

      {activeView === "notifications" && (
        <NotificationsPage />
      )}

      {activeView === "reports" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="max-w-2xl mx-auto">
            <ReportPanel />
          </div>
        </div>
      )}

      {/* Payment Alert Dialog */}
      <PaymentAlert
        open={showPaymentAlert}
        onOpenChange={setShowPaymentAlert}
        memberData={memberWithDue}
        onPayNow={handlePaymentCollected}
        onRemindLater={handleRemindLater}
      />
    </div>
  );
};

export default Dashboard;
