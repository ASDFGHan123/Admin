import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Flag, Trash2, Eye, EyeOff, AlertTriangle, Shield, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FlaggedMessage {
  id: string;
  content: string;
  sender: string;
  senderId: string;
  conversationId: string;
  flaggedAt: string;
  reason: string;
  severity: "low" | "medium" | "high";
  status: "pending" | "reviewed" | "resolved";
}

interface MessageModerationProps {
  flaggedMessages?: FlaggedMessage[];
}

const mockFlaggedMessages: FlaggedMessage[] = [
  {
    id: "1",
    content: "This is inappropriate content that violates community guidelines.",
    sender: "user123",
    senderId: "user123",
    conversationId: "conv1",
    flaggedAt: "2024-10-04T10:30:00Z",
    reason: "Inappropriate content",
    severity: "high",
    status: "pending",
  },
  {
    id: "2",
    content: "Spam message repeated multiple times.",
    sender: "user456",
    senderId: "user456",
    conversationId: "conv2",
    flaggedAt: "2024-10-04T09:15:00Z",
    reason: "Spam",
    severity: "medium",
    status: "pending",
  },
  {
    id: "3",
    content: "Harassment towards another user.",
    sender: "user789",
    senderId: "user789",
    conversationId: "conv3",
    flaggedAt: "2024-10-04T08:45:00Z",
    reason: "Harassment",
    severity: "high",
    status: "reviewed",
  },
];

export const MessageModeration = ({ flaggedMessages = mockFlaggedMessages }: MessageModerationProps) => {
  const [selectedMessage, setSelectedMessage] = useState<FlaggedMessage | null>(null);
  const { toast } = useToast();

  const pendingMessages = flaggedMessages.filter(msg => msg.status === "pending");

  const handleModerateMessage = async (messageId: string, action: "approve" | "delete" | "warn") => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Moderating message:', messageId, action);

    toast({
      title: "Success",
      description: `Message ${action === "approve" ? "approved" : action === "delete" ? "deleted" : "warning sent"}.`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "reviewed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-500" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{pendingMessages.length}</div>
            <p className="text-sm text-muted-foreground">Messages awaiting moderation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Total Flagged
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{flaggedMessages.length}</div>
            <p className="text-sm text-muted-foreground">Messages flagged this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-500" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {flaggedMessages.filter(msg => msg.status === "resolved").length}
            </div>
            <p className="text-sm text-muted-foreground">Issues resolved</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Flagged Messages</CardTitle>
          <CardDescription>Messages that require moderation attention</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {flaggedMessages.map((message) => (
                <div key={message.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs ${getSeverityColor(message.severity)}`}>
                          {message.severity} severity
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(message.status)}`}>
                          {message.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          by {message.sender}
                        </span>
                      </div>
                      <p className="text-sm bg-muted p-2 rounded border-l-4 border-red-500">
                        {message.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reason: {message.reason}
                      </p>
                    </div>
                  </div>

                  {message.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleModerateMessage(message.id, "approve")}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-orange-600">
                            <EyeOff className="w-4 h-4 mr-1" />
                            Warn Sender
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Send Warning</AlertDialogTitle>
                            <AlertDialogDescription>
                              Send a warning to {message.sender} about their message content?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleModerateMessage(message.id, "warn")}
                            >
                              Send Warning
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete Message
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Message</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this message? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleModerateMessage(message.id, "delete")}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}

                  {message.status !== "pending" && (
                    <div className="text-sm text-muted-foreground">
                      Reviewed on {new Date(message.flaggedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}

              {flaggedMessages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No flagged messages at this time.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};