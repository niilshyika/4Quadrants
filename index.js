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

let id;

const containers = [
  // сделать data-id
  document.querySelector('#I'),
  document.querySelector('#II'),
  document.querySelector('#III'),
  document.querySelector('#IV')
];


function init() {
  // setLocalStorage();
  const tasks = getTasks();
  renderTasks(tasks);
  Array.from(document.getElementsByClassName('add-button'))
    .forEach(button => button.addEventListener('click', ({target: {previousElementSibling: {id}}}) => {
      // console.log(e.target.previousElementSibling);
      tasks.push(createTask(getTaskType(id)));
      setLocalStorage();
      // setLocalStorage(tasks.push(createTask(id)))
      renderTasks(tasks);
    }))

  dragula(containers)
    .on('drop', (element, target, source) => {
      if (target.id !== source.id) {
        changeTaskType(element.dataset['id'], target.id)
      }
    })
}


function setLocalStorage(params) {
  let args = tasks.length ? tasks : params;
  window.localStorage.setItem('tasks', JSON.stringify(args));
}

function getTasks() {
  return JSON.parse(window.localStorage.getItem('tasks')) || [];
}

function makeTaskNode({text, id}) {
  const taskCont = document.createElement('li');
  const taskSpan = document.createElement('span')

  taskSpan.className = 'task';
  taskSpan.innerText = text;

  taskCont.appendChild(taskSpan);
  taskCont.dataset['id'] = id;

  return taskCont;
}

function renderTasks(tasks) {
  tasks.forEach(task => {
    containers[task.type].appendChild(makeTaskNode(task));
  });
}

function changeTaskType(elementId, targetContainerId) {
  let type = getTaskType(targetContainerId);
  getTasks().map(elem => {
    if (elem.id === +elementId) elem.type = type;
    return elem;
  });

  setLocalStorage();
}

//нахуй эту штуку отсюда
function getTaskType(containerId) {
  let type;
  switch (containerId) {
    case 'I':
      type = 0;
      break;
    case 'II':
      type = 1;
      break;
    case 'III':
      type = 2;
      break;
    case 'IV':
      type = 3;
      break;
    default:
      break;
  }
  return type;
}

function createTask(type) {
  return {
    id: Date.now(),
    text: 'Shalam',
    type
  }
}

init();

// ES 6
// Simplu\yfy
//structure


















var tasks;

const getTasks = () => [1,2,3]

const changeTasks = () => {
  tasks = getTasks().map()
}

const deleteTask = () => {
  tasks = tasks.filter()
}

tasks = [1,2,3,4]


changeTasks()
deleteTask()


getter() {
  return 123
}

setter() {
  _set(value || 1)
}