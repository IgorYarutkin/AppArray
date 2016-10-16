'use strict';

/***********************************
  Создание массива
**/

/**
 * Генератор случайного числа
 * @param {number} min
 * @param {number} max
 * @return {number} rand
 */
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

/**
 * Генератор случайного цвета в hex
 * использует функцию генератор случайного числа
 * @return (string) color
 */
function randomColor() {
  var color = '#';
  for(var i = 0; i < 6; i++) {
    color = color + Number(randomInteger(0, 15)).toString(16);
  }
  return color;
}

/**
 * Генератор случайного имени
 * использует функцию генератор случайного числа
 * @param {number} n - количество букв в имени
 * @return (string) name
 */
function randomName(min, max) {
// переделать функцию на создание имени со случайным количеством букв от min до max
// Здесь будет проверка переданных значений и установка значений по умолчанию при отсутствии переданных значений или их неправильности
  var n = randomInteger(min, max);
  var abd = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ABD = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';
  var aL = abd.length, AL = ABD.length;
  var name = '' + ABD[randomInteger(0, AL - 1)];
  while(name.length < n) {
    name += abd[randomInteger(0, aL - 1)];
  }
  return name;
}

/**
 * Конструктор объекта - элемента массива
 * @param {number} id - поле идентификатор
 * @param {string} name - поле имя
 * @param {string} color - поле цвет
 * @return {object}
 */
function Item(id, name, color) {
  this.id = id;
  this.name = name;
  this.color = color;
}

/**
 * Функция создания массива объектов
 * @return {object} array
 */
function makeArray(rows, cols) {
  console.log('Функция makeArray');
  var array = [];
  var row;
  for(var i = 0; i < rows; i++) {
    array.push(row = []);
    for (var j = 0; j < cols; j++) {
      row.push(new Item(i * cols + j, randomName(3, 8), randomColor()));
    }
  }
  return array;
}



/****************************
  Отрисовка массива в таблице
*****************************/
var content = document.querySelector('.table__content');

// Создание массива
var randomArray = makeArray(256, 8);



/**
 * Создает строку таблицы
 * @param {array} items
 * @return {object}
 */
function createRow(items) {
  var element = document.createElement('tr');
  element.classList.add('table__row');
  items.forEach(function(item) {
    element.appendChild(createCell(item));
  });
  return element;
}

/**
 * Создает ячейку таблицы
 * @param {object} item  // номер строки
 * @return {object}
 */
function createCell(item) {
  var element = document.createElement('td');
  element.classList.add('table__cell');
  element.innerHTML = item.name;
  element.dataset.color = item.color;
  return element;
}


/**
 * Функция добавления строк
 * @param {number} n  // начальный номер строки
 * @param {number} q  // количество строк
 */
function addRows(n, q) {
  randomArray.slice(n, n + q).forEach(function(row) {
    content.appendChild(createRow(row));
  });
}







/* Установка обработчиков скролла
*/

function changeColor(evt) {
  evt.target.style.background = evt.target.getAttribute('data-bg-color');
}
