
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  gradient,
}) => {
  return (
    <Card className="border-none shadow-md">
      <CardContent className={cn("p-6", gradient)}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <div className="flex items-center mt-2">
                <div
                  className={cn(
                    "flex items-center text-xs px-1.5 py-0.5 rounded-full",
                    change.trend === "up"
                      ? "bg-white/20 text-white"
                      : change.trend === "down"
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/80"
                  )}
                >
                  {change.trend === "up" ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : change.trend === "down" ? (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  ) : null}
                  {change.value}
                </div>
                <span className="text-xs ml-1 text-white/80">vs last month</span>
              </div>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserStats: React.FC = () => {
  const stats = [
    {
      title: "Total Members",
      value: "247",
      icon: Users,
      change: { value: "12%", trend: "up" as const },
      gradient: "gym-gradient-blue"
    },
    {
      title: "Active Today",
      value: "42",
      icon: User,
      change: { value: "8%", trend: "up" as const },
      gradient: "gym-gradient-green"
    },
    {
      title: "New This Month",
      value: "18",
      icon: Calendar,
      change: { value: "5%", trend: "down" as const },
      gradient: "gym-gradient-orange"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default UserStats;
