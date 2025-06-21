import Link from "next/link";
import Image from "next/image";

interface UserProfile {
  name?: string;
  raw_json?: {
    profile_image_url?: string;
  };
}

interface UserSectionProps {
  isAuthenticated: boolean;
  userProfile?: UserProfile;
  signInUrl: string;
  signUpUrl: string;
  signOutUrl: string;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export const UserSection = ({
  isAuthenticated,
  userProfile,
  signInUrl,
  signUpUrl,
  signOutUrl,
  isMobile = false,
  onLinkClick,
}: UserSectionProps) => {
  const buttonClass = `border border-border inline-flex h-8 items-center justify-center font-medium text-center rounded-full outline-none bg-secondary hover:bg-secondary/80 text-secondary-foreground whitespace-nowrap px-6 text-[13px] transition-colors duration-200`;

  const mobileButtonClass = `text-muted-foreground hover:text-foreground transition-colors font-medium px-2 py-1 rounded-md hover:bg-muted w-full text-left`;

  if (isAuthenticated) {
    if (userProfile?.name && userProfile?.raw_json?.profile_image_url) {
      return (
        <div
          className={`flex items-center ${
            isMobile ? "flex-col space-y-2" : "gap-4"
          }`}
        >
          {!isMobile && (
            <span className="inline-flex h-8 items-end flex-col">
              <span className="text-[14px] text-muted-foreground">
                {`Hello, ${userProfile.name.split(" ")[0]}`}
              </span>
              <Link
                href={signOutUrl}
                className=" underline text-[11px] hover:no-underline text-muted-foreground hover:text-foreground"
                onClick={onLinkClick}
              >
                Sign Out
              </Link>
            </span>
          )}
          <Image
            src={userProfile.raw_json.profile_image_url}
            alt="User avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          {isMobile && (
            <span className="text-[14px] text-muted-foreground">
              {`Hello, ${userProfile.name.split(" ")[0]}`}
            </span>
          )}
          {isMobile && (
            <Link
              href={signOutUrl}
              className=" underline text-[11px] hover:no-underline text-muted-foreground hover:text-foreground"
              onClick={onLinkClick}
            >
              Sign Out
            </Link>
          )}
        </div>
      );
    } else {
      return (
        <Link
          href={signOutUrl}
          className={isMobile ? mobileButtonClass : buttonClass}
          onClick={onLinkClick}
        >
          Sign Out
        </Link>
      );
    }
  } else {
    return (
      <div
        className={`flex items-center ${
          isMobile ? "flex-col space-y-2" : "gap-3"
        }`}
      >
        <Link
          href={signInUrl}
          className={isMobile ? mobileButtonClass : buttonClass}
          onClick={onLinkClick}
        >
          Log In
        </Link>
        <Link
          href={signUpUrl}
          className={isMobile ? mobileButtonClass : buttonClass}
          onClick={onLinkClick}
        >
          Sign Up
        </Link>
      </div>
    );
  }
};
