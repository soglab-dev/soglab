import createMiddleware from "next-intl/middleware";
import { locales } from "./lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "ko",
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(ko|en)/:path*"],
};
