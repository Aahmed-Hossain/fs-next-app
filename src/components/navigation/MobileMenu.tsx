"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { NavigationLinks } from "./NavigationLinks";
import { UserSection } from "./UserSection";

interface UserProfile {
  name?: string;
  raw_json?: {
    profile_image_url?: string;
  };
}

interface MobileMenuProps {
  isAuthenticated: boolean;
  userProfile?: UserProfile;
  signInUrl: string;
  signUpUrl: string;
  signOutUrl: string;
}

export const MobileMenu = ({
  isAuthenticated,
  userProfile,
  signInUrl,
  signUpUrl,
  signOutUrl,
}: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex gap-3 md:hidden">
        <ModeToggle />
        <button
          onClick={toggleMenu}
          className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md p-1"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-background border-b border-border md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              <NavigationLinks
                className="px-2 py-1 rounded-md hover:bg-muted"
                onLinkClick={closeMenu}
              />
              <div className="pt-2 border-t border-border">
                <UserSection
                  isAuthenticated={isAuthenticated}
                  userProfile={userProfile}
                  signInUrl={signInUrl}
                  signUpUrl={signUpUrl}
                  signOutUrl={signOutUrl}
                  isMobile={true}
                  onLinkClick={closeMenu}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
