import { Users, MessageSquare, Activity, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+8.2%",
    icon: Users,
    color: "admin-primary",
  },
  {
    title: "Active Conversations",
    value: "3,456",
    change: "+12.5%",
    icon: MessageSquare,
    color: "admin-secondary",
  },
  {
    title: "Messages Today",
    value: "89,234",
    change: "+23.1%",
    icon: Activity,
    color: "admin-warning",
  },
  {
    title: "Online Users",
    value: "2,847",
    change: "-2.4%",
    icon: Shield,
    color: "admin-success",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground/70">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg bg-${stat.color}/20`}>
              <stat.icon className={`w-4 h-4 text-${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <p className={`text-xs ${
              stat.change.startsWith('+') ? 'text-admin-success' : 'text-admin-error'
            }`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};