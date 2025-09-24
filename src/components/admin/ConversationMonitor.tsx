import { Search, Filter, Users, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockConversations = [
  {
    id: 1,
    type: "private",
    title: "John Doe & Alice Smith",
    participants: 2,
    lastMessage: "Hey, are you available for the meeting?",
    lastActivity: "2 minutes ago",
    messageCount: 142,
    isActive: true,
  },
  {
    id: 2,
    type: "group",
    title: "Development Team",
    participants: 8,
    lastMessage: "The new feature is ready for testing",
    lastActivity: "5 minutes ago",
    messageCount: 1834,
    isActive: true,
  },
  {
    id: 3,
    type: "group",
    title: "Marketing Team",
    participants: 5,
    lastMessage: "Campaign results look promising",
    lastActivity: "1 hour ago",
    messageCount: 567,
    isActive: false,
  },
  {
    id: 4,
    type: "private",
    title: "Bob Wilson & Carol Davis",
    participants: 2,
    lastMessage: "Thanks for the update",
    lastActivity: "3 hours ago",
    messageCount: 89,
    isActive: false,
  },
];

export const ConversationMonitor = () => {
  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Conversation Monitor</CardTitle>
            <CardDescription>
              Monitor active conversations and message flow
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-admin-success/20 text-admin-success border-admin-success/30">
              {mockConversations.filter(c => c.isActive).length} Active
            </Badge>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
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
              <TableHead>Conversation</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Messages</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockConversations.map((conversation) => (
              <TableRow key={conversation.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {conversation.type === 'group' ? (
                        <div className="w-8 h-8 bg-admin-secondary/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-admin-secondary" />
                        </div>
                      ) : (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.id}`} />
                          <AvatarFallback>
                            {conversation.title.split(' ').slice(0, 2).map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{conversation.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={conversation.type === 'group' ? 'default' : 'secondary'}>
                    {conversation.type === 'group' ? 'Group' : 'Private'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{conversation.participants}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span>{conversation.messageCount.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{conversation.lastActivity}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${conversation.isActive ? 'bg-admin-success' : 'bg-muted-foreground'}`} />
                    <span className="text-sm">
                      {conversation.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};