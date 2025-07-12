import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Bell } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState("");
  const [selectedWantedSkill, setSelectedWantedSkill] = useState("");

  const [users] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      profilePic: "/placeholder.svg",
      offeredSkills: ["Python", "Machine Learning"],
      availability: "weekends",
    },
    {
      id: 2,
      name: "Bob Smith",
      profilePic: "/placeholder.svg",
      offeredSkills: ["UI/UX Design", "Figma"],
      availability: "weekdays",
    },
    {
      id: 3,
      name: "Carol Davis",
      profilePic: "/placeholder.svg",
      offeredSkills: ["Marketing", "Content Writing"],
      availability: "weekends",
    },
    {
      id: 4,
      name: "David Wilson",
      profilePic: "/placeholder.svg",
      offeredSkills: ["Backend Development", "Node.js"],
      availability: "weekdays",
    },
  ]);

  const myOfferedSkills = ["React Development", "UI/UX Design", "JavaScript"];
  const myWantedSkills = ["Backend Development", "Database Design"];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.offeredSkills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesAvailability =
      availabilityFilter === "all" || user.availability === availabilityFilter;
    return matchesSearch && matchesAvailability;
  });

  const handleRequest = () => {
    if (!selectedOfferedSkill || !selectedWantedSkill) {
      // toast({
      //   title: "Please select skills",
      //   description: "Both offered and wanted skills must be selected",
      //   variant: "destructive",
      // });
      return;
    }

    // toast({
    //   title: "Request sent!",
    //   description: `Your skill exchange request has been sent successfully.`,
    // });
    setSelectedOfferedSkill("");
    setSelectedWantedSkill("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/" className="text-2xl font-bold">
            SkillSwap
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search and Filter Section */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Availability
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setAvailabilityFilter("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAvailabilityFilter("weekends")}
              >
                Weekends
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAvailabilityFilter("weekdays")}
              >
                Weekdays
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Users Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.profilePic} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{user.name}</h3>
                      <div className="mt-2 space-y-1">
                        {user.offeredSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs mr-1"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 capitalize">
                        Available: {user.availability}
                      </p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="ml-2">
                        Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Skill Exchange Request</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Skill you want to offer:
                          </label>
                          <Select
                            value={selectedOfferedSkill}
                            onValueChange={setSelectedOfferedSkill}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a skill you offer" />
                            </SelectTrigger>
                            <SelectContent>
                              {myOfferedSkills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Skill you want to learn:
                          </label>
                          <Select
                            value={selectedWantedSkill}
                            onValueChange={setSelectedWantedSkill}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a skill you want" />
                            </SelectTrigger>
                            <SelectContent>
                              {user.offeredSkills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleRequest} className="w-full">
                          Submit Request
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No users found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
