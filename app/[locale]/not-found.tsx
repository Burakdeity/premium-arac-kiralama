import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-gold">404</h1>
      <p className="mt-4 text-xl text-gray-600">{t("noResults")}</p>
      <Link href="/" className="mt-8">
        <Button variant="gold">Ana Sayfa</Button>
      </Link>
    </div>
  );
}
