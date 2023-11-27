# rikon-masonry

## Описание

`rikon-masonry` - это React-приложение для создания и отображения заметок. Пользователи могут создавать заметки, каждая из которых содержит заголовок, дату создания, содержание и возможность выделения части содержания жирным шрифтом. Заметки отображаются в виде masonry layout на той же странице.

## Установка

Для установки `rikon-masonry` в ваш проект выполните:

```
npm install rikon-masonry
```

## Использование

### React js

```jsx
import React from 'react';
import MasonryToDo, { ToDoItem } from 'rikon-masonry';

// Пример данных
const initialData: ToDoItem[] = [
  {
    id: 1,
    title: 'Заметка 1',
    content: 'Содержание заметки 1'
    createdAt: '27 окт. 2023 г., 14:34:00',
  },
  // Добавьте другие заметки по аналогии
];

const App: React.FC = () => {
  return (
    <div>
      <MasonryToDo initial={initialData} />
    </div>
  );
};

export default App;
```

### React ts

```tsx
import React, { FC } from "react";
import MasonryToDo, { MasonryItemProps } from "rikon-masonry";

const App: FC = () => {
  const initialData: MasonryItemProps[] = [
    {
      id: 1,
      title: "Заметка 1",
      content: "Содержание заметки 1",
      createdAt: "27 окт. 2023 г., 14:34:00",
    },
    // Добавьте другие заметки по аналогии
  ];

  const handleListChange = (updatedList: MasonryItemProps[]) => {
    // Обработка изменений списка заметок
    console.log("Updated List:", updatedList);
  };

  return (
    <div>
      <MasonryToDo initial={initialData} onListChange={handleListChange} />
    </div>
  );
};

export default App;
```

## Props

- `initial` - начальный массив объектов, (по умолчанию: undefined)

- `brandColor` - Основной цвет, (по умолчанию: "#175ef7")

- `onListChange` - Коллбек, выполнится при каждом обновлении списка (updatedList: MasonryItemProps[]) => void, (по умолчанию: undefined)

- `onItemClick` - Коллбек, выполнится при нажатии на блок задачи (item: MasonryItemProps) => void, (по умолчанию: undefined)

## Компоненты

```ts
interface MasonryItemProps {
  id: number;
  title: string;
  createdAt: string;
  content: string;
}
```

- `MasonryToDo` - Основной компонент, включает все остальные компоненты приложения

```ts
interface MasonryToDoProps {
  initial?: MasonryItemProps[];
  brandColor?: string;
  onListChange?: (updatedList: MasonryItemProps[]) => void;
  onItemClick?: (item: MasonryItemProps) => void;
}
```

- `ItemToDo` - Компонент, для отрисовки одного элемента в списке

```ts
interface ItemToDoProps {
  item: MasonryItemProps;
  onItemClick?: (item: MasonryItemProps) => void;
  onDeleteItem: (id: number) => void;
}
```

- `NewToDoForm` - Компонент формы для создания записи

```ts
interface NewToDoFormProps {
  onAddItem: (newItem: Partial<MasonryItemProps>) => void;
}
```

- `RawHTML` - Компонент, для отрисовки строки, в которой есть теги HTML

```ts
interface RawHTMLProps {
  dirtyHTML: string;
}
```

## Вспомогательные функции

- `calculateFormattedDateNow` - функция возвращает текущую дату и время в формате «27 окт. 2023 г., 14:34:00»

```jsx
import { calculateFormattedDateNow } from "rikon-masonry";
console.log(calculateFormattedDateNow()); // 27 окт. 2023 г., 14:34:00
```

## Стек

React, typescript, webpack, DOMpurify, SCSS

## Лицензия

> MIT Лицензия. (c) Pete Olshe 2023.
