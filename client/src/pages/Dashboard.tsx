import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, Star, Trash2, Search } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [offeredSkills, setOfferedSkills] = useState([
    { id: 1, skill: "React Development" },
    { id: 2, skill: "UI/UX Design" },
    { id: 3, skill: "JavaScript" },
  ]);

  const [wantedSkills, setWantedSkills] = useState([
    { id: 1, skill: "Backend Development" },
    { id: 2, skill: "Database Design" },
  ]);

  const [notifications] = useState([
    { id: 1, message: "New skill exchange request from John" },
    { id: 2, message: "Your request has been accepted" },
    { id: 3, message: "Profile viewed by 5 users today" },
  ]);

  const userRating = 3; // Example rating out of 5

  const deleteOfferedSkill = (id: number) => {
    setOfferedSkills(offeredSkills.filter((skill) => skill.id !== id));
    // toast({
    //   title: "Skill removed",
    //   description: "Offered skill has been deleted",
    // });
  };

  const deleteWantedSkill = (id: number) => {
    setWantedSkills(wantedSkills.filter((skill) => skill.id !== id));
    // toast({
    //   title: "Skill removed",
    //   description: "Wanted skill has been deleted",
    // });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }`}
      />
    ));
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
            <Link to="/explore">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Explore
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex-col items-start"
                  >
                    <p className="text-sm">{notification.message}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Profile Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(userRating)}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({userRating}/5)
                  </span>
                </div>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Offered Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills I Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offeredSkills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>{skill.skill}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteOfferedSkill(skill.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Wanted Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills I Want</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wantedSkills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>{skill.skill}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteWantedSkill(skill.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
