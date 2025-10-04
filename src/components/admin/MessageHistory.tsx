import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, Trash2, Clock, Users, User, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

interface SentMessage {
  id: string;
  type: "system" | "broadcast" | "targeted";
  content: string;
  recipients: string[]; // user IDs or "all" for broadcast
  recipientCount: number;
  sentBy: string;
  sentAt: string;
  status: "sent" | "delivered" | "failed";
  priority: "low" | "normal" | "high" | "urgent";
}

interface MessageHistoryProps {
  messages?: SentMessage[];
}

const mockMessages: SentMessage[] = [
  {
    id: "1",
    type: "broadcast",
    content: "Scheduled maintenance will begin at 2 AM UTC. The system will be unavailable for 30 minutes.",
    recipients: ["all"],
    recipientCount: 1250,
    sentBy: "admin",
    sentAt: "2024-10-04T10:30:00Z",
    status: "sent",
    priority: "high",
  },
  {
    id: "2",
    type: "system",
    content: "Welcome to OffChat! Please review our community guidelines.",
    recipients: ["new-users"],
    recipientCount: 45,
    sentBy: "admin",
    sentAt: "2024-10-04T09:15:00Z",
    status: "delivered",
    priority: "normal",
  },
  {
    id: "3",
    type: "targeted",
    content: "Your account has been flagged for suspicious activity. Please verify your identity.",
    recipients: ["user123", "user456", "user789"],
    recipientCount: 3,
    sentBy: "moderator",
    sentAt: "2024-10-04T08:45:00Z",
    status: "sent",
    priority: "urgent",
  },
  {
    id: "4",
    type: "broadcast",
    content: "New feature: Dark mode is now available! Check your settings to enable it.",
    recipients: ["all"],
    recipientCount: 1250,
    sentBy: "admin",
    sentAt: "2024-10-03T16:20:00Z",
    status: "delivered",
    priority: "low",
  },
];

export const MessageHistory = ({ messages = mockMessages }: MessageHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredMessages = useMemo(() => {
    return messages.filter(message => {
      const matchesSearch = message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           message.sentBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || message.type === typeFilter;
      const matchesStatus = statusFilter === "all" || message.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter;

      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });
  }, [messages, searchQuery, typeFilter, statusFilter, priorityFilter]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "broadcast":
        return <Users className="w-4 h-4" />;
      case "system":
        return <AlertTriangle className="w-4 h-4" />;
      case "targeted":
        return <User className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "broadcast":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "system":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "targeted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "normal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
  };

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Message History</CardTitle>
            <CardDescription>View and manage sent system messages</CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="broadcast">Broadcast</SelectItem>
                <SelectItem value="targeted">Targeted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Messages Table */}
          <ScrollArea className="h-[400px] border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(message.type)}
                        <Badge className={`text-xs ${getTypeColor(message.type)}`}>
                          {message.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate" title={message.content}>
                          {truncateContent(message.content)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {message.type === "broadcast" ? (
                          <Users className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {message.recipientCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(message.status)}`}>
                        {message.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {format(new Date(message.sentAt), "MMM dd, HH:mm")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredMessages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No messages found matching your filters.</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};