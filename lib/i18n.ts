import { getRequestConfig } from "next-intl/server";

const locales = ["ko", "en"] as const;

export default getRequestConfig(async () => {
  // For static export, we use default locale here
  // The actual locale is handled by getStaticParams in the layout
  return {
    locale: "ko",
    messages: (await import(`../messages/ko.json`)).default,
  };
});

export { locales };
