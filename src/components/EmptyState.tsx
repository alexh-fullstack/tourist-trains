import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-16 px-4 bg-white dark:bg-[#18181B] rounded-xl border border-dashed border-gray-300 dark:border-zinc-800 max-w-lg mx-auto shadow-xs my-8 transition-colors duration-200">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-[#E21A1A] rounded-xl flex items-center justify-center mx-auto mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
        {t.emptyTitle}
      </h3>
      <p className="text-sm text-gray-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
        {t.emptySubtitle}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E21A1A] hover:bg-[#C81010] text-white text-sm font-semibold rounded-lg shadow-xs transition duration-150 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>{t.emptyResetBtn}</span>
      </button>
    </div>
  );
};
