import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { logOut } from "@/features/auth/auth-slice";
import { useAppDispatch } from "@/redux/hooks";
import { User } from "@/types";
import { Heart, LogOut, Mail, Phone, ShoppingBag, Star } from "lucide-react";
import { Badge } from "../ui/badge";

interface ProfileHeaderProps {
  user: User;
  stats?: {
    orders?: number;
    reviews?: number;
    wishlistItems?: number;
    points?: number;
  };
}

export default function ProfileHeader({ user, stats }: ProfileHeaderProps) {
  const dispatch = useAppDispatch();

  if (!user || !user.profile) return;

  stats = stats || { orders: 0, reviews: 0, wishlistItems: 0, points: 0 };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  console.log(user);
  const handleLogout = async () => {
    dispatch(logOut());
    window.location.href = "/login";
  };
  const profile = user.profile;
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/80 to-primary"></div>
      <CardContent className="relative pt-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center md:items-start -mt-16 md:-mt-12 md:mr-8">
            <Avatar className="h-32 w-32 border-4 border-background shadow-md">
              <AvatarImage
                src={profile.avatar || "/placeholder.svg"}
                alt={`${profile.name}`}
              />
              <AvatarFallback className="text-2xl bg-primary/10">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center md:text-left">
              <h1 className="text-2xl font-bold">{`${profile.name} `}</h1>
              {profile.bio && (
                <p className="mt-2 max-w-md text-sm">{profile.bio}</p>
              )}
              <p className="text-muted-foreground mt-2 text-sm">
                {profile.address}
              </p>
            </div>
          </div>

          <div className="flex-1 mt-6">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="space-y-2 mb-4 md:mb-0">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center mb-1">
                  <ShoppingBag className="h-5 w-5 mr-1 text-primary" />
                  <span className="font-semibold">{stats.orders}</span>
                </div>
                <span className="text-xs text-muted-foreground">Orders</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center mb-1">
                  <Star className="h-5 w-5 mr-1 text-amber-500" />
                  <span className="font-semibold">{stats.reviews}</span>
                </div>
                <span className="text-xs text-muted-foreground">Reviews</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center mb-1">
                  <Heart className="h-5 w-5 mr-1 text-rose-500" />
                  <span className="font-semibold">{stats.wishlistItems}</span>
                </div>
                <span className="text-xs text-muted-foreground">Wishlist</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                <div className="flex items-center mb-1">
                  <Badge
                    variant="outline"
                    className="px-2 py-0.5 text-xs font-semibold"
                  >
                    {stats.points} Points
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">Rewards</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
