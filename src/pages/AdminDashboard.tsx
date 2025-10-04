import React from "react";
import { Users, MessageSquare, Shield, Activity, AlertTriangle, Database, RefreshCw, UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
import { BackupManager } from "@/components/admin/BackupManager";
import { SystemMessageDialog } from "@/components/admin/SystemMessageDialog";
import { MessageTemplateDialog } from "@/components/admin/MessageTemplateDialog";
import { UserSelectionDialog } from "@/components/admin/UserSelectionDialog";
import { MessageHistory } from "@/components/admin/MessageHistory";
import { MessageModeration } from "@/components/admin/MessageModeration";
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

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  createdAt: string;
}

interface Conversation {
  id: string;
  type: "private" | "group";
  title: string;
  participants: string[];
  messages: Array<{
    id: string;
    content: string;
    sender: string;
    timestamp: string;
    type?: string;
  }>;
  createdAt: string;
  isActive: boolean;
}

interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

interface AdminDashboardProps {
  users: User[];
  roles: Role[];
  conversations: Conversation[];
  messageTemplates: MessageTemplate[];
  user?: { id: string; username: string; avatar?: string; status: "online" | "away" | "offline"; role?: string };
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  addUser?: (username: string, password: string, role: string) => void;
  updateUser?: (id: string, updates: Partial<User>) => void;
  addRole?: (name: string, description: string, permissions: string[]) => void;
  updateRole?: (id: string, updates: Partial<Role>) => void;
  deleteRole?: (id: string) => void;
  hasPermission?: (userId: string, permission: string) => boolean;
  sendSystemMessage?: (conversationId: string, content: string) => void;
  sendBulkMessage?: (userIds: string[], content: string) => void;
  addMessageTemplate?: (name: string, content: string, category: string) => void;
  deleteMessageTemplate?: (id: string) => void;
  forceLogoutUser?: (id: string) => void;
  deleteUser?: (id: string) => void;
}

const AdminDashboard = ({ users, roles, conversations, messageTemplates, user, approveUser, rejectUser, addUser, updateUser, addRole, updateRole, deleteRole, hasPermission, sendSystemMessage, sendBulkMessage, addMessageTemplate, deleteMessageTemplate, forceLogoutUser, deleteUser }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showModeration, setShowModeration] = React.useState(false);
  const [showDataTools, setShowDataTools] = React.useState(false);
  const [showSystemMessageDialog, setShowSystemMessageDialog] = React.useState(false);
  const [messageDialogMode, setMessageDialogMode] = React.useState<"system" | "broadcast" | "targeted">("system");
  const [selectedUsersForMessage, setSelectedUsersForMessage] = React.useState<string[]>([]);
  const [showTemplateDialog, setShowTemplateDialog] = React.useState(false);
  const [templateDialogMode, setTemplateDialogMode] = React.useState<"add" | "edit">("add");
  const [selectedTemplate, setSelectedTemplate] = React.useState<MessageTemplate | null>(null);
  const [showUserSelectionDialog, setShowUserSelectionDialog] = React.useState(false);

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

  const handleSendSystemMessage = async (content: string, priority?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sending system message:', { content, priority });
    // In real implementation, call the API
    if (sendSystemMessage) {
      // For now, send to a dummy conversation
      sendSystemMessage("system-conversation", content);
    }
  };

  const handleSendBulkMessage = async (content: string, priority?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sending bulk message:', { content, priority, userCount: users.length });
    // In real implementation, call the API
    if (sendBulkMessage) {
      sendBulkMessage(users.map(u => u.id), content);
    }
  };

  const handleSendTargetedMessage = async (content: string, priority?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Sending targeted message:', { content, priority, users: selectedUsersForMessage });
    // In real implementation, call the API
  };

  const handleOpenSystemMessageDialog = (mode: "system" | "broadcast" | "targeted" = "system") => {
    setMessageDialogMode(mode);
    setShowSystemMessageDialog(true);
  };

  const handleSendMessage = async (content: string, priority?: string) => {
    switch (messageDialogMode) {
      case "system":
        await handleSendSystemMessage(content, priority);
        break;
      case "broadcast":
        await handleSendBulkMessage(content, priority);
        break;
      case "targeted":
        await handleSendTargetedMessage(content, priority);
        break;
    }
  };

  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setTemplateDialogMode("add");
    setShowTemplateDialog(true);
  };

  const handleEditTemplate = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setTemplateDialogMode("edit");
    setShowTemplateDialog(true);
  };

  const handleUseTemplate = (template: MessageTemplate) => {
    // Pre-fill the system message dialog with template content
    setMessageDialogMode("system");
    setShowSystemMessageDialog(true);
    // Note: In a real implementation, you'd pass the template content to the dialog
  };

  const handleSaveTemplate = async (templateData: Omit<MessageTemplate, "id">) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Saving template:', templateData);
    // In real implementation, call API to save template
  };

  const handleDeleteTemplate = async (templateId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Deleting template:', templateId);
    // In real implementation, call API to delete template
  };

  const handleOpenUserSelection = () => {
    setShowUserSelectionDialog(true);
  };

  const handleUserSelectionConfirm = (selectedUserIds: string[]) => {
    setSelectedUsersForMessage(selectedUserIds);
    setMessageDialogMode("targeted");
    setShowSystemMessageDialog(true);
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar user={user} activeTab={activeTab} onTabChange={setActiveTab} />
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MessageAnalytics />
                <BackupManager />
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="space-y-6">
                <UserManagement
                  users={users}
                  approveUser={approveUser}
                  rejectUser={rejectUser}
                  addUser={addUser}
                  updateUser={updateUser}
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
              <div className="space-y-6">
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Admin Messaging</CardTitle>
                        <CardDescription>Send system messages and announcements</CardDescription>
                      </div>
                      <Button
                        className="bg-admin-primary hover:bg-admin-primary/90"
                        onClick={() => handleOpenSystemMessageDialog("system")}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send System Message
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Quick Actions</Label>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Welcome New Users
                          </Button>
                          <Button variant="outline" size="sm">
                            Maintenance Notice
                          </Button>
                          <Button variant="outline" size="sm">
                            Security Alert
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Broadcast to All Users</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Send a message to all active users in the system
                          </p>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleOpenSystemMessageDialog("broadcast")}
                          >
                            Broadcast Message
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Targeted Messaging</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Send messages to specific user groups or individuals
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={handleOpenUserSelection}
                          >
                            Select Recipients
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gradient-card border-border/50">
                    <CardHeader>
                      <CardTitle>Message Templates</CardTitle>
                      <CardDescription>Manage reusable message templates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {messageTemplates.map((template) => (
                          <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h5 className="font-medium">{template.name}</h5>
                              <p className="text-sm text-muted-foreground">{template.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUseTemplate(template)}
                              >
                                Use
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditTemplate(template)}
                              >
                                Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Template</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete the template "{template.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteTemplate(template.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full" onClick={handleAddTemplate}>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Add Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <MessageAnalytics detailed />
                </div>

                <MessageHistory />

                <MessageModeration />
              </div>
            </TabsContent>

            <TabsContent value="conversations">
              <ConversationMonitor />
            </TabsContent>

            <TabsContent value="audit">
              <AuditLogs />
            </TabsContent>

            <TabsContent value="permissions">
              <div className="space-y-6">
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Role Management</CardTitle>
                        <CardDescription>Manage user roles and their permissions</CardDescription>
                      </div>
                      <Button className="bg-admin-primary hover:bg-admin-primary/90">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Role
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {roles.map((role) => (
                        <Card key={role.id} className="border">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{role.name}</CardTitle>
                              {role.isDefault && (
                                <Badge variant="secondary" className="text-xs">Default</Badge>
                              )}
                            </div>
                            <CardDescription>{role.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium">Permissions:</h5>
                              <div className="flex flex-wrap gap-1">
                                {role.permissions.map((permission) => (
                                  <Badge key={permission} variant="outline" className="text-xs">
                                    {permission.replace('_', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" className="flex-1">
                                Edit
                              </Button>
                              {!role.isDefault && (
                                <Button size="sm" variant="destructive" className="flex-1">
                                  Delete
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle>Permission Matrix</CardTitle>
                    <CardDescription>Overview of all available permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">User Management</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-success rounded-full"></div>
                            user_management - Create, edit, delete users
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-success rounded-full"></div>
                            role_management - Manage user roles
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Messaging</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-primary rounded-full"></div>
                            send_messages - Send messages
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-primary rounded-full"></div>
                            manage_conversations - Manage conversations
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-warning rounded-full"></div>
                            message_monitoring - Monitor messages
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">System</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-error rounded-full"></div>
                            system_settings - System configuration
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-error rounded-full"></div>
                            audit_logs - View audit logs
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-error rounded-full"></div>
                            backup_management - Manage backups
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Analytics</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-admin-secondary rounded-full"></div>
                            view_analytics - View system analytics
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">General Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Maintenance Mode</span>
                          <Badge variant="secondary">Disabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">User Registration</span>
                          <Badge variant="default">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Notifications</span>
                          <Badge variant="secondary">Disabled</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4">Security Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Two-Factor Auth</span>
                          <Badge variant="secondary">Optional</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Session Timeout</span>
                          <span className="text-sm text-muted-foreground">30 minutes</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-muted-foreground">
                      Advanced settings panel coming soon
                    </div>
                  </div>
                </CardContent>
              </Card>
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

      <SystemMessageDialog
        isOpen={showSystemMessageDialog}
        onClose={() => setShowSystemMessageDialog(false)}
        onSendMessage={handleSendMessage}
        mode={messageDialogMode}
        selectedUsers={selectedUsersForMessage}
        totalUsers={users.length}
      />

      <MessageTemplateDialog
        isOpen={showTemplateDialog}
        onClose={() => setShowTemplateDialog(false)}
        onSave={handleSaveTemplate}
        template={selectedTemplate}
        mode={templateDialogMode}
      />

      <UserSelectionDialog
        isOpen={showUserSelectionDialog}
        onClose={() => setShowUserSelectionDialog(false)}
        onConfirm={handleUserSelectionConfirm}
        users={users}
        preSelectedUsers={selectedUsersForMessage}
      />
    </div>
  );
};

export default AdminDashboard;