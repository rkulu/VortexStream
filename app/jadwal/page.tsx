import Link from "next/link";
import { getSchedule } from "@/lib/api";
import { ScheduleDay } from "@/lib/types";

export const dynamic = "force-dynamic";

const daysOrder: ScheduleDay[] = [
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
  "minggu",
];

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

interface JadwalPageProps {
  searchParams: Promise<{
    day?: string;
  }>;
}

export default async function JadwalPage({
  searchParams,
}: JadwalPageProps) {
  const params = await searchParams;

  const selectedDay = (
    params.day?.toLowerCase() || "all"
  ) as ScheduleDay;

  let schedule;

  try {
    schedule = await getSchedule(selectedDay);
  } catch {
    schedule = {
      data: [],
      day: selectedDay,
      available_days: [],
    };
  }

  const today = new Date();

  const dayNames = [
    "minggu",
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
  ];

  const todayName = dayNames[today.getDay()];

  const getHref = (item: any) => {
    const type = item.type?.toLowerCase();

    if (type === "film") {
      return `/film/${item.id}`;
    }

    if (type === "series") {
      return `/series/${item.id}`;
    }

    return `/anime/${item.id}`;
  };

  return (
    <div>
      <div className="liquid-glass rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Jadwal Rilis
        </h1>

        <p className="text-zinc-400 text-sm">
          Jadwal rilis anime berdasarkan hari
        </p>
      </div>

      {/* FILTER HARI */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/jadwal?day=all"
          className={`px-4 py-2 rounded-xl text-sm transition ${selectedDay === "all"
            ? "bg-accent text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
        >
          Semua
        </Link>

        {daysOrder.map((day) => {
          const isToday = day === todayName;

          return (
            <Link
              key={day}
              href={`/jadwal?day=${day}`}
              className={`px-4 py-2 rounded-xl text-sm transition flex items-center gap-2 ${selectedDay === day
                ? "bg-accent text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
            >
              {capitalize(day)}

              {isToday && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
                  Today
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* LIST ANIME */}
      {schedule.data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {schedule.data.map((item: any) => (
            <Link
              key={item.id}
              href={getHref(item)}
              className="glass-card overflow-hidden group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                <img
                  src={
                    item.image ||
                    "https://placehold.co/300x450?text=No+Image"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-2 text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between mt-2 text-xs text-zinc-400">
                  <span>{item.type}</span>

                  {item.time && (
                    <span>{item.time}</span>
                  )}
                </div>

                {item.score &&
                  item.score !== "-" && (
                    <p className="text-xs text-yellow-400 mt-1">
                      ⭐ {item.score}
                    </p>
                  )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="liquid-glass rounded-2xl p-8 text-center text-zinc-400">
          Tidak ada anime pada hari ini
        </div>
      )}
    </div>
  );
}