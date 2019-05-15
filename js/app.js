// CODE EXPLAINED channel
//Берем элементы
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const plus = document.querySelector(".plus")


const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
//переменные
let LIST = [],
     id = 0;
// //добавлять там где LIST Arr обновляется
// localStorage.setItem("TODO",JSON.stringify(LIST));

//берем информацию из хранилища
let data = localStorage.getItem("TODO");
//проверка на наличие данных
if (data) {
     LIST = JSON.parse(data);
     id = LIST.length;
     loadList(LIST);
} else {
     LIST = [];
     id = 0;
}
//функция которая загружает данные пользователя
function loadList(array) {
     array.forEach(function (item) {
          addToDo(item.name, item.id, item.done, item.trash);

     });
}
//Кнопка которая очищает локальное хранилище
clear.addEventListener("click", function () {
     localStorage.clear();
     location.reload();
})



//Показ даты
const options = {
     weekday: "long",
     month: "short",
     day: "numeric"
}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("ru-RU", options);

//добавляем функцию ToDo
function addToDo(toDo, id, done, trash) {
     if (trash) {
          return;
     }

     const DONE = done ? CHECK : UNCHECK;
     const LINE = done ? LINE_THROUGH : "";

     const item =
          `<li class="item">
     <i class="fa ${DONE} co" job="complete" id="${id}"></i>
     <p class="text ${LINE}">${toDo}</p>
     <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
     </li>`;

     const position = "beforeend";

     list.insertAdjacentHTML(position, item);
}

//Добавляем при нажатии Enter
document.addEventListener("keyup", function (event) {
     if (event.keyCode == 13) {
          const toDo = input.value;
          if (toDo) {
               addToDo(toDo, id, false, false);

               LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
               });
               //добавлять там где LIST Arr обновляется
               localStorage.setItem("TODO", JSON.stringify(LIST));
               id++;
          }
          input.value = "";
     }
});

plus.addEventListener("click", function (event) {
     const toDo = input.value;
     if (toDo) {
          addToDo(toDo, id, false, false);

          LIST.push({
               name: toDo,
               id: id,
               done: false,
               trash: false
          });
          //добавлять там где LIST Arr обновляется
          localStorage.setItem("TODO", JSON.stringify(LIST));
          id++;
     }
     input.value = "";
});

addToDo("coffee", 1, false, true);

//переключение сделано/не сделано
function completeToDo(element) {
     element.classList.toggle(CHECK);
     element.classList.toggle(UNCHECK);
     element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

     LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
     element.parentNode.parentNode.removeChild(element.parentNode);

     LIST[element.id].trash = true;
}
list.addEventListener("click", function (event) {
     const element = event.target; // возвращает выбранный эл-т внутри листа
     const elementJob = element.attributes.job.value; // выполнить или удалить

     if (elementJob == "complete") {
          completeToDo(element);
     } else if (elementJob == "delete") {
          removeToDo(element);
     }
     //добавлять там где LIST Arr обновляется
     localStorage.setItem("TODO", JSON.stringify(LIST));
})