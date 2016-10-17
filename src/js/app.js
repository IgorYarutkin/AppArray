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
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Генератор случайного цвета в hex
 * использует функцию генератор случайного числа
 * @return {string} color
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
 * @return {string} name
 */
function randomName(min, max) {
// переделать функцию на создание имени со случайным количеством букв от min до max
// Здесь будет проверка переданных значений и установка значений по умолчанию при отсутствии переданных значений или их неправильности
  var n = randomInteger(min, max);
  var abcd = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ABCD = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';
  var aL = abcd.length, AL = ABCD.length;
  var name = '' + ABCD[randomInteger(0, AL - 1)];
  while(name.length < n) {
    name += abcd[randomInteger(0, aL - 1)];
  }
  return name;
}

/**
 * @typedef {object} Item
 * @property {number} id
 * @property {string} name
 * @property {string} color
 */

/**
 * Конструктор объекта - элемента массива
 * @constructor
 * @param {number} id - поле идентификатор
 * @param {string} name - поле имя
 * @param {string} color - поле цвет
 */
function Item(id, name, color) {
  this.id = id;
  this.name = name;
  this.color = color;
}

/**
 * Создает массив объектов
 * @param {number} rows - число строк
 * @param {number} cols - число столбцов
 * @return {object} array
 */
function makeArray(rows, cols) {
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

var tableContainer = document.querySelector('.table');
var descriptionContainer = document.querySelector('.description');
var content = document.querySelector('.table__content');
var mainTab = document.querySelector('#main');
var tableTab = document.querySelector('#table');
var mainContainer = document.querySelector('.page-content');

var lastRow = 0;

var ROW_HEIGHT = 32;
var ADDITIONAL_ROWS = 10;
var DELAY = 100;

// Создание массива
var randomArray = makeArray(256, 8);
console.log(new Date()); // отладочный код



/**
 * Создает строку таблицы
 * @param {Item[]} items
 * @return {HTMLTableRowElement}
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
 * @param {Item} item  - объект массива
 * @return {HTMLTableCellElement}
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
 * @param {number} start - начальный номер строки
 * @param {number} count - количество строк
 */
function addRows(start, count) {
  randomArray.slice(start, start + count).forEach(function(row) {
    content.appendChild(createRow(row));
  });
  lastRow = start + count;
}


/******
  Определение начального количества выводимых строк
********/
function calculateInitialRows() {
  return Math.floor(tableContainer.getBoundingClientRect().height / ROW_HEIGHT) + ADDITIONAL_ROWS;
}



/****** Функции обработчиков *************/

/**
 * Переключает разделы приложения при выборе вкладки.
 * Отрисовывает таблицу при первом выборе вкладки "Таблица"
 * @param {string} id
 */
function selectTab(id) {
  var isMain = id === 'main' ? true : false;
  mainTab.classList.toggle('switcher__tab--active', isMain);
  tableTab.classList.toggle('switcher__tab--active', !isMain);
  descriptionContainer.classList.toggle('description--active', isMain);
  tableContainer.classList.toggle('table--active', !isMain);

  // начальная отрисовка таблицы при первом выборе вкладки
  if (!isMain && !content.hasChildNodes()) {
    console.log('Начальное добавление таблицы');
    addRows(lastRow, calculateInitialRows());
  }
}

function switcher(evt) {
  selectTab(evt.currentTarget.id);
}

/**
 * Меняет цвет фона ячейки
 * @param {object} evt
 */
function changeColor(evt) {
  if(evt.target.dataset.bgColor) {
    evt.target.style.background = evt.target.dataset.bgColor;
  }
}

/****** Установка обработчиков *************/

mainTab.addEventListener('click', switcher);
tableTab.addEventListener('click', switcher);
window.addEventListener('scroll', addMoreRowsThrottle);
window.addEventListener('scroll', function() {
  console.log('Test');
});


/**************** Подгрузка и Троттлинг ***************/

var MIN_ROWS = 2;
var GAP = ROW_HEIGHT * MIN_ROWS;

/**
 * Создает задержку проверки необходимости подгрузки строк таблицы
 * @param {function} func - функция, которую нужно выполнить с задержкой
 * @param {number} delay - время задержки в мс
 * @return {function} func - функция, выполненная с задержкой
 */
function throttle(func, delay) {
  var lastTime = 0;

  return function() {
    var currentTime = new Date();
    if ((currentTime - lastTime) > delay) {
      func();
      lastTime = currentTime;
    }
  };
}

/**
 * Проверяет нужно ли подгружать строки таблицы
 */
function addMoreRows() {
  if((content.getBoundingClientRect().bottom - mainContainer.getBoundingClientRect().bottom) < GAP) {
    addRows(lastRow, ADDITIONAL_ROWS);
  }
}

function addMoreRowsThrottle() {
  console.log('Проверка скролла');
  throttle(addMoreRows, DELAY);
}
