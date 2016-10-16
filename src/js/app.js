'use strict';

/***********************************
  Создание массива
**/

/**
 * Генератор случайного числа
 * @param {number} min
 * @param {number} max
 * @return (number) rand
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
function Constructor(id, name, color) {
  this.id = id;
  this.name = name;
  this.color = color;
}

/**
 * Функция создания массива объектов
 * @return {object} array
 */
function makeArray() {
  console.log('Функция makeArray');
  var array = [];
  var object;
  for(var i = 0; i < 2048; i++) {
    object = new Constructor(i, randomName(3, 8), randomColor());
    array[i] = object;
  }
  return array;
}



/****************************
  Отрисовка массива в таблице
*****************************/
var content = document.querySelector('.table__content');

// Создание массива
var randomArray = makeArray();


// Шаблон
var rowTemplate = document.getElementById('row-template');
console.log(rowTemplate);
var elementToClone;
if ('content' in rowTemplate) {
  elementToClone = rowTemplate.content.querySelector('.table__row');
} else {
  elementToClone = rowTemplate.querySelector('.table__row');
}


/**
 * Конструктор строки таблицы
 * @param {number} n  // номер строки
 * @return {object}
 */
function Row(n) {
  this.element = elementToClone.cloneNode(true);
  console.dir(this.element);
  this.tableCell = this.element.querySelector('.table__cell');
  this.tableCell.innerHTML = randomArray[8 * n - 8].name;
  this.tableCell.setAttribute('data-bg-color', randomArray[8 * n - 8].color);
  var oneMoreCell = this.tableCell;
  for (var i = 7; i > 0; i--) {
    oneMoreCell.innerHTML = randomArray[8 * n - i].name;
    this.tableCell.setAttribute('data-bg-color', randomArray[8 * n - i].color);
    this.element.appendChild(oneMoreCell);
  }
}

/**
 * Функция добавления строк
 * @param {number} n  // начальный номер строки
 * @param {number} q  // количество строк
 */
function addRows(n, q) {
  for (var i = 0; i < q; i++) {
    var rowToAdd = new Row(n++);
    content.appendChild(rowToAdd.element);
  }
}







/* Установка обработчиков скролла
*/

function changeColor(evt) {
  evt.target.style.background = evt.target.getAttribute('data-bg_color');
}
