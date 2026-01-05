import { useState } from 'react';
import { useScenariosStore } from '../../stores/scenariosStore';
import { useCalculatorStore } from '../../stores/calculatorStore';
import ScenarioCard from './ScenarioCard';
import PresetProfiles from './PresetProfiles';

export default function ScenarioManager() {
  const { scenarios, saveScenario } = useScenariosStore();
  const { params } = useCalculatorStore();
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleSave = () => {
    if (scenarioName.trim()) {
      saveScenario(scenarioName.trim(), params);
      setScenarioName('');
      setShowSaveForm(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Preset Profiles */}
      <PresetProfiles />

      {/* Save Current Scenario */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Spara Nuvarande Beräkning
        </h3>

        {!showSaveForm ? (
          <button
            onClick={() => setShowSaveForm(true)}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Spara som nytt scenario
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              placeholder="Namn på scenario (t.ex. 'Pension 2050')"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!scenarioName.trim()}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                Spara
              </button>
              <button
                onClick={() => {
                  setShowSaveForm(false);
                  setScenarioName('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
              >
                Avbryt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Saved Scenarios */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Sparade Scenarier ({scenarios.length})
        </h3>

        {scenarios.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              Inga sparade scenarier ännu. Spara din första beräkning för att jämföra olika
              alternativ!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
