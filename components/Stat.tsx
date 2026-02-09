import AnimatedNumber from "./AnimatedNumber";

interface StatProps {
  label: string;
  value: number | string;
  animate?: boolean;
}

export default function Stat({ label, value, animate = false }: StatProps) {
  return (
    <div className="border border-gray-200 rounded-lg px-4 py-5 text-center bg-gray-50">
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>

      <p className="mt-2 text-xl font-semibold text-gray-900">
        {animate && typeof value === "number" ? (
          <AnimatedNumber value={value} />
        ) : (
          value
        )}
      </p>
    </div>
  );
}
