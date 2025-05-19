
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChartBar,
  CalendarCheck,
  Users,
  QrCode,
  BellRing,
  FileText,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-3 py-2 h-auto text-left",
        active
          ? "bg-gym-blue text-white font-medium"
          : "hover:bg-gray-100 text-gray-700"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", active ? "text-white" : "text-gym-blue")} />
      <span className="truncate">{label}</span>
    </Button>
  );
};

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: ChartBar, id: "dashboard" },
    { label: "Attendance", icon: QrCode, id: "attendance" },
    { label: "Members", icon: Users, id: "members" },
    { label: "Schedule", icon: CalendarCheck, id: "schedule" },
    { label: "Notifications", icon: BellRing, id: "notifications" },
    { label: "Reports", icon: FileText, id: "reports" },
  ];

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-white border-r border-gray-200 transition-all",
        collapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h2 className="font-bold text-lg text-gym-blue">PowerGym</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ArrowRight className="h-5 w-5" />
          ) : (
            <ArrowLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-3 overflow-y-auto flex-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={collapsed ? "" : item.label}
            active={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gym-blue flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-gray-500">admin@powergym.com</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gym-blue flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
