import { useState } from 'react';
import { calculateCompoundInterest, formatCurrency } from '../utils/calculateCompoundInterest';
import { CalculatorParams } from '../types/calculator';

export default function CompoundInterestCalculator() {
  const [params, setParams] = useState<CalculatorParams>({
    initialAmount: 10000,
    monthlyContribution: 1000,
    annualInterestRate: 7,
    years: 10,
  });

  const result = calculateCompoundInterest(params);

  const updateParam = (key: keyof CalculatorParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (
    key: keyof CalculatorParams,
    value: string,
    min: number,
    max: number
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, min), max);
      updateParam(key, clampedValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Räntekalkylator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Beräkna ränta-på-ränta effekten över tid
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Parametrar</h2>

          <div className="space-y-6">
            {/* Initial Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Startkapital</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="500000"
                    step="1000"
                    value={params.initialAmount}
                    onChange={(e) => handleInputChange('initialAmount', e.target.value, 0, 500000)}
                    className="w-32 px-3 py-1 text-right text-lg font-semibold text-indigo-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-600">kr</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="1000"
                value={params.initialAmount}
                onChange={(e) => updateParam('initialAmount', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 kr</span>
                <span>500 000 kr</span>
              </div>
            </div>

            {/* Monthly Contribution */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Månadssparande</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    step="100"
                    value={params.monthlyContribution}
                    onChange={(e) => handleInputChange('monthlyContribution', e.target.value, 0, 10000)}
                    className="w-32 px-3 py-1 text-right text-lg font-semibold text-indigo-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-600">kr</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={params.monthlyContribution}
                onChange={(e) => updateParam('monthlyContribution', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 kr</span>
                <span>10 000 kr</span>
              </div>
            </div>

            {/* Annual Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Årlig ränta</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={params.annualInterestRate}
                    onChange={(e) => handleInputChange('annualInterestRate', e.target.value, 0, 20)}
                    className="w-24 px-3 py-1 text-right text-lg font-semibold text-indigo-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-600">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={params.annualInterestRate}
                onChange={(e) => updateParam('annualInterestRate', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Years */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Antal år</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="40"
                    step="1"
                    value={params.years}
                    onChange={(e) => handleInputChange('years', e.target.value, 1, 40)}
                    className="w-24 px-3 py-1 text-right text-lg font-semibold text-indigo-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-600">år</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={params.years}
                onChange={(e) => updateParam('years', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 år</span>
                <span>40 år</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resultat</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <p className="text-sm text-gray-600 mb-1">Totalt värde</p>
              <p className="text-3xl font-bold text-green-700">
                {formatCurrency(result.totalValue)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <p className="text-sm text-gray-600 mb-1">Totalt insatt</p>
              <p className="text-3xl font-bold text-blue-700">
                {formatCurrency(result.totalContributions)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <p className="text-sm text-gray-600 mb-1">Ränta</p>
              <p className="text-3xl font-bold text-purple-700">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>
          </div>

          {/* Yearly Breakdown */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Utveckling per år</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">År</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Värde</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Insatt</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Ränta</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((data) => (
                    <tr key={data.year} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{data.year}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-800">
                        {formatCurrency(data.value)}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {formatCurrency(data.contributions)}
                      </td>
                      <td className="py-3 px-4 text-right text-purple-600 font-medium">
                        {formatCurrency(data.interest)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
