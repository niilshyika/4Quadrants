{/*<li class="task">
    <span>Заниматься JS</span>
</li>*/}

let param = [
  {
    id: 0,
    text: 'Заниматься JS',
    type: 1
  },
  {
    id: 1,
    text: 'Web Purple (create speaker modal)',
    type: 0
  },
  {
    id: 2,
    text: 'Issues ( work )',
    type: 0
  },
  {
    id: 3,
    text: '"The nature of code"',
    type: 1
  },
  {
    id: 4,
    text: 'Waste time in the VK',
    type: 1
  },
]

const containers = [
  // сделать data-id
  document.getElementById('0'),
  document.getElementById('1'),
  document.getElementById('2'),
  document.getElementById('3')
];

const init = () => {
  let tasks = getTasks() || [];

  renderTasks(tasks);

  addEventListenersToButtons();

  dragula(containers)
    .on('drop', (element, target, source) => {
      if (target.id !== source.id) {
        changeTaskType(element.dataset['id'], target.id)
      }
    })
};

const addEventListenersToButtons = () => {
  let tasks = getTasks();

  // getElementsByClassName returns pseudo array.  
  Array.from(document.getElementsByClassName('add-button'))
    .forEach(button => button.addEventListener('click', ({ target: { previousElementSibling: { id } } }) => {
      tasks.push(createTask(id));

      localStorage['tasks'] = JSON.stringify(tasks);

      renderTasks(tasks);
    }))
};


// function setLocalStorage(params) {
//   let args = tasks.length ? tasks : params;
//   LocalStorage.setItem('tasks', JSON.stringify(args));
// }

const getTasks = () => {
  return JSON.parse(localStorage['tasks']);
};

const makeTaskNode = ({ text, id }) => {
  const taskCont = document.createElement('li');
  const taskSpan = document.createElement('span')

  taskSpan.className = 'task';
  taskSpan.innerText = text;

  taskCont.appendChild(taskSpan);
  taskCont.dataset['id'] = id;

  return taskCont;
};

const renderTasks = (tasks) => {
  containers.forEach(container =>{
    container.innerHTML = '';
  });

  tasks.forEach(task => {
    containers[task.type].appendChild(makeTaskNode(task));
  });
};

const changeTaskType = (elementId, targetContainerId) => {
  let tasks = getTasks().map(elem => {
    if (elem.id === +elementId) elem.type = +targetContainerId;
    return elem;
  });

  localStorage['tasks'] = JSON.stringify(tasks);
};

const createTask = (containerId) => {
  return {
    id: Date.now(),
    text: 'Shalam',
    type: +containerId
  }
};

init();

// ES 6
// Simplu\yfy
//structure


















// var tasks;

// const getTasks = () => [1,2,3]

// const changeTasks = () => {
//   tasks = getTasks().map()
// }

// const deleteTask = () => {
//   tasks = tasks.filter()
// }

// tasks = [1,2,3,4]


// changeTasks()
// deleteTask()


// getter() {
//   return 123
// }

// setter() {
//   _set(value || 1)
// }