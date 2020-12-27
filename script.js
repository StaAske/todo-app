const newId = () => {
  let existingIds = getIds();
  if (existingIds === 'undefined') {
    return Math.floor(Math.random() * 100);
  } else {
    for (var i = 1; i < 100; i++) {
      let id = Math.floor(Math.random() * 100);
      if (id in existingIds) {
        continue;
      } else {
        return id;
      }
      break;
    }
  }
};

const timeDate = () => {
  let date = new Date();
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]}
          ${date.getDate().toString()},
          ${date.getFullYear().toString()},
          ${date.getHours().toString()}:${date.getMinutes().toString()}`;
};

const addToList = () => {
  let id = newId();
  localStorage.setItem(id, newTask.value + "^" + timeDate());
  clrInput();
  if (localStorage.getItem('ids')) {
    localStorage.setItem('ids', localStorage.getItem('ids') + "," + id);
  } else {
    localStorage.setItem('ids', id)
  };
  updateList();
};

const clrInput = () => {
  newTask.value = "";
};

const getIds = () => {
  if (localStorage.getItem('ids')) {
    let listStr = localStorage.getItem('ids');
    let listToInt = listStr.split(',');
    let listIds = [];
    for (var i = 0; i < listToInt.length; i++) {
      listIds.push(parseInt(listToInt[i]));
    }
    return listIds;
  } else {
    return 'undefined';
  };
};

const updateList = () => {
  let ids = getIds();
  if (ids === 'undefined') {
    message.style.display = "block";
  } else {
    message.style.display = 'none';
    listTodo.innerHTML = '';
    ids.reverse();
    for (var i = 0; i < ids.length; i++) {
      let items = localStorage.getItem(ids[i]).split('^');

      // creating li
      let li = document.createElement('li');
      let liClassAttr = document.createAttribute('class');
      liClassAttr.value = "list-group-item";
      liClassAttr.value += " d-flex";
      liClassAttr.value += " justify-content-between";
      li.setAttributeNode(liClassAttr);
      // creating task item
      let task = document.createElement('div');
      let tasksClassAttr = document.createAttribute('class');
      tasksClassAttr.value = "d-flex";
      tasksClassAttr.value += " flex-column";
      task.setAttributeNode(tasksClassAttr);
      task.textContent = items[0];
      // creating date time
      let span = document.createElement('span');
      let spanClass = document.createAttribute('class');
      spanClass.value = 'date-time';
      span.setAttributeNode(spanClass);
      span.textContent = items[1];

      task.appendChild(span);
      li.appendChild(task);
      listTodo.appendChild(li);
    };
  };
};

const addToggler = () => {
  if (newTask.value === "") {
    newTask.classList.remove('is-valid');
    add.disabled = true;
  } else {
    newTask.classList.add('is-valid');
    add.disabled = false;
    // add.classList.replace("btn-dark", "btn-success");
  };
};

const newTask = document.querySelector('#new-task');
const listTodo = document.querySelector('.listTodo');
const message = document.querySelector('#message');
const add = document.querySelector('#add');
const clearBtn = document.querySelector('.btn-danger');

updateList();
addToggler();

const crossCheck = document.getElementsByClassName('checkClass');

newTask.addEventListener('input', () => {
  addToggler();
});

add.addEventListener('click', () => {
  addToList();
  addToggler();
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && newTask.value !== "") {
    addToList();
    addToggler();
  };
});

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  listTodo.innerHTML = '';
  updateList();
});


Object.keys(crossCheck).forEach(element => {
  crossCheck[element].addEventListener('click', (e) => {
    // delete();
    // need to create function to delete items from the localStorage

    let targ = e.target.nextElementSibling;
    console.log(targ);

    targ.style.textDecoration = 'line-through';

  });
});
