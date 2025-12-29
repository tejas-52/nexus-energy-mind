import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="flex items-center gap-2 text-sm font-medium"
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
      <span className="sm:hidden">
        {language === 'en' ? 'हि' : 'EN'}
      </span>
    </Button>
  );
};
