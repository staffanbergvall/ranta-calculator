import { PRESET_PROFILES } from '../../constants/presets';
import { useCalculatorStore } from '../../stores/calculatorStore';

export default function PresetProfiles() {
  const { setParams } = useCalculatorStore();

  const handleApplyPreset = (presetParams: typeof PRESET_PROFILES[0]['params']) => {
    setParams(presetParams);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Förinställda Profiler
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Välj en profil baserat på din risktolerans och investeringshorisont.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESET_PROFILES.map((profile) => (
          <button
            key={profile.name}
            onClick={() => handleApplyPreset(profile.params)}
            className="text-left p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all group"
            style={{
              background: `linear-gradient(135deg, ${profile.color}15 0%, ${profile.color}05 100%)`,
            }}
          >
            <div
              className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: profile.color }}
            >
              {profile.name[0]}
            </div>

            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {profile.name}
            </h4>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {profile.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Ränta:</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {profile.params.annualInterestRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Avgift:</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {profile.params.managementFeePercent}%
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
