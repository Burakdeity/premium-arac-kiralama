"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import { PriceSummary } from "./PriceSummary";
import { ReservationPhoneCTA } from "./ReservationPhoneCTA";
import { createReservation } from "@/lib/api";
import { MOCK_LOCATIONS, MOCK_VEHICLES } from "@/lib/constants";
import { calculateDays } from "@/lib/utils";
import type { Vehicle } from "@/lib/types";

interface ReservationFormProps {
  vehicles?: Vehicle[];
  preselectedVehicleId?: number;
  preselectedPickupDate?: string;
  preselectedReturnDate?: string;
  preselectedLocation?: string;
}

export function ReservationForm({
  vehicles = MOCK_VEHICLES,
  preselectedVehicleId,
  preselectedPickupDate,
  preselectedReturnDate,
  preselectedLocation,
}: ReservationFormProps) {
  const t = useTranslations("reservation");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sameLocation, setSameLocation] = useState(true);

  const [form, setForm] = useState({
    vehicleId: preselectedVehicleId || 0,
    pickupLocation: preselectedLocation || "",
    returnLocation: preselectedLocation || "",
    pickupDate: preselectedPickupDate || "",
    returnDate: preselectedReturnDate || "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerIdNumber: "",
    driverLicense: "",
    notes: "",
    extras: [] as number[],
  });

  const locationOptions = MOCK_LOCATIONS.map((loc) => ({
    value: loc.name,
    label: loc.name,
  }));

  const vehicleOptions = [
    { value: "0", label: "Araç seçin" },
    ...vehicles.map((v) => ({
      value: v.id.toString(),
      label: `${v.name} - ${v.dailyPrice}₺/gün`,
    })),
  ];

  const selectedVehicle = vehicles.find((v) => v.id === form.vehicleId);
  const days =
    form.pickupDate && form.returnDate
      ? calculateDays(form.pickupDate, form.returnDate)
      : 0;

  const subtotal = selectedVehicle ? selectedVehicle.dailyPrice * days : 0;
  const tax = Math.round(subtotal * 0.2);
  const total = subtotal + tax;

  const breakdown = {
    dailyRate: selectedVehicle?.dailyPrice || 0,
    days,
    subtotal,
    extrasTotal: 0,
    discount: 0,
    tax,
    total,
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const reservation = await createReservation(form);
      router.push(`/rezervasyon/${reservation.reservationNumber}`);
    } catch {
      setLoading(false);
    }
  };

  const steps = [
    t("steps.vehicle"),
    t("steps.details"),
    t("steps.summary"),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-8 flex gap-2">
          {steps.map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i + 1)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                step === i + 1
                  ? "bg-gold text-navy-900"
                  : step > i + 1
                  ? "bg-gold/20 text-navy-900"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6">
            <Select
              label="Araç"
              options={vehicleOptions}
              value={form.vehicleId.toString()}
              onChange={(e) =>
                setForm({ ...form, vehicleId: parseInt(e.target.value) })
              }
              required
            />
            <Select
              label={t("form.pickupLocation")}
              options={locationOptions}
              value={form.pickupLocation}
              onChange={(e) => {
                setForm({
                  ...form,
                  pickupLocation: e.target.value,
                  returnLocation: sameLocation
                    ? e.target.value
                    : form.returnLocation,
                });
              }}
              required
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sameLocation}
                onChange={(e) => {
                  setSameLocation(e.target.checked);
                  if (e.target.checked) {
                    setForm({ ...form, returnLocation: form.pickupLocation });
                  }
                }}
                className="rounded border-gray-300 text-gold focus:ring-gold"
              />
              {t("form.sameLocation")}
            </label>
            {!sameLocation && (
              <Select
                label={t("form.returnLocation")}
                options={locationOptions}
                value={form.returnLocation}
                onChange={(e) =>
                  setForm({ ...form, returnLocation: e.target.value })
                }
                required
              />
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <DatePicker
                label={t("form.pickupDate")}
                value={form.pickupDate}
                onChange={(d) => setForm({ ...form, pickupDate: d })}
                locale={locale}
                required
              />
              <DatePicker
                label={t("form.returnDate")}
                value={form.returnDate}
                onChange={(d) => setForm({ ...form, returnDate: d })}
                locale={locale}
                minDate={form.pickupDate}
                required
              />
            </div>
            <Button
              variant="gold"
              onClick={() => setStep(2)}
              disabled={!form.vehicleId || !form.pickupDate || !form.returnDate}
            >
              {tCommon("next")}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6">
            <ReservationPhoneCTA />
            <Input
              label={t("form.customerName")}
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={t("form.customerEmail")}
                type="email"
                value={form.customerEmail}
                onChange={(e) =>
                  setForm({ ...form, customerEmail: e.target.value })
                }
              />
              <Input
                label={t("form.customerPhone")}
                type="tel"
                value={form.customerPhone}
                onChange={(e) =>
                  setForm({ ...form, customerPhone: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={t("form.customerIdNumber")}
                value={form.customerIdNumber}
                onChange={(e) =>
                  setForm({ ...form, customerIdNumber: e.target.value })
                }
              />
              <Input
                label={t("form.driverLicense")}
                value={form.driverLicense}
                onChange={(e) =>
                  setForm({ ...form, driverLicense: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-navy-700">
                {t("form.notes")}
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="input-premium resize-none"
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                {tCommon("back")}
              </Button>
              <Button
                variant="gold"
                onClick={() => setStep(3)}
                disabled={!form.customerName || !form.customerPhone}
              >
                {tCommon("next")}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6">
            <h3 className="text-lg font-semibold text-navy-900">
              {t("steps.summary")}
            </h3>
            <p className="text-sm text-gray-600">{t("phoneFlow.notice")}</p>
            {selectedVehicle && (
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="font-semibold">{selectedVehicle.name}</p>
                <p className="text-sm text-gray-600">
                  {form.pickupLocation} → {form.returnLocation}
                </p>
                <p className="text-sm text-gray-600">
                  {form.pickupDate} - {form.returnDate} ({days} gün)
                </p>
                <p className="text-sm text-gray-600">{form.customerName}</p>
                <p className="text-sm text-gray-600">{form.customerPhone}</p>
              </div>
            )}
            <ReservationPhoneCTA variant="compact" />
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                {tCommon("back")}
              </Button>
              <Button
                variant="gold"
                onClick={handleSubmit}
                isLoading={loading}
              >
                {loading ? t("processing") : t("submit")}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div>
        <PriceSummary breakdown={breakdown} />
      </div>
    </div>
  );
}
