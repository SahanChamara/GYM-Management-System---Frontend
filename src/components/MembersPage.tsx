
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  UserPlus,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Mock member data
const memberData = [
  { 
    id: "M001", 
    name: "John Doe", 
    email: "john@example.com", 
    phone: "+1234567890",
    membershipType: "Premium",
    status: "Active",
    joinDate: "2024-01-15",
    paymentStatus: "Paid",
    lastVisit: "2025-05-15",
  },
  { 
    id: "M002", 
    name: "Jane Smith", 
    email: "jane@example.com", 
    phone: "+1987654321",
    membershipType: "Standard",
    status: "Active",
    joinDate: "2024-02-20",
    paymentStatus: "Due",
    lastVisit: "2025-05-10", 
  },
  { 
    id: "M003", 
    name: "Mike Johnson", 
    email: "mike@example.com", 
    phone: "+1567891234",
    membershipType: "Basic",
    status: "Inactive",
    joinDate: "2024-03-10",
    paymentStatus: "Overdue",
    lastVisit: "2025-04-25", 
  },
  { 
    id: "M004", 
    name: "Sarah Williams", 
    email: "sarah@example.com", 
    phone: "+1456789123",
    membershipType: "Premium",
    status: "Active",
    joinDate: "2024-01-05",
    paymentStatus: "Paid",
    lastVisit: "2025-05-18", 
  },
  { 
    id: "M005", 
    name: "Robert Brown", 
    email: "robert@example.com", 
    phone: "+1345678912",
    membershipType: "Standard",
    status: "Active",
    joinDate: "2024-02-15",
    paymentStatus: "Paid",
    lastVisit: "2025-05-17", 
  },
  { 
    id: "M006", 
    name: "Emily Davis", 
    email: "emily@example.com", 
    phone: "+1234567891",
    membershipType: "Premium",
    status: "Active",
    joinDate: "2024-03-01",
    paymentStatus: "Due",
    lastVisit: "2025-05-05", 
  },
  { 
    id: "M007", 
    name: "David Wilson", 
    email: "david@example.com", 
    phone: "+1123456789",
    membershipType: "Basic",
    status: "Inactive",
    joinDate: "2024-04-10",
    paymentStatus: "Overdue",
    lastVisit: "2025-04-20", 
  },
  { 
    id: "M008", 
    name: "Lisa Taylor", 
    email: "lisa@example.com", 
    phone: "+1912345678",
    membershipType: "Standard",
    status: "Active",
    joinDate: "2024-03-25",
    paymentStatus: "Paid",
    lastVisit: "2025-05-12", 
  }
];

const MembersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(memberData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = memberData.filter(
      member => 
        member.name.toLowerCase().includes(query) || 
        member.email.toLowerCase().includes(query) ||
        member.id.toLowerCase().includes(query)
    );
    
    setFilteredMembers(filtered);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500 hover:bg-green-600";
      case "Inactive":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getPaymentStatusBadgeColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "Paid":
        return "bg-green-500 hover:bg-green-600";
      case "Due":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Overdue":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Members</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-8 w-full md:w-[250px]"
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button className="gym-gradient-blue gap-1">
            <UserPlus className="h-5 w-5" />
            <span>Add Member</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle>Member Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {member.name.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Member</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">ID</p>
                        <p>{member.id}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p>{member.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Membership</p>
                        <p>{member.membershipType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Join Date</p>
                        <p>{member.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Visit</p>
                        <p>{member.lastVisit}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge className={getStatusBadgeColor(member.status)}>
                        {member.status}
                      </Badge>
                      <Badge className={getPaymentStatusBadgeColor(member.paymentStatus)}>
                        {member.paymentStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPage;
