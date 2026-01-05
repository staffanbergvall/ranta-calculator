import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { ExtendedYearlyData } from '../../../types/calculator';
import { formatCurrency } from '../../../utils/calculateCompoundInterest';

interface GrowthChartProps {
  data: ExtendedYearlyData[];
  showInflation: boolean;
}

export default function GrowthChart({ data, showInflation }: GrowthChartProps) {
  const chartData = data.map((d) => ({
    år: d.year,
    'Totalt värde': d.value,
    'Insättningar': d.contributions,
    'Ränta': d.interest,
    ...(showInflation &&
      d.inflationAdjustedValue && {
        'Realt värde': d.inflationAdjustedValue,
      }),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4a7c59" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4a7c59" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5a6b3f" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#5a6b3f" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorRealValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c86b4a" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#c86b4a" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
        <XAxis
          dataKey="år"
          className="text-gray-600 dark:text-gray-400"
          label={{ value: 'År', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          className="text-gray-600 dark:text-gray-400"
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          label={{ value: 'Kronor (kr)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
          formatter={(value) => (value ? formatCurrency(Number(value)) : '')}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="Insättningar"
          stroke="#5a6b3f"
          fill="url(#colorContributions)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Totalt värde"
          stroke="#4a7c59"
          fill="url(#colorValue)"
          strokeWidth={3}
        />
        {showInflation && (
          <Line
            type="monotone"
            dataKey="Realt värde"
            stroke="#c86b4a"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
