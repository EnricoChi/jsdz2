// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.

// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

'use strict';

const text = "One: 'Hi Mary.' Two: 'Oh, hi.'\n" +
  "One: 'How are you doing?'\n" +
  "Two: 'I'm doing alright. How about you?'\n" +
  "    One: 'Not too bad. The weather is great isn't it?'\n" +
  "    Two: 'Yes. It's absolutely beautiful today.'\n" +
  "One: 'I wish it was like this more frequently.'\n" +
  "Two: 'Me too.'\n" +
  "One: 'So where are you going now?'\n" +
  "Two: 'I'm going to meet a friend of mine at the department store.'\n" +
  "One: 'Going to do a little shopping?'\n" +
  "Two: 'Yeah, I have to buy some presents for my parents.'\n" +
  "One: 'What's the occasion?'\n" +
  "    Two: 'It's their anniversary.'\n" +
  "One: 'That's great. Well, you better get going. You don't want to be late.'\n" +
  "Two: 'I'll see you next time.'\n" +
  "One: 'Sure. Bye.'";

// Переслушивал в лекции кусок про дз раза 4, так и не понял в 1 или в 2 действия нужно сделать.
// Поэтому сделал все варианты

// Просто заменит ' везде на "
let text1 = text.replace(/'/g, '"');
console.log(text1, '----------------1');

// Заменит " в словах на '
text1 = text1.replace(/\b"\b/g, '\'');
console.log(text1, '----------------2');

// Сделает сразу правильно в 1 действие
let text2 = text.replace(/\B'/g, '"');
console.log(text2, '----------------3');
