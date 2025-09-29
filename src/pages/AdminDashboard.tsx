import React from "react";
import { Users, MessageSquare, Shield, Activity, AlertTriangle, Database, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCards } from "@/components/admin/StatsCards";
import { UserManagement } from "@/components/admin/UserManagement";
import { EnhancedUserList } from "@/components/admin/EnhancedUserList";
import { UserProfileViewer } from "@/components/admin/UserProfileViewer";
import { ModerationTools } from "@/components/admin/ModerationTools";
import { DataTools } from "@/components/admin/DataTools";
import { MessageAnalytics } from "@/components/admin/MessageAnalytics";
import { ConversationMonitor } from "@/components/admin/ConversationMonitor";
import { AuditLogs } from "@/components/admin/AuditLogs";
import { SystemHealth } from "@/components/admin/SystemHealth";
import { ThemeToggle } from "@/components/ThemeToggle";

interface User {
  id: string;
  username: string;
  email: string;
  status: "active" | "suspended" | "banned";
  role: string;
  joinDate: string;
  lastActive: string;
  messageCount: number;
  reportCount: number;
  avatar?: string;
}

interface AdminDashboardProps {
  users: User[];
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  addUser?: (username: string, password: string, role: string) => void;
  forceLogoutUser?: (id: string) => void;
  deleteUser?: (id: string) => void;
}

const AdminDashboard = ({ users, approveUser, rejectUser, addUser, forceLogoutUser, deleteUser }: AdminDashboardProps) => {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showModeration, setShowModeration] = React.useState(false);
  const [showDataTools, setShowDataTools] = React.useState(false);

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const handleModerate = (user: User) => {
    setSelectedUser(user);
    setShowModeration(true);
  };

  const handleDataManagement = (user: User) => {
    setSelectedUser(user);
    setShowDataTools(true);
  };

  const handleModerationAction = (userId: string, action: any) => {
    console.log('Moderation action:', userId, action);
    // Implement moderation logic
  };

  const handleExportData = (userId: string, options: any) => {
    console.log('Export data:', userId, options);
    // Implement data export
  };

  const handleDeleteData = (userId: string, options: any) => {
    console.log('Delete data:', userId, options);
    // Implement data deletion
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between relative border-b border-border py-4 px-2">
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
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
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
              <div className="space-y-6">
                <UserManagement 
                  users={users.map(u => ({ ...u, status: u.status as "pending" | "approved" | "rejected" }))}
                  approveUser={approveUser}
                  rejectUser={rejectUser}
                  addUser={addUser}
                  forceLogoutUser={forceLogoutUser}
                  deleteUser={deleteUser}
                />
                <EnhancedUserList 
                  users={users}
                  onViewProfile={handleViewProfile}
                  onModerate={handleModerate}
                  onDataManagement={handleDataManagement}
                />
              </div>
            </TabsContent>

            <TabsContent value="moderation">
              <Card>
                <CardHeader>
                  <CardTitle>Moderation Overview</CardTitle>
                  <CardDescription>Recent moderation actions and pending reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Select a user from the Users tab to access moderation tools.</p>
                </CardContent>
              </Card>
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
      
      {/* Modals */}
      {selectedUser && (
        <>
          <UserProfileViewer
            user={selectedUser}
            isOpen={showProfile}
            onClose={() => setShowProfile(false)}
            onExportData={(userId) => handleExportData(userId, {})}
            onDeleteData={(userId) => handleDeleteData(userId, {})}
          />
          <ModerationTools
            userId={selectedUser.id}
            username={selectedUser.username}
            isOpen={showModeration}
            onClose={() => setShowModeration(false)}
            onModerate={handleModerationAction}
          />
          <DataTools
            userId={selectedUser.id}
            username={selectedUser.username}
            isOpen={showDataTools}
            onClose={() => setShowDataTools(false)}
            onExportData={handleExportData}
            onDeleteData={handleDeleteData}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;