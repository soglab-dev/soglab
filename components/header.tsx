"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { usePathname } from "next/navigation";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Soglab</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            // Get the locale from current pathname
            const locale = pathname.split("/")[1] || "ko";
            // Construct localized href correctly
            // If item.href is '/', result is simply `/${locale}`
            // Otherwise it is `/${locale}${item.href}`
            const localizedHref = item.href === "/" ? `/${locale}` : `/${locale}${item.href}`;

            return (
              <Link
                key={item.href}
                href={localizedHref}
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === localizedHref ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
