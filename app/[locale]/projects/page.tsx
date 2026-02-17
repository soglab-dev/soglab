import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export default function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("projects");
  const tItems = useTranslations("project_items");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              title={tItems(`${project.slug}.title`)}
              description={tItems(`${project.slug}.description`)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
