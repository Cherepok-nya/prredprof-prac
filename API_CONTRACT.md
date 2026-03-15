# API Contract

Базовый URL: `/api`

---

## Аутентификация

### POST /api/users/login
Вход пользователя.

**Тело запроса:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Ответ 200:**
```json
{
  "id": 1,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "admin": "boolean"
}
```

**Ответ 401:** Неверный логин или пароль.

---

### POST /api/users/logout
Выход из системы. Очищает сессию.

**Ответ 200:** `{}`

---

### GET /api/users/me
Получить текущего авторизованного пользователя.

**Ответ 200:**
```json
{
  "id": 1,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "admin": "boolean"
}
```

**Ответ 401:** Не авторизован.

---

## Управление пользователями (только admin)

### POST /api/users
Создать нового пользователя.

**Тело запроса:**
```json
{
  "username": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

**Ответ 201:**
```json
{
  "id": 2,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "user"
}
```

**Ответ 409:** Пользователь с таким логином уже существует.

---

## Предсказание модели

### POST /api/predict
Загрузить тестовый набор данных и получить результаты классификации.

**Тело запроса:** `multipart/form-data`
- `file` — файл в формате `.npz`

**Ответ 200:**
```json
{
  "accuracy": 0.8741,
  "loss": 0.3124
}
```

**Ответ 400:** Неверный формат файла.

---

## Аналитика

### GET /api/analytics
Получить данные для графиков и диаграмм.

**Ответ 200:**
```json
{
  "epochData": [
    { "epoch": 1, "accuracy": 0.42, "val_accuracy": 0.38 }
  ],
  "classDistData": [
    { "name": "Класс A", "count": 120 }
  ],
  "testAccuracyData": [
    { "id": 1, "accuracy": 0.91 }
  ],
  "top5Data": [
    { "name": "Класс A", "count": 45 }
  ]
}
```

### Описание полей:
| Поле | Тип | Описание |
|---|---|---|
| `epochData` | array | Точность по эпохам обучения |
| `epochData[].epoch` | number | Номер эпохи |
| `epochData[].accuracy` | number | Точность на обучающих данных (0–1) |
| `epochData[].val_accuracy` | number | Точность на валидационных данных (0–1) |
| `classDistData` | array | Распределение классов в обучающем наборе |
| `classDistData[].name` | string | Название класса/цивилизации |
| `classDistData[].count` | number | Количество записей |
| `testAccuracyData` | array | Точность по каждой записи тестового набора |
| `testAccuracyData[].id` | number | Номер записи |
| `testAccuracyData[].accuracy` | number | Точность определения (0–1) |
| `top5Data` | array | Топ-5 классов в валидационном наборе |
| `top5Data[].name` | string | Название класса |
| `top5Data[].count` | number | Количество записей |

