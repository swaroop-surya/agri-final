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
  iconBgColor = 'bg-[#143823]/10 text-[#143823]',
  badge,
}) => {
  return (
    <div className="bg-white border border-[#e1e6dc] rounded-lg p-4 shadow-xs hover:border-[#cbd5c5] transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5f7464]">
          {label}
        </span>
        <div className={`p-2 rounded-md ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-[#143823]">
          {value}
        </span>
        {badge && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-[#e8f5e9] text-[#1b4332] border border-[#c8e6c9]">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-[#526054]">
        {subValue && <span>{subValue}</span>}
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-medium ${
              trend.neutral
                ? 'text-gray-500'
                : trend.isPositive
                ? 'text-[#2d6a4f]'
                : 'text-amber-700'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
