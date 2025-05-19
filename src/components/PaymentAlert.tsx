
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BellRing } from "lucide-react";

interface PaymentAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberData?: {
    id: string;
    name: string;
    dueAmount: number;
    dueDate: string;
  };
  onPayNow: () => void;
  onRemindLater: () => void;
}

const PaymentAlert: React.FC<PaymentAlertProps> = ({
  open,
  onOpenChange,
  memberData,
  onPayNow,
  onRemindLater,
}) => {
  if (!memberData) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <BellRing className="h-6 w-6 text-gym-orange" />
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Payment Due Alert
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-2">
            <p>
              <span className="font-semibold">{memberData.name}</span> (
              {memberData.id})
            </p>
            <p className="text-gray-600">
              Has an outstanding payment of{" "}
              <span className="font-semibold text-gym-orange">
                ${memberData.dueAmount.toFixed(2)}
              </span>
            </p>
            <p className="text-sm text-gray-500">Due date: {memberData.dueDate}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel
            onClick={onRemindLater}
            className="mt-0 sm:mt-0 w-full"
          >
            Remind Later
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onPayNow}
            className="gym-gradient-orange w-full"
          >
            Collect Payment Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentAlert;
