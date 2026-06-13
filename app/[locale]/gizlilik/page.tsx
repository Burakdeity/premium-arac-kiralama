import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="section-padding">
      <div className="container-premium max-w-4xl">
        <AnimatedSection className="mb-12">
          <h1 className="heading-section mb-4 text-navy-900">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
          <p className="mt-2 text-sm text-gray-500">
            {t("lastUpdated")}: 1 Ocak 2024
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="prose prose-lg max-w-none prose-headings:text-navy-900">
            <h2>Giriş</h2>
            <p>
              RK Rent A Car olarak gizliliğinize saygı duyuyor ve
              kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu
              Gizlilik Politikası, web sitemizi kullanırken toplanan bilgilerin
              nasıl işlendiğini açıklamaktadır.
            </p>

            <h2>Toplanan Bilgiler</h2>
            <p>Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
            <ul>
              <li>Rezervasyon formları aracılığıyla sağladığınız kişisel bilgiler</li>
              <li>IP adresi ve tarayıcı bilgileri</li>
              <li>Çerezler aracılığıyla toplanan kullanım verileri</li>
              <li>İletişim formları aracılığıyla gönderilen mesajlar</li>
            </ul>

            <h2>Çerezler</h2>
            <p>
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler
              kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı
              bırakabilirsiniz, ancak bu durumda bazı site özellikleri düzgün
              çalışmayabilir.
            </p>

            <h2>Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizi korumak için endüstri standardı güvenlik
              önlemleri uyguluyoruz. Verileriniz SSL şifrelemesi ile korunmakta
              ve güvenli sunucularda saklanmaktadır.
            </p>

            <h2>Üçüncü Taraf Hizmetler</h2>
            <p>
              Ödeme işlemleri için güvenilir üçüncü taraf ödeme sağlayıcıları
              kullanılmaktadır. Bu sağlayıcılar kendi gizlilik politikalarına
              tabidir.
            </p>

            <h2>Değişiklikler</h2>
            <p>
              Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli
              değişiklikler web sitemizde duyurulacaktır.
            </p>

            <h2>İletişim</h2>
            <p>
              Gizlilik ile ilgili sorularınız için{" "}
              <a href="mailto:rkrentacars@gmail.com">
                rkrentacars@gmail.com
              </a>{" "}
              adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
