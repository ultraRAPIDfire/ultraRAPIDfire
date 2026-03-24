type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionTitle({ eyebrow, title, subtitle, center }: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <div className="text-xs font-semibold text-gray-500 tracking-wide">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}