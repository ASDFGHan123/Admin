import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Shield,
  Activity,
  FileText,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", value: "overview" },
  { icon: Users, label: "User Management", value: "users" },
  { icon: MessageSquare, label: "Messages", value: "messages" },
  { icon: Activity, label: "Conversations", value: "conversations" },
  { icon: FileText, label: "Audit Logs", value: "audit" },
  { icon: Shield, label: "Permissions", value: "permissions" },
  { icon: Settings, label: "Settings", value: "settings" },
];

interface AdminSidebarProps {
  user?: { id: string; username: string; avatar?: string; status: "online" | "away" | "offline"; role?: string };
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const AdminSidebar = ({ user, activeTab = "overview", onTabChange }: AdminSidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">OffChat</h2>
            <p className="text-xs text-sidebar-foreground/60">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => onTabChange?.(item.value)}
            className={cn(
              "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              activeTab === item.value && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'admin'}`} />
            <AvatarFallback className="bg-admin-primary text-primary-foreground">
              {user?.username?.slice(0, 2).toUpperCase() || 'AD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.username || 'Admin User'}</p>
            <p className="text-xs text-sidebar-foreground/60">{user?.username ? `${user.username}@offchat.com` : 'admin@offchat.com'}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out</Button>
      </div>
    </div>
  );
};