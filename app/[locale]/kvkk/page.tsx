import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kvkk" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function KvkkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "kvkk" });

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
            <h2>Veri Sorumlusu</h2>
            <p>
              RK Rent A Car (&quot;Şirket&quot;) olarak, 6698 sayılı
              Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında
              veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan
              amaçlar doğrultusunda işlemekteyiz.
            </p>

            <h2>İşlenen Kişisel Veriler</h2>
            <ul>
              <li>Kimlik bilgileri (ad, soyad, TC kimlik no)</li>
              <li>İletişim bilgileri (telefon, e-posta, adres)</li>
              <li>Sürücü belgesi bilgileri</li>
              <li>Rezervasyon ve ödeme bilgileri</li>
              <li>Web sitesi kullanım verileri (çerezler)</li>
            </ul>

            <h2>İşleme Amaçları</h2>
            <p>
              Kişisel verileriniz; araç kiralama hizmetlerinin sunulması,
              sözleşmelerin kurulması ve ifası, yasal yükümlülüklerin yerine
              getirilmesi, müşteri memnuniyetinin sağlanması ve pazarlama
              faaliyetlerinin yürütülmesi amaçlarıyla işlenmektedir.
            </p>

            <h2>Veri Aktarımı</h2>
            <p>
              Kişisel verileriniz, yasal zorunluluklar ve hizmet sağlayıcılarımız
              (ödeme kuruluşları, sigorta şirketleri) ile sınırlı olmak üzere
              üçüncü taraflarla paylaşılabilir.
            </p>

            <h2>Haklarınız</h2>
            <p>KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
            </ul>

            <h2>İletişim</h2>
            <p>
              KVKK kapsamındaki taleplerinizi{" "}
              <a href="mailto:rkrentacars@gmail.com">
                rkrentacars@gmail.com
              </a>{" "}
              adresine iletebilirsiniz.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
