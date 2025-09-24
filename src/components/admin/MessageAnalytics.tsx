import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const messageData = [
  { time: "00:00", messages: 1200 },
  { time: "04:00", messages: 800 },
  { time: "08:00", messages: 2400 },
  { time: "12:00", messages: 3200 },
  { time: "16:00", messages: 2800 },
  { time: "20:00", messages: 2000 },
];

const messageTypeData = [
  { type: "Text", count: 45234, color: "#3b82f6" },
  { type: "Image", count: 12456, color: "#10b981" },
  { type: "File", count: 3234, color: "#f59e0b" },
  { type: "Voice", count: 1234, color: "#ef4444" },
];

const dailyStats = [
  { day: "Mon", sent: 12000, delivered: 11800, read: 11200 },
  { day: "Tue", sent: 15000, delivered: 14700, read: 14100 },
  { day: "Wed", sent: 18000, delivered: 17600, read: 17000 },
  { day: "Thu", sent: 16000, delivered: 15800, read: 15200 },
  { day: "Fri", sent: 22000, delivered: 21500, read: 20800 },
  { day: "Sat", sent: 8000, delivered: 7900, read: 7600 },
  { day: "Sun", sent: 6000, delivered: 5950, read: 5700 },
];

interface MessageAnalyticsProps {
  detailed?: boolean;
}

export const MessageAnalytics = ({ detailed = false }: MessageAnalyticsProps) => {
  if (detailed) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Volume */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Message Volume (24h)</CardTitle>
              <CardDescription>Messages sent throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={messageData}>
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
                    dataKey="messages" 
                    stroke="hsl(var(--admin-primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--admin-primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Message Types */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Message Types</CardTitle>
              <CardDescription>Distribution of message types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={messageTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="count"
                    label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                  >
                    {messageTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Stats */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Message Delivery Statistics</CardTitle>
            <CardDescription>Sent, delivered, and read message counts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }} 
                />
                <Bar dataKey="sent" fill="hsl(var(--admin-primary))" name="Sent" />
                <Bar dataKey="delivered" fill="hsl(var(--admin-secondary))" name="Delivered" />
                <Bar dataKey="read" fill="hsl(var(--admin-success))" name="Read" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle>Message Activity</CardTitle>
        <CardDescription>Real-time message flow</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={messageData}>
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
              dataKey="messages" 
              stroke="hsl(var(--admin-primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--admin-primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};