import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="text-center py-16 px-4 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-800 max-w-lg mx-auto shadow-xs my-8 transition-colors duration-200">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-950/40 text-[#E21A1A] rounded-xl flex items-center justify-center mx-auto mb-4">
        <Compass className="w-8 h-8" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
        Поездов по вашему запросу не найдено
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Попробуйте изменить параметры поиска, выбрать другой регион или месяц отправления.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E21A1A] hover:bg-[#C81010] text-white text-sm font-semibold rounded-lg shadow-xs transition duration-150 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Сбросить все фильтры</span>
      </button>
    </div>
  );
};
