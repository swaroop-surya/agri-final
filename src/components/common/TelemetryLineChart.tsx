import React, { useState } from 'react';

interface DataPoint {
  time: string;
  top: number;
  root: number;
  temp?: number;
}

interface TelemetryLineChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  minOptimal?: number;
  maxOptimal?: number;
}

export const TelemetryLineChart: React.FC<TelemetryLineChartProps> = ({
  data,
  title = 'Soil Moisture Profile (24h Trend)',
  subtitle = 'Topsoil (10cm) vs Root Zone (30cm) Telemetry',
  minOptimal = 30,
  maxOptimal = 50,
}) => {
  const [activePoint, setActivePoint] = useState<DataPoint | null>(null);
  const [selectedRange, setSelectedRange] = useState<'24h' | '7d' | '30d'>('24h');

  // SVG Chart dimensions
  const width = 640;
  const height = 210;
  const padLeft = 38;
  const padRight = 18;
  const padTop = 18;
  const padBottom = 28;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const yMin = 15;
  const yMax = 65;

  const getX = (index: number) => {
    return padLeft + (index / (data.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, val));
    return padTop + chartH - ((clamped - yMin) / (yMax - yMin)) * chartH;
  };

  const topPoints = data.map((d, i) => `${getX(i)},${getY(d.top)}`).join(' ');
  const rootPoints = data.map((d, i) => `${getX(i)},${getY(d.root)}`).join(' ');

  const optimalTopY = getY(maxOptimal);
  const optimalBottomY = getY(minOptimal);
  const optimalHeight = optimalBottomY - optimalTopY;

  return (
    <div className="bg-white border border-[#E3E9E3] rounded-lg p-3.5 sm:p-5 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#EFF6F0] gap-2.5">
        <div>
          <h3 className="text-sm font-semibold text-[#123D2B]">{title}</h3>
          <p className="text-xs text-[#64746A]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#123D2B]">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#123D2B]" />
              Topsoil (10cm)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#216847]">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#216847]" />
              Root Zone (30cm)
            </span>
            <span className="flex items-center gap-1.5 text-[#64746A]">
              <span className="w-2.5 h-1.5 bg-[#DDEDE1] border border-[#CBD5CD]" />
              Target ({minOptimal}-{maxOptimal}%)
            </span>
          </div>

          <div className="flex items-center bg-[#EFF6F0] p-0.5 rounded-md border border-[#E3E9E3]">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                  selectedRange === range
                    ? 'bg-white text-[#123D2B] shadow-xs'
                    : 'text-[#64746A] hover:text-[#123D2B]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 sm:h-52 select-none min-w-[340px]"
          preserveAspectRatio="none"
        >
          {/* Optimal zone band */}
          <rect
            x={padLeft}
            y={optimalTopY}
            width={chartW}
            height={optimalHeight}
            fill="#DDEDE1"
            fillOpacity="0.65"
          />

          {/* Grid lines and Y axis labels */}
          {[20, 30, 40, 50, 60].map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#E3E9E3"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 5}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="#64746A"
                  fontFamily="Inter, sans-serif"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* X axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - 8}
              textAnchor="middle"
              fontSize="9.5"
              fill="#64746A"
              fontFamily="Inter, sans-serif"
            >
              {d.time}
            </text>
          ))}

          {/* Root zone moisture polyline (smooth primary green) */}
          <polyline
            fill="none"
            stroke="#216847"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={rootPoints}
          />

          {/* Topsoil moisture polyline (forest green brand) */}
          <polyline
            fill="none"
            stroke="#123D2B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={topPoints}
          />

          {/* Interactive points */}
          {data.map((d, i) => {
            const x = getX(i);
            const yTop = getY(d.top);
            const isHovered = activePoint?.time === d.time;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setActivePoint(d)}
                onMouseLeave={() => setActivePoint(null)}
              >
                <rect
                  x={x - 14}
                  y={padTop}
                  width={28}
                  height={chartH}
                  fill="transparent"
                />
                <circle
                  cx={x}
                  cy={yTop}
                  r={isHovered ? 5 : 3.5}
                  fill="#123D2B"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <circle
                  cx={x}
                  cy={getY(d.root)}
                  r={isHovered ? 5 : 3.5}
                  fill="#216847"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {activePoint && (
          <div className="absolute top-2 right-2 sm:right-4 bg-[#123D2B] text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-md shadow-md border border-[#216847] pointer-events-none z-10 flex items-center gap-2 sm:gap-3">
            <span className="font-semibold text-[#DDEDE1]">{activePoint.time}</span>
            <span>Top: <strong>{activePoint.top}%</strong></span>
            <span>Root: <strong>{activePoint.root}%</strong></span>
            {activePoint.temp && <span>{activePoint.temp}°C</span>}
          </div>
        )}
      </div>
    </div>
  );
};
