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

const addToList = () => {
  let id = newId();
  localStorage.setItem(id, newTask.value);
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
      // creating list block
      let taskBlock = document.createElement('div');
      let taskBlockAttr = document.createAttribute('class');
      taskBlockAttr.value = "taskBlock";
      taskBlock.setAttributeNode(taskBlockAttr);
      // creating label
      let stuff = document.createElement('label');
      stuff.textContent = localStorage.getItem(ids[i]);
      let labClass = document.createAttribute('class');
      labClass.value = 'lab-class';
      stuff.setAttributeNode(labClass);
      // creating input
      let checkBox = document.createElement('input');
      let checkBoxType = document.createAttribute('type');
      checkBoxType.value = 'checkbox';
      checkBox.setAttributeNode(checkBoxType);
      let checkClass = document.createAttribute('class');
      checkClass.value = 'checkClass';
      checkBox.setAttributeNode(checkClass);
      taskBlock.appendChild(checkBox);
      taskBlock.appendChild(stuff);
      listTodo.appendChild(taskBlock);
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

Object.keys(crossCheck).forEach(element => {
  crossCheck[element].addEventListener('click', (e) => {
    // delete();
    // need to create function to delete items from the localStorage

    let targ = e.target.nextElementSibling;
    console.log(targ);

    targ.style.textDecoration = 'line-through';

  });
});
