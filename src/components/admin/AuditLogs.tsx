import { Search, Filter, Clock, User, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockAuditLogs = [
  {
    id: 1,
    action: "USER_LOGIN",
    actor: "john_doe",
    targetType: "USER",
    targetId: 123,
    timestamp: "2024-01-22 14:30:25",
    ipAddress: "192.168.1.1",
    description: "User successfully logged in",
    severity: "info",
  },
  {
    id: 2,
    action: "MESSAGE_DELETE",
    actor: "admin_user",
    targetType: "MESSAGE",
    targetId: 456,
    timestamp: "2024-01-22 14:25:10",
    ipAddress: "192.168.1.100",
    description: "Message deleted by admin",
    severity: "warning",
  },
  {
    id: 3,
    action: "USER_ROLE_CHANGE",
    actor: "admin_user",
    targetType: "USER",
    targetId: 789,
    timestamp: "2024-01-22 14:20:45",
    ipAddress: "192.168.1.100",
    description: "User role changed from USER to ADMIN",
    severity: "high",
  },
  {
    id: 4,
    action: "GROUP_CREATE",
    actor: "alice_smith",
    targetType: "GROUP",
    targetId: 101,
    timestamp: "2024-01-22 14:15:30",
    ipAddress: "192.168.1.50",
    description: "New group 'Development Team' created",
    severity: "info",
  },
  {
    id: 5,
    action: "USER_DEACTIVATE",
    actor: "admin_user",
    targetType: "USER",
    targetId: 999,
    timestamp: "2024-01-22 14:10:15",
    ipAddress: "192.168.1.100",
    description: "User account deactivated",
    severity: "high",
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'destructive';
    case 'warning':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getSeverityBg = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-admin-error/10';
    case 'warning':
      return 'bg-admin-warning/10';
    default:
      return 'bg-admin-primary/10';
  }
};

export const AuditLogs = () => {
  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Audit Logs</CardTitle>
            <CardDescription>
              Track all system actions and changes
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search audit logs..."
              className="pl-10 bg-input border-border"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAuditLogs.map((log) => (
              <TableRow key={log.id} className={getSeverityBg(log.severity)}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono">{log.timestamp}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{log.actor}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {log.targetType}:{log.targetId}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{log.description}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getSeverityColor(log.severity)}>
                    {log.severity.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono text-muted-foreground">
                    {log.ipAddress}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};