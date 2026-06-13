"use client";

import { useState, useRef, useEffect } from "react";
import { format, addDays, isBefore, isAfter, startOfDay } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  label?: string;
  minDate?: string;
  maxDate?: string;
  placeholder?: string;
  locale?: string;
  error?: string;
  required?: boolean;
}

export function DatePicker({
  value,
  onChange,
  label,
  minDate,
  maxDate,
  placeholder = "Tarih seçin",
  locale = "tr",
  error,
  required,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const dateLocale = locale === "tr" ? tr : enUS;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDate = value ? new Date(value) : null;
  const min = minDate ? startOfDay(new Date(minDate)) : startOfDay(new Date());
  const max = maxDate ? startOfDay(new Date(maxDate)) : undefined;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const isDisabled = (date: Date) => {
    if (isBefore(date, min)) return true;
    if (max && isAfter(date, max)) return true;
    return false;
  };

  const handleSelect = (date: Date) => {
    onChange(format(date, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const days = getDaysInMonth(viewDate);
  const weekDays =
    locale === "tr"
      ? ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"]
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-navy-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "input-premium flex items-center justify-between text-left",
          error && "border-red-500",
          !value && "text-gray-400"
        )}
      >
        <span>
          {selectedDate
            ? format(selectedDate, "d MMMM yyyy", { locale: dateLocale })
            : placeholder}
        </span>
        <Calendar className="h-5 w-5 text-gray-400" />
      </button>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full min-w-[280px] rounded-xl border border-gray-100 bg-white p-4 shadow-premium-lg">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))
              }
              className="rounded-lg p-1 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-semibold text-navy-900">
              {format(viewDate, "MMMM yyyy", { locale: dateLocale })}
            </span>
            <button
              type="button"
              onClick={() =>
                setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))
              }
              className="rounded-lg p-1 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day) => (
              <div key={day} className="py-1 text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const disabled = isDisabled(day);
              const isSelected =
                selectedDate &&
                format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelect(day)}
                  className={cn(
                    "rounded-lg py-2 text-sm transition-colors",
                    disabled && "cursor-not-allowed text-gray-300",
                    !disabled && "hover:bg-gold/10",
                    isSelected && "bg-gold text-navy-900 font-semibold"
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { addDays };
