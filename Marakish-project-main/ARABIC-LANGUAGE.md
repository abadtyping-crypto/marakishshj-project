# Arabic Language Support - Marakish

## ✅ Arabic (UAE) Language Integration Complete!

The application now supports **bilingual functionality** with English and Arabic (العربية).

###  Languages Supported:
- 🇬🇧 **English** (Default)
- 🇦🇪 **Arabic (UAE)** with RTL support

### 🔄 How to Switch Languages:

**In the Dashboard:**
1. Look for the language flag icon (🇬🇧/🇦🇪) in the top-right corner
2. Click the flag
3. Select your preferred language

The interface will instantly switch and apply RTL (Right-to-Left) layout for Arabic!

### 📝 What's Translated:

#### Navigation Menu:
- Dashboard → لوحة التحكم
- User → المستخدم  
- List Of Vehicles → قائمة المركبات
- Purchase Vehicle → شراء مركبة
- Sell Vehicle → بيع مركبة
- Vehicle Expense → مصروفات المركبة
- Bank Portals → البوابات المصرفية

#### Authentication:
- Sign in → تسجيل الدخول
- Sign in with Google → تسجيل الدخول بواسطة Google
- Welcome back message → مرحباً بعودتك
- Forgot password → نسيت كلمة المرور
- Email address → عنوان البريد الإلكتروني
- Logout → تسجيل الخروج

#### Common Terms:
- Loading, Error, Success
- Save, Delete, Edit, Add
- Search, Filter, Export
- Cancel, Confirm, Close
- And more...

### 🎨 RTL Support:

When Arabic is selected:
- ✅ Text direction changes to right-to-left
- ✅ Layout mirrors automatically
- ✅ Icons and buttons reposition correctly
- ✅ Navigation drawer opens from the right
- ✅ Forms and inputs align to the right

### 🔧 Technical Implementation:

**Libraries Used:**
- `i18next` - Internationalization framework
- `react-i18next` - React bindings
- `i18next-browser-languagedetector` - Auto-detect user language

**Files Added/Modified:**
- `src/i18n.ts` - Translation configuration
- `src/layouts/components/language-switcher.tsx` - Language selector component
- `src/layouts/dashboard/nav.tsx` - Navigation with translations
- `src/layouts/dashboard/layout.tsx` - Language switcher integration
- `src/layouts/nav-config-dashboard.tsx` - Translation keys added
- `src/main.tsx` - i18n initialization

### 📂 Adding More Translations:

To add more translated text, edit `src/i18n.ts`:

```typescript
const resources = {
  en: {
    translation: {
      yourKey: 'Your English Text',
    },
  },
  ar: {
    translation: {
      yourKey: 'النص العربي الخاص بك',
    },
  },
};
```

Then use it in your component:
```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <div>{t('yourKey')}</div>;
}
```

### 💾 Language Persistence:

The selected language is automatically saved to `localStorage` and will persist across browser sessions!

### 🌐 Next Steps for Full Translation:

The foundation is set! To translate remaining pages:
1. Add translation keys to `src/i18n.ts`
2. Import `useTranslation` in components
3. Replace hardcoded text with `t('key')`

Need help translating specific pages? Just let me know!

---

**Your application is now bilingual and ready for Arabic-speaking users! 🎉**
