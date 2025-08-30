# 🚀 Полный Технический Стек LND Boilerplate

## ✅ **Что уже настроено и работает:**

### 🎨 **UI и Стилизация**

- **Next.js 14** - React фреймворк с App Router
- **Tailwind CSS** - Utility-first CSS фреймворк
- **shadcn/ui** - Компонентная библиотека на основе Radix UI
- **next-themes** - Управление темами (светлая/темная)
- **lucide-react** - Иконки
- **clsx + tailwind-merge** - Утилиты для работы с классами

### 🔤 **Шрифты и Типографика**

- **next/font** - Оптимизированные шрифты Google Fonts
- **Inter** - Основной шрифт (--font-sans)
- **Inter Tight** - Заголовки (--font-heading)

### 🎯 **Управление состоянием**

- **Zustand** - Легковесный state manager
- **Persist middleware** - Сохранение состояния в localStorage

### 📝 **Формы и Валидация**

- **react-hook-form** - Управление состоянием форм
- **@hookform/resolvers** - Интеграция с валидаторами
- **zod** - Схемы валидации и типизация

### 🛠 **Качество кода**

- **TypeScript** - Статическая типизация
- **ESLint** - Линтинг кода
- **Prettier** - Форматирование кода
- **Next.js ESLint config** - Готовая конфигурация

### 🔍 **SEO и Метаданные**

- **Next.js Metadata API** - Встроенная система метаданных
- **next-intl** - Интернационализация
- **Open Graph** - Социальные сети

## 📦 **Установленные пакеты:**

### Landing App (`apps/landing/package.json`)

```json
{
  "dependencies": {
    "@lnd/ui": "workspace:*",
    "@lnd/utils": "workspace:*",
    "next": "^14.0.0",
    "next-themes": "^0.4.6",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-hook-form": "^7.62.0",
    "@hookform/resolvers": "^5.2.1",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.6.2"
  }
}
```

### UI Package (`packages/ui/package.json`)

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "zod": "^4.1.5",
    "lucide-react": "^0.300.0"
  }
}
```

## 🎯 **Примеры использования:**

### 1. **Формы с react-hook-form + zod**

```tsx
// components/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

### 2. **State Management с Zustand**

```tsx
// stores/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
    }),
    { name: 'app-storage' }
  )
);
```

### 3. **Темы с next-themes**

```tsx
// components/ThemeToggle.tsx
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## 🚀 **Доступные команды:**

```bash
# Разработка
bun run dev          # Запуск dev сервера
bun run build        # Сборка для продакшена
bun run start        # Запуск продакшен сервера

# Качество кода
bun run lint         # Проверка ESLint
bun run format       # Форматирование Prettier
bun run format:check # Проверка форматирования
```

## 🎨 **Компоненты UI (shadcn/ui):**

Доступные компоненты в `@lnd/ui/components/ui/`:

- `Button` - Кнопки
- `Input` - Поля ввода
- `Textarea` - Многострочные поля
- `Card` - Карточки
- `Badge` - Бейджи
- `Avatar` - Аватары
- `DropdownMenu` - Выпадающие меню
- `Tabs` - Вкладки
- `Accordion` - Аккордеон
- `Tooltip` - Подсказки
- `Skeleton` - Скелетоны
- `Sheet` - Боковые панели
- `Sidebar` - Боковая панель
- `Form` - Готовые формы
- `SearchModal` - Модальное окно поиска
- `LanguageSelector` - Выбор языка
- `ImageGallery` - Галерея изображений

## 🔧 **Конфигурация:**

### Tailwind CSS (`tailwind.config.js`)

- Настроены цвета и темы
- Поддержка темной темы
- Кастомные утилиты

### ESLint (`.eslintrc.json`)

- Next.js конфигурация
- TypeScript правила
- Кастомные правила качества

### Prettier (`.prettierrc`)

- Единый стиль кода
- Автоматическое форматирование

## 🎯 **Готово к использованию:**

✅ **Полноценный профессиональный стек**  
✅ **Готовые компоненты UI**  
✅ **Управление темами**  
✅ **Формы с валидацией**  
✅ **State management**  
✅ **Качество кода**  
✅ **SEO оптимизация**  
✅ **TypeScript**  
✅ **Монoreпо структура**

Ваш проект готов для создания любого веб-приложения! 🚀
