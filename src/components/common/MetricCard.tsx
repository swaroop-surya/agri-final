import React, { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    neutral?: boolean;
  };
  icon: ReactNode;
  iconBgColor?: string;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  trend,
  icon,
  iconBgColor = 'bg-[#EFF6F0] text-[#216847]',
  badge,
}) => {
  return (
    <div className="bg-white border border-[#E3E9E3] rounded-lg p-4 shadow-xs hover:border-[#CBD5CD] transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64746A]">
          {label}
        </span>
        <div className={`p-2 rounded-md ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-[#123D2B]">
          {value}
        </span>
        {badge && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-[#E4F4E8] text-[#216847] border border-[#DDEDE1]">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-[#64746A]">
        {subValue && <span>{subValue}</span>}
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold ${
              trend.neutral
                ? 'text-[#64746A]'
                : trend.isPositive
                ? 'text-[#216847]'
                : 'text-[#8A5A00]'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
