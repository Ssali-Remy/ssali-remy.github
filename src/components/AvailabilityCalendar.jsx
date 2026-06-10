import { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Mock blocked dates per unit. Replace with a live calendar feed later.
function addDays(n) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

const BOOKED = {
  "kansanga-1": [addDays(7), addDays(8), addDays(20), addDays(21)],
  "kansanga-2": [addDays(3), addDays(4), addDays(5)],
  "munyonyo-3": [addDays(10), addDays(11), addDays(12), addDays(13)],
};

export default function AvailabilityCalendar({ unitId }) {
  const booked = BOOKED[unitId] || [];
  const todayPlusYear = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d;
  }, []);

  return (
    <div className="rounded-3xl bg-white shadow-soft ring-1 ring-brand-beige/60 p-4 sm:p-6">
      <div className="flex items-center gap-4 mb-4 text-xs">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-brand-maroon" />
          Booked
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-brand-beige border border-brand-sand" />
          Available
        </span>
      </div>
      <div className="calendar-full-width">
        <DatePicker
          inline
          monthsShown={1}
          minDate={new Date()}
          maxDate={todayPlusYear}
          excludeDates={booked}
          readOnly
          onChange={() => {}}
          renderDayContents={(day) => <span>{day}</span>}
        />
      </div>
      <p className="mt-4 text-xs text-brand-ink/55 text-center">
        Booked dates are shown in maroon. The calendar refreshes regularly —
        please confirm availability with the host before travelling.
      </p>
    </div>
  );
}
