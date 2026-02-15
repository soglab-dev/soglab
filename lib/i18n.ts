import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["ko", "en"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that locale is one of our supported locales
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

export { locales };
