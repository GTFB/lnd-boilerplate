# Система изображений LND Boilerplate

## Обзор

Система изображений предоставляет набор компонентов и утилит для эффективной работы с изображениями в проекте.

## Компоненты

### Image
Базовый компонент для отображения изображений с поддержкой fallback и lazy loading.

```tsx
import { Image } from '@lnd/ui/components/ui/Image'

<Image
  src="https://images.unsplash.com/photo-1234567890"
  alt="Описание изображения"
  width={800}
  height={400}
  fallbackSrc="/images/placeholder.jpg"
  priority={true}
/>
```

**Props:**
- `src` - URL изображения
- `alt` - альтернативный текст
- `width/height` - размеры изображения
- `fallbackSrc` - fallback изображение
- `priority` - приоритет загрузки
- `loading` - тип загрузки (lazy/eager)

### Avatar
Компонент для отображения аватаров пользователей.

```tsx
import { Avatar } from '@lnd/ui/components/ui/Avatar'

<Avatar
  src="https://images.unsplash.com/photo-1234567890"
  alt="Имя пользователя"
  size="lg"
  fallback="ИП"
/>
```

**Размеры:** sm, md, lg, xl

### ImageGallery
Галерея изображений с поддержкой lightbox.

```tsx
import { ImageGallery } from '@lnd/ui/components/ui/ImageGallery'

<ImageGallery
  images={images}
  columns={3}
  showCaptions={true}
  showLightbox={true}
/>
```

## Контент компоненты

### BlogCard
Карточка блог-поста с изображением.

### ExpertCard
Карточка эксперта с аватаром.

## Утилиты

### generateUnsplashUrl()
Генерация URL для Unsplash изображений с параметрами.

### generatePlaceholderUrl()
Создание placeholder изображений.

### generateSrcSet()
Генерация srcset для responsive изображений.

## Структура файлов

```
packages/ui/src/components/ui/
├── Image.tsx           # Базовый компонент изображения
├── Avatar.tsx          # Компонент аватара
├── ImageGallery.tsx    # Галерея изображений
└── README-Images.md    # Эта документация

packages/ui/src/components/content/
├── BlogCard.tsx        # Карточка блог-поста
└── ExpertCard.tsx      # Карточка эксперта

packages/utils/src/images/
└── index.ts            # Утилиты для изображений
```

## Лучшие практики

1. **Всегда указывайте alt текст** для доступности
2. **Используйте fallback изображения** на случай ошибки
3. **Оптимизируйте размеры** через CDN параметры
4. **Применяйте lazy loading** для изображений ниже fold
5. **Используйте правильные форматы** (WebP для современных браузеров)

## Примеры использования

Смотрите страницу `/gallery` для полной демонстрации всех компонентов.
