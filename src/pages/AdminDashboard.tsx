import { Users, MessageSquare, Shield, Activity, AlertTriangle, Database, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCards } from "@/components/admin/StatsCards";
import { UserManagement } from "@/components/admin/UserManagement";
import { MessageAnalytics } from "@/components/admin/MessageAnalytics";
import { ConversationMonitor } from "@/components/admin/ConversationMonitor";
import { AuditLogs } from "@/components/admin/AuditLogs";
import { SystemHealth } from "@/components/admin/SystemHealth";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AdminDashboardProps {
  users: Array<{ id: string; username: string; status: "pending" | "approved" | "rejected"; avatar?: string; role?: string }>;
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  addUser?: (username: string, password: string, role: string) => void;
  forceLogoutUser?: (id: string) => void;
  deleteUser?: (id: string) => void;
}

const AdminDashboard = ({ users, approveUser, rejectUser, addUser, forceLogoutUser, deleteUser }: AdminDashboardProps) => {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">OffChat Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your offline messaging platform</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-admin-success/20 text-admin-success border-admin-success/30">
                System Online
              </Badge>
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsCards />

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MessageAnalytics />
                <SystemHealth />
              </div>
            </TabsContent>

            <TabsContent value="users">
              <UserManagement users={users} approveUser={approveUser} rejectUser={rejectUser} addUser={addUser} forceLogoutUser={forceLogoutUser} deleteUser={deleteUser} />
            </TabsContent>

            <TabsContent value="messages">
              <MessageAnalytics detailed />
            </TabsContent>

            <TabsContent value="conversations">
              <ConversationMonitor />
            </TabsContent>

            <TabsContent value="audit">
              <AuditLogs />
            </TabsContent>

            <TabsContent value="system">
              <SystemHealth detailed />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;