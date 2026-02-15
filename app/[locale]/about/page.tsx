import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-center">{t("title")}</h1>

          <div className="prose prose-lg mx-auto dark:prose-invert">
            <p className="text-2xl font-semibold text-primary mb-8 text-center">
              {t("vision")}
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              {t("description")}
            </p>

            <div className="my-12 p-6 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Core Values</h3>
              <ul className="space-y-2">
                <li><strong>혁신:</strong> 최신 기술을 통해 새로운 가능성을 탐구합니다</li>
                <li><strong>품질:</strong> 모든 프로젝트에서 엄격한 품질 기준을 유지합니다</li>
                <li><strong>협업:</strong> 투명한 커뮤니케이션과 고객 중심 접근</li>
              </ul>
            </div>

            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-muted-foreground">
                프로젝트 문의: contact@soglab.com
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
