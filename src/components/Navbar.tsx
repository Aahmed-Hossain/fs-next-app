import Link from "next/link";
import { Leaf } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { stackServerApp } from "@/stack";
import { getUserDetails } from "@/actions/user.action";
import { NavigationLinks } from "@/components/navigation/NavigationLinks";
import { UserSection } from "@/components/navigation/UserSection";
import { MobileMenu } from "@/components/navigation/MobileMenu";

export default async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  // Serialize data for client components
  const isAuthenticated = !!user;
  const serializedUserProfile = userProfile
    ? {
        name: userProfile.name,
        raw_json: userProfile.raw_json
          ? {
              profile_image_url: userProfile.raw_json.profile_image_url,
            }
          : undefined,
      }
    : undefined;

  return (
    <nav className="sticky top-0 bg-background border-b border-border px-4 py-3 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-foreground hover:text-muted-foreground transition-colors"
        >
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-semibold">PlantIventory</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavigationLinks />
          <UserSection
            isAuthenticated={isAuthenticated}
            userProfile={serializedUserProfile}
            signInUrl={app.signIn}
            signUpUrl={app.signUp}
            signOutUrl={app.signOut}
          />
          <ModeToggle />
        </div>

        <MobileMenu
          isAuthenticated={isAuthenticated}
          userProfile={serializedUserProfile}
          signInUrl={app.signIn}
          signUpUrl={app.signUp}
          signOutUrl={app.signOut}
        />
      </div>
    </nav>
  );
}
