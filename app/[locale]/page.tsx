import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { ArrowRight, Code2, Gamepad2, BrainCircuit } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob delay-2000" />
      </div>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-32 md:py-48 relative">
          <div className="mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
            <ScrollReveal direction="down">
              <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-primary mb-4 border border-primary/20">
                Innovating the Future
              </div>
            </ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-gradient block pb-2">
                <TextReveal>{t("hero.title")}</TextReveal>
              </span>
            </h1>
            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ScrollReveal delay={0.4} className="inline-block">
                <MagneticButton strength={0.2}>
                  <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
                    <a href="#projects">
                      {t("hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </MagneticButton>
              </ScrollReveal>
              <ScrollReveal delay={0.5} className="inline-block">
                <MagneticButton strength={0.2}>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full glass hover:bg-background/80" asChild>
                    <a href="#about">Learn More</a>
                  </Button>
                </MagneticButton>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="container py-24">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16 relative">
              <span className="relative z-10">{t("services.title")}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary/50 rounded-full" />
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1} direction="left">
              <div className="glass p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t("services.software.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("services.software.description")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="glass p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t("services.game.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("services.game.description")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3} direction="right">
              <div className="glass p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t("services.ai.title")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("services.ai.description")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container py-24">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t("projects.title")}</h2>
              <p className="text-xl text-muted-foreground">{t("projects.subtitle")}</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent -z-10" />
          <ScrollReveal direction="up" distance={50}>
            <div className="mx-auto max-w-4xl text-center glass p-12 rounded-3xl border-primary/10">
              <h2 className="text-3xl font-bold mb-8">{t("about.title")}</h2>
              <p className="text-3xl font-bold text-gradient mb-8 leading-tight">
                &quot;{t("about.vision")}&quot;
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.description")}
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
