"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MOCK_VEHICLES } from "@/lib/constants";
import { enrichVehicle } from "@/lib/premium-data";
import { Link } from "@/i18n/routing";
import { formatPrice } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";

const QUESTIONS = [
  {
    key: "purpose",
    label: "Seyahat amacınız?",
    options: ["İş", "Tatil", "Aile", "Düğün/Özel"],
  },
  {
    key: "budget",
    label: "Günlük bütçe?",
    options: ["1500₺ altı", "1500-3000₺", "3000₺+", "Fark etmez"],
  },
  {
    key: "passengers",
    label: "Kaç kişi?",
    options: ["1-2", "3-4", "5-7", "7+"],
  },
];

function recommend(budget: string, passengers: string, purpose: string) {
  let list = MOCK_VEHICLES.map(enrichVehicle);
  if (budget === "1500₺ altı") list = list.filter((v) => v.dailyPrice < 1500);
  else if (budget === "1500-3000₺")
    list = list.filter((v) => v.dailyPrice >= 1500 && v.dailyPrice <= 3000);
  else if (budget === "3000₺+") list = list.filter((v) => v.dailyPrice > 3000);
  if (passengers === "5-7" || passengers === "7+")
    list = list.filter((v) => v.seats >= 5);
  if (purpose === "Düğün/Özel")
    list = list.filter(
      (v) => v.category === "luxury" || v.category === "premium"
    );
  return list.slice(0, 3);
}

export function AIVehicleRecommender() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ReturnType<typeof recommend>>([]);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setResults(
        recommend(
          answers.budget || "",
          answers.passengers || "",
          answers.purpose || ""
        )
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800">
      <div className="container-premium">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1 text-sm text-gold">
            <Sparkles className="h-4 w-4" /> AI Araç Önericisi
          </span>
          <h2 className="heading-section text-white">
            Size En Uygun Aracı Bulalım
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-300">
            Birkaç soruya cevap verin, yapay zeka size özel araç önerisi sunsun.
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl bg-white/10 p-6 backdrop-blur-md md:p-8">
          <div className="space-y-6">
            {QUESTIONS.map((q) => (
              <div key={q.key}>
                <p className="mb-3 font-medium text-white">{q.label}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers({ ...answers, [q.key]: opt })}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        answers[q.key] === opt
                          ? "bg-gold text-navy-900"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <Button
              variant="gold"
              className="w-full"
              onClick={submit}
              isLoading={loading}
              disabled={Object.keys(answers).length < 3}
            >
              <Send className="h-4 w-4" />
              AI Önerisi Al
            </Button>
          </div>

          {results.length > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {results.map((v) => (
                <Link
                  key={v.id}
                  href={`/araclar/${v.slug}`}
                  className="overflow-hidden rounded-xl bg-white transition hover:shadow-lg"
                >
                  <div className="relative h-32">
                    <SafeImage
                      src={v.image}
                      alt={v.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-navy-900">{v.name}</p>
                    <p className="text-gold">
                      {formatPrice(v.dailyPrice, "tr")}/gün
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
