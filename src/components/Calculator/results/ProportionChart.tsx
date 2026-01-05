import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ExtendedYearlyData } from '../../../types/calculator';
import { formatCurrency } from '../../../utils/calculateCompoundInterest';

interface ProportionChartProps {
  data: ExtendedYearlyData[];
}

export default function ProportionChart({ data }: ProportionChartProps) {
  // Skapa data för var 5:e år (eller alla år om färre än 10 år)
  const interval = data.length > 10 ? 5 : 1;
  const chartData = data
    .filter((d) => d.year % interval === 0 || d.year === data.length)
    .map((d) => ({
      år: `År ${d.year}`,
      Insättningar: d.contributions,
      Ränta: d.interest,
      Skatt: d.taxPaid,
      Avgifter: d.feesPaid,
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
        <XAxis dataKey="år" className="text-gray-600 dark:text-gray-400" />
        <YAxis
          className="text-gray-600 dark:text-gray-400"
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
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
        <Bar dataKey="Insättningar" stackId="a" fill="#5a6b3f" radius={[0, 0, 0, 0]} />
        <Bar dataKey="Ränta" stackId="a" fill="#4a7c59" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Skatt" stackId="b" fill="#c86b4a" radius={[0, 0, 0, 0]} />
        <Bar dataKey="Avgifter" stackId="b" fill="#d4834f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
