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
    let ids = listStr.split(',');
    return ids;
  } else {
    return 'undefined';
  };
};

const deleteItem = ( itemsId ) => {
  localStorage.removeItem( itemsId );
  let ids = localStorage.getItem('ids').split(',');
  let result = ids.filter( e => e !== itemsId.toString() );
  localStorage.setItem( 'ids', result.join() );
  updateList();
};

const updateList = () => {

  let ids = getIds();
  let allInfoHTML = [];

  if (ids === 'undefined') {
    message.style.display = "block";
  } else {
    message.style.display = 'none';
    listTodo.innerHTML = '';
    ids.reverse();

    for (var i = 0; i < ids.length; i++) {
      let item = localStorage.getItem(ids[i]).split('^');

      allInfoHTML.push( `<li class="list-group-item d-flex justify-content-between">
                          <div class="d-flex flex-column">
                            ${item[0]}
                            <span class="date-time">
                              ${item[1]}
                            </span>
                          </div>
                          <button
                              type="button"
                              onclick="deleteItem(${ids[i]})"
                              class="btn btn-outline-danger btn-sm"
                              >
        									  <i class="fas fa-trash-alt"></i>
        								  </button>
                        </li>`
                      );
    };
  };

  let joinedAllInfoIHTML = allInfoHTML.join('');
  listTodo.innerHTML = joinedAllInfoIHTML;
};

var delIcon = document.getElementById('myIcon');

const addToggler = () => {
  if (newTask.value === "") {
    newTask.classList.remove('is-valid');
    add.disabled = true;
  } else {
    newTask.classList.add('is-valid');
    add.disabled = false;
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
