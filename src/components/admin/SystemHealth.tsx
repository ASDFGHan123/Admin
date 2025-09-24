import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Wifi, HardDrive } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const systemMetrics = [
  {
    title: "CPU Usage",
    value: 45,
    status: "healthy",
    icon: Server,
  },
  {
    title: "Memory Usage",
    value: 67,
    status: "warning",
    icon: HardDrive,
  },
  {
    title: "Database Load",
    value: 23,
    status: "healthy",
    icon: Database,
  },
  {
    title: "Network I/O",
    value: 34,
    status: "healthy",
    icon: Wifi,
  },
];

const performanceData = [
  { time: "00:00", cpu: 23, memory: 45, network: 12 },
  { time: "04:00", cpu: 19, memory: 38, network: 8 },
  { time: "08:00", cpu: 45, memory: 67, network: 34 },
  { time: "12:00", cpu: 67, memory: 78, network: 45 },
  { time: "16:00", cpu: 56, memory: 69, network: 38 },
  { time: "20:00", cpu: 34, memory: 52, network: 23 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'text-admin-success';
    case 'warning':
      return 'text-admin-warning';
    case 'critical':
      return 'text-admin-error';
    default:
      return 'text-muted-foreground';
  }
};

const getProgressColor = (value: number) => {
  if (value > 80) return 'bg-admin-error';
  if (value > 60) return 'bg-admin-warning';
  return 'bg-admin-success';
};

interface SystemHealthProps {
  detailed?: boolean;
}

export const SystemHealth = ({ detailed = false }: SystemHealthProps) => {
  if (detailed) {
    return (
      <div className="space-y-6">
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metric.value}%</div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
                <Badge 
                  variant="outline" 
                  className={`mt-2 ${getStatusColor(metric.status)}`}
                >
                  {metric.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Chart */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>System Performance (24h)</CardTitle>
            <CardDescription>Real-time system resource monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="hsl(var(--admin-primary))" 
                  strokeWidth={2}
                  name="CPU %"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="hsl(var(--admin-warning))" 
                  strokeWidth={2}
                  name="Memory %"
                />
                <Line 
                  type="monotone" 
                  dataKey="network" 
                  stroke="hsl(var(--admin-success))" 
                  strokeWidth={2}
                  name="Network %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-admin-success/10 border border-admin-success/30">
                <div className="w-3 h-3 bg-admin-success rounded-full animate-pulse" />
                <div>
                  <p className="font-medium text-foreground">Database</p>
                  <p className="text-sm text-admin-success">Operational</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-admin-success/10 border border-admin-success/30">
                <div className="w-3 h-3 bg-admin-success rounded-full animate-pulse" />
                <div>
                  <p className="font-medium text-foreground">Message Queue</p>
                  <p className="text-sm text-admin-success">Processing</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-admin-warning/10 border border-admin-warning/30">
                <div className="w-3 h-3 bg-admin-warning rounded-full animate-pulse" />
                <div>
                  <p className="font-medium text-foreground">File Storage</p>
                  <p className="text-sm text-admin-warning">High Usage</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>Current system performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <metric.icon className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
                <span className="text-sm font-medium">{metric.title}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20">
                  <Progress value={metric.value} className="h-2" />
                </div>
                <span className="text-sm text-muted-foreground w-8">{metric.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};