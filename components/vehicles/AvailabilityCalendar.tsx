"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isBefore,
  startOfDay,
} from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  blockedDates?: string[];
  selectedPickup?: string;
  selectedReturn?: string;
  onSelectPickup?: (date: string) => void;
  onSelectReturn?: (date: string) => void;
}

export function AvailabilityCalendar({
  blockedDates = [],
  selectedPickup,
  selectedReturn,
  onSelectPickup,
  onSelectReturn,
}: AvailabilityCalendarProps) {
  const t = useTranslations("vehicles");
  const locale = useLocale();
  const dateLocale = locale === "tr" ? tr : enUS;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<"pickup" | "return">("pickup");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays =
    locale === "tr"
      ? ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"]
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const isBlocked = (date: Date) =>
    blockedDates.includes(format(date, "yyyy-MM-dd"));

  const isPast = (date: Date) =>
    isBefore(date, startOfDay(new Date()));

  const handleDayClick = (date: Date) => {
    if (isBlocked(date) || isPast(date)) return;
    const dateStr = format(date, "yyyy-MM-dd");

    if (selecting === "pickup") {
      onSelectPickup?.(dateStr);
      setSelecting("return");
    } else {
      if (selectedPickup && dateStr >= selectedPickup) {
        onSelectReturn?.(dateStr);
        setSelecting("pickup");
      }
    }
  };

  const isInRange = (date: Date) => {
    if (!selectedPickup || !selectedReturn) return false;
    const d = format(date, "yyyy-MM-dd");
    return d >= selectedPickup && d <= selectedReturn;
  };

  const paddingDays = monthStart.getDay();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="mb-4 font-semibold text-navy-900">{t("availability")}</h3>

      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="rounded-lg p-1 hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold">
          {format(currentMonth, "MMMM yyyy", { locale: dateLocale })}
        </span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="rounded-lg p-1 hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map((day) => (
          <div key={day} className="py-2 text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: paddingDays }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const blocked = isBlocked(day);
          const past = isPast(day);
          const pickup = selectedPickup && isSameDay(day, new Date(selectedPickup));
          const ret = selectedReturn && isSameDay(day, new Date(selectedReturn));
          const inRange = isInRange(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              disabled={blocked || past}
              className={cn(
                "rounded-lg py-2 text-sm transition-colors",
                (blocked || past) && "cursor-not-allowed text-gray-300",
                !blocked && !past && "hover:bg-gold/10",
                inRange && !pickup && !ret && "bg-gold/20",
                pickup && "bg-gold text-navy-900 font-semibold",
                ret && "bg-navy text-white font-semibold"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-gold" /> Alış
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-navy" /> İade
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-gray-200" /> Dolu
        </span>
      </div>
    </div>
  );
}
