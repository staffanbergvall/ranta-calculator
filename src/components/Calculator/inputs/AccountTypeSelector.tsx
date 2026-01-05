import { AccountType } from '../../../types/calculator';
import { ACCOUNT_TYPE_DESCRIPTIONS } from '../../../constants/taxRules';
import Tooltip from '../../UI/Tooltip';

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (type: AccountType) => void;
}

export default function AccountTypeSelector({ value, onChange }: AccountTypeSelectorProps) {
  return (
    <div>
      <label className="text-gray-700 dark:text-gray-300 font-medium block mb-2">
        Kontotyp
      </label>
      <div className="flex flex-col gap-3">
        {(Object.keys(ACCOUNT_TYPE_DESCRIPTIONS) as AccountType[]).map((type) => {
          const desc = ACCOUNT_TYPE_DESCRIPTIONS[type];
          const isSelected = value === type;

          return (
            <Tooltip key={type} content={desc.taxInfo}>
              <button
                onClick={() => onChange(type)}
                className={`p-4 rounded-lg border-2 transition-all text-left w-full ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-500'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                  {desc.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{desc.description}</div>
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
