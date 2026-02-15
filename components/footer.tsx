import { useTranslations } from "next-intl";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            {t("copyright")}
          </p>

          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/soglab" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/company/soglab" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
