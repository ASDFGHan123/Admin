import React from "react";
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface UserManagementProps {
  users: Array<{ id: string; username: string; status: "pending" | "approved" | "rejected"; avatar?: string; role?: string }>;
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  addUser?: (username: string, password: string, role: string) => void;
  forceLogoutUser?: (id: string) => void;
  deleteUser?: (id: string) => void;
}

export const UserManagement = ({ users, approveUser, rejectUser, addUser, forceLogoutUser, deleteUser }: UserManagementProps) => {
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [confirmLogoutId, setConfirmLogoutId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [newUsername, setNewUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newRole, setNewRole] = React.useState("user");
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      setError("Username and password are required.");
      return;
    }
    if (addUser) {
      addUser(newUsername, newPassword, newRole);
      setOpen(false);
      setNewUsername("");
      setNewPassword("");
      setNewRole("user");
      setError("");
    }
  };

  // Filter users by search
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">User Management</CardTitle>
            <CardDescription>
              Manage users, roles, and permissions
            </CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-admin-primary hover:bg-admin-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
                <DialogDescription>Add a new user with a role and password. User will be approved by default.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select id="role" className="w-full border rounded-md p-2" value={newRole} onChange={e => setNewRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <DialogFooter>
                  <Button type="submit" className="bg-admin-primary hover:bg-admin-primary/90">Add</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {/* Search and Filters (not functional in demo) */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              className="pl-10 bg-input border-border"
              value={search}
              onChange={e => setSearch(e.target.value)}
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
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.status === "pending" && <Badge variant="secondary">Pending</Badge>}
                  {user.status === "approved" && <Badge variant="default">Approved</Badge>}
                  {user.status === "rejected" && <Badge variant="destructive">Rejected</Badge>}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    {user.status === "pending" ? (
                      <>
                        <Button size="sm" variant="default" onClick={() => approveUser(user.id)}>Approve</Button>
                        <Button size="sm" variant="destructive" onClick={() => rejectUser(user.id)}>Reject</Button>
                      </>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                    <Button size="sm" variant="outline" onClick={() => setConfirmLogoutId(user.id)}>Force Logout</Button>
                    <Button size="sm" variant="destructive" onClick={() => setConfirmDeleteId(user.id)}>Delete</Button>
                  </div>
                  {/* Force Logout Confirmation Dialog */}
                  <Dialog open={confirmLogoutId === user.id} onOpenChange={open => !open && setConfirmLogoutId(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Force Logout</DialogTitle>
                        <DialogDescription>Are you sure you want to forcefully log out <b>{user.username}</b>?</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmLogoutId(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { forceLogoutUser && forceLogoutUser(user.id); setConfirmLogoutId(null); }}>Force Logout</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {/* Delete Confirmation Dialog */}
                  <Dialog open={confirmDeleteId === user.id} onOpenChange={open => !open && setConfirmDeleteId(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>Are you sure you want to delete <b>{user.username}</b>? This action cannot be undone.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { deleteUser && deleteUser(user.id); setConfirmDeleteId(null); }}>Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};