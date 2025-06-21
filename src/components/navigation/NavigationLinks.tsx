import Link from "next/link";

interface NavigationLinksProps {
  className?: string;
  onLinkClick?: () => void;
}

export const NavigationLinks = ({
  className = "",
  onLinkClick,
}: NavigationLinksProps) => {
  const links = [
    { href: "/plants", label: "Plants" },
    { href: "/", label: "Home" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-muted-foreground hover:text-foreground transition-colors font-medium ${className}`}
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};
