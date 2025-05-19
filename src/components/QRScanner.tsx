
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Scan, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRScannerProps {
  onClose: () => void;
  onScanComplete: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onClose, onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  
  // Simulate QR scanning
  const handleScan = () => {
    setScanning(true);
    
    // Simulate scan completion after 2 seconds
    setTimeout(() => {
      setScanning(false);
      const mockMemberId = "MEM" + Math.floor(1000 + Math.random() * 9000);
      onScanComplete(mockMemberId);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center">
          <QrCode className="mr-2 h-5 w-5" />
          QR Scanner
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={cn(
              "w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden",
              scanning && "border-2 border-gym-blue"
            )}
          >
            {scanning ? (
              <>
                <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>
                <div className="absolute h-1 bg-gym-blue animate-[scan_2s_ease-in-out_infinite]"></div>
                <p className="text-gray-500 animate-pulse">Scanning...</p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <QrCode className="h-24 w-24 text-gray-400" />
                <p className="text-gray-500 mt-2">Position QR code in frame</p>
              </div>
            )}
          </div>
          
          <Button 
            className="w-full gym-gradient-blue" 
            onClick={handleScan}
            disabled={scanning}
          >
            <Scan className="mr-2 h-5 w-5" />
            {scanning ? "Scanning..." : "Scan QR Code"}
          </Button>
          
          <p className="text-sm text-gray-500">
            Please ensure adequate lighting and position the QR code properly within the frame for accurate scanning.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
