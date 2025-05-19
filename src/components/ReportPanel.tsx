
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportPanel: React.FC = () => {
  const [reportType, setReportType] = useState("attendance");
  const [reportPeriod, setReportPeriod] = useState("monthly");

  // Mock report generation function
  const handleGenerateReport = () => {
    console.log(`Generating ${reportType} report for ${reportPeriod} period`);
    // In a real application, this would trigger the report generation
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select
                  value={reportType}
                  onValueChange={setReportType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendance">Attendance Report</SelectItem>
                    <SelectItem value="payment">Payment Report</SelectItem>
                    <SelectItem value="membership">Membership Report</SelectItem>
                    <SelectItem value="class">Class Bookings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select
                  value={reportPeriod}
                  onValueChange={setReportPeriod}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Select Range
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full gym-gradient-purple" 
                onClick={handleGenerateReport}
              >
                <FileText className="mr-2 h-5 w-5" />
                Generate Report
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="pt-4">
            <div className="space-y-3">
              {[
                {
                  name: "Monthly Attendance - April 2025",
                  type: "attendance",
                  date: "2025-05-01",
                },
                {
                  name: "Quarterly Payments Summary",
                  type: "payment",
                  date: "2025-04-10",
                },
                {
                  name: "Membership Status Report",
                  type: "membership",
                  date: "2025-04-05",
                },
              ].map((report, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-gray-500">Generated on {report.date}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportPanel;
