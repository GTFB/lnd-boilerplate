# Layout System

Гибкая, компонентная система макетов для веб-приложений, поддерживающая множественные дизайн-системы и адаптивное поведение.

## Обзор

Система макетов построена на основе четырех основных шаблонов:

1. **Single Column** - Простой одноколоночный макет для лендингов
2. **Sidebar Left** - Макет с левым сайдбаром для блогов
3. **Sidebar Right** - Макет с правым сайдбаром для связанного контента
4. **Sidebar Both** - Полный макет документации с двумя сайдбарами

## Архитектура

### BaseLayout
Базовый абстрактный класс, предоставляющий общую структуру и логику для всех макетов.

### LayoutRenderer
Компонент для динамического рендеринга макетов на основе конфигурации.

### useLayout Hook
Хук для управления конфигурацией макетов и получения текущих настроек.

## Использование

### Базовое использование

```tsx
import { LayoutRenderer } from '@your-org/ui'

function MyPage() {
  return (
    <LayoutRenderer layout="sidebar-both" pageType="documentation">
      <YourContent />
    </LayoutRenderer>
  )
}
```

### С кастомными пропсами

```tsx
<LayoutRenderer 
  layout="sidebar-left" 
  pageType="blogPost"
  sidebarTitle="Navigation"
  showFooter={false}
>
  <YourContent />
</LayoutRenderer>
```

### Программное переключение макетов

```tsx
import { useState } from 'react'
import { LayoutName } from '@your-org/ui'

function LayoutSwitcher() {
  const [currentLayout, setCurrentLayout] = useState<LayoutName>('single-column')
  
  return (
    <LayoutRenderer layout={currentLayout}>
      <YourContent />
      <button onClick={() => setCurrentLayout('sidebar-both')}>
        Switch to Documentation Layout
      </button>
    </LayoutRenderer>
  )
}
```

## Конфигурация

Система использует централизованную конфигурацию через `site.config.json`:

```json
{
  "layouts": {
    "default": "sidebar-both",
    "available": ["single-column", "sidebar-left", "sidebar-right", "sidebar-both"],
    "breakpoints": {
      "mobile": "1024px",
      "tablet": "1280px",
      "desktop": "1281px+"
    }
  },
  "pageTypes": {
    "documentation": {
      "template": "sidebar-both",
      "components": {
        "header": "mainHeader",
        "leftSidebar": "docsNavigation",
        "rightSidebar": "tableOfContents",
        "content": "mdxContent",
        "footer": "mainFooter"
      }
    }
  }
}
```

## Адаптивность

Все макеты автоматически адаптируются к различным размерам экрана:

- **< 1024px**: Сайдбары складываются в колонку
- **< 1280px**: Правый сайдбар скрывается (для sidebar-both)
- **1280px+**: Полный макет с сайдбарами

## Дизайн-системы

Система поддерживает множественные дизайн-системы (Lora, Alisa), которые можно переключать динамически:

```tsx
import { useDesignSystem } from '@your-org/ui'

function DesignSystemSwitcher() {
  const { switchSystem } = useDesignSystem()
  
  return (
    <div>
      <button onClick={() => switchSystem('lora')}>Lora</button>
      <button onClick={() => switchSystem('alisa')}>Alisa</button>
    </div>
  )
}
```

## Компоненты

Все макеты используют:
- **Lucide React** иконки (без SVG)
- **Shadcn/ui** компоненты
- **Tailwind CSS** для стилизации
- **TypeScript** для типизации

## Кастомизация

### Создание нового макета

```tsx
import { BaseLayout, BaseLayoutProps } from './base/BaseLayout'

export const CustomLayout: React.FC<BaseLayoutProps> = ({ children, ...props }) => {
  return (
    <BaseLayout layout="custom" {...props}>
      {/* Ваша кастомная структура */}
      {children}
    </BaseLayout>
  )
}
```

### Расширение существующего макета

```tsx
import { SidebarLeftLayout, SidebarLeftLayoutProps } from './layouts'

export const ExtendedSidebarLayout: React.FC<SidebarLeftLayoutProps> = (props) => {
  return (
    <SidebarLeftLayout
      {...props}
      sidebarContent={<CustomSidebarContent />}
      showFooter={false}
    />
  )
}
```

## Демо

Запустите демо-страницу для интерактивного изучения всех макетов:

```tsx
import { LayoutDemo } from '@your-org/ui'

function App() {
  return <LayoutDemo />
}
```

## Миграция

Для миграции с существующих макетов:

1. Замените `PublicLayout` на `LayoutRenderer`
2. Укажите соответствующий `layout` и `pageType`
3. Перенесите контент в `children`
4. Обновите импорты

```tsx
// Было
import { PublicLayout } from './templates'

// Стало
import { LayoutRenderer } from '@your-org/ui'

// Было
<PublicLayout>
  <Content />
</PublicLayout>

// Стало
<LayoutRenderer layout="sidebar-both" pageType="documentation">
  <Content />
</LayoutRenderer>
```

## Производительность

- Ленивая загрузка макетов
- Мемоизация конфигурации
- Оптимизированные CSS-переменные
- Минимальный JavaScript бандл

## Поддержка

Система поддерживает:
- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Все современные браузеры
