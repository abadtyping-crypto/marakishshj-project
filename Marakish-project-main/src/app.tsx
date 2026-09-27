import 'src/global.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';

import { SearchProvider } from 'src/components/search-context';

import { AuthProvider } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  const { i18n } = useTranslation();
  useScrollToTop();

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
