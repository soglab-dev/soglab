import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("hero.subtitle")}
            </p>
            <Button size="lg" asChild>
              <a href="#projects">{t("hero.cta")}</a>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="container py-24 bg-muted/50">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("services.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{t("services.software.title")}</h3>
              <p className="text-muted-foreground">{t("services.software.description")}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{t("services.game.title")}</h3>
              <p className="text-muted-foreground">{t("services.game.description")}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{t("services.ai.title")}</h3>
              <p className="text-muted-foreground">{t("services.ai.description")}</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("projects.title")}</h2>
            <p className="text-xl text-muted-foreground">{t("projects.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="container py-24 bg-muted/50">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">{t("about.title")}</h2>
            <p className="text-2xl font-semibold text-primary mb-6">{t("about.vision")}</p>
            <p className="text-lg text-muted-foreground">{t("about.description")}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
