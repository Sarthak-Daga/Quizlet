export default function PerformanceChart({ data }: { data: { date: string; score: number }[] }) {
  const maxScore = Math.max(...data.map(d => d.score), 100);
  const minScore = Math.min(0, ...data.map(d => d.score));
  const chartHeight = 200;
  const pointSpacing = 80;
  const chartWidth = Math.max(500, data.length * pointSpacing);

  return (
    <div className="relative h-64 w-full overflow-hidden">
      <div className="absolute inset-0 flex">
        {/* Y-axis labels */}
        <div className="w-10 flex flex-col justify-between pr-2">
          <span className="text-xs text-gray-500 text-right">{maxScore}</span>
          <span className="text-xs text-gray-500 text-right">
            {Math.round((maxScore + minScore) / 2)}
          </span>
          <span className="text-xs text-gray-500 text-right">{minScore}</span>
        </div>

        {/* Chart area */}
        <div className="flex-1 relative overflow-x-auto pb-4">
          <svg 
            width={chartWidth} 
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="min-w-full"
          >
            {/* Horizontal grid lines */}
            <line 
              x1="0" y1="0" 
              x2={chartWidth} y2="0" 
              stroke="#e5e7eb" strokeWidth="1" 
            />
            <line 
              x1="0" y1={chartHeight/2} 
              x2={chartWidth} y2={chartHeight/2} 
              stroke="#e5e7eb" strokeWidth="1" 
            />
            <line 
              x1="0" y1={chartHeight} 
              x2={chartWidth} y2={chartHeight} 
              stroke="#e5e7eb" strokeWidth="1" 
            />

            {/* Data line */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              points={data.map((d, i) => 
                `${40 + i * pointSpacing},${
                  chartHeight - ((d.score - minScore) / (maxScore - minScore)) * chartHeight
                }`
              ).join(' ')}
            />

            {/* Data points and labels */}
            {data.map((d, i) => {
              const x = 40 + i * pointSpacing;
              const y = chartHeight - ((d.score - minScore) / (maxScore - minScore)) * chartHeight;
              
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#3B82F6"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    className="text-sm font-medium fill-gray-800"
                  >
                    {d.score}
                  </text>
                  <text
                    x={x}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                  >
                    {d.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}