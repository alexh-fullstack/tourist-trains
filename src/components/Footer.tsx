import React from 'react';
import { ShieldCheck, Zap, Globe, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#18181B] dark:bg-[#121214] text-zinc-400 text-sm border-t border-zinc-800 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Brand Info matching Header sizing */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-[#E21A1A] text-white font-extrabold px-3 py-1 text-lg sm:text-xl tracking-tight rounded-xs select-none shadow-xs leading-normal">
                ТЖД
              </div>
              <div className="leading-tight">
                <span className="font-bold text-white text-xs sm:text-sm block tracking-tight">
                  {t.brandName}
                </span>
                <span className="text-[10px] text-zinc-400 block font-normal">
                  {t.brandSubtitle}
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed pt-1">
              {t.footerAbout}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              {t.footerPassengers}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="hover:text-white transition cursor-pointer">{t.navCatalog}</li>
              <li className="hover:text-white transition cursor-pointer">{t.footerRules}</li>
              <li className="hover:text-white transition cursor-pointer">{t.footerLoyalty}</li>
              <li className="hover:text-white transition cursor-pointer">{t.footerFamily}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              {t.footerFeatures}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.footerFeature1}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{t.footerFeature2}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#E21A1A]" />
                <span>{t.footerFeature3}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              {t.footerContacts}
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E21A1A]" />
                <span className="font-semibold text-zinc-200">123-345-67-89</span>
              </div>
              <div className="text-[11px] text-zinc-500">{t.footerCallFree}</div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>support@tour-trains.ru</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>{t.footerCopyright}</div>
          <div>{t.footerDemoNote}</div>
        </div>
      </div>
    </footer>
  );
};
