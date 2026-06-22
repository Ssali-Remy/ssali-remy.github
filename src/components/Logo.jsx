import { logoMark } from "../data/images-logo";

export default function Logo({ stacked = false, className = "" }) {
  return (
    <div
      className={`flex ${stacked ? "flex-col items-center gap-2" : "items-center gap-3"} ${className}`}
    >
      <img
        src={logoMark}
        alt="Elyon Nest"
        className={stacked ? "h-16 w-auto" : "h-12 w-auto"}
        draggable="false"
      />
      <span
        className={`font-sketch text-brand-maroon ${stacked ? "text-2xl" : "text-lg"} leading-tight italic whitespace-nowrap`}
      >
        Simple Made Perfect
      </span>
    </div>
  );
}
