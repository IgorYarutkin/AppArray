# AppArray
Данное приложение создает массив из 8&nbsp;x&nbsp;256&nbsp;объектов со свойствами id, name, color. 
Свойство id является последовательным номером объекта в массиве. Свойства name и color сгенерированы случайным образом.


Созданный массив отрисовывается в таблице в разделе "Таблица". Обновление приложения создает массив заново. 
Первоначально отрисовывается количество строк, которое помещается в видимую область + 10 строк. Затем при скролле вниз строки таблицы подгружаются пачками по 10 строк.
При нажатии на ячейку происходит смена фоного цвета ячейки на цвет установленный в массиве для данного объекта.

## Подготовка и запуск проекта
1. Скачайте или клонируйте себе проект
2. Запустите в директории проекта:
`npm install`
3. Постройте проект и запустите локальный сервер:
`npm start`
