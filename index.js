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

let tasks;
let id;

const containers = [
  document.querySelector('#I'),
  document.querySelector('#II'),
  document.querySelector('#III'),
  document.querySelector('#IV')
];

function init() {
  // setLocalStorage();
  tasks = getTasks();
  id = tasks.length;
  renderTasks(tasks);
  Array.from(document.getElementsByClassName('add-button'))
    .forEach(button => button.addEventListener('click', e => {
      // console.log(e.target.previousElementSibling);
      tasks.push(createTask(getTaskType(e.target.previousElementSibling.id)));
      setLocalStorage();
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

function makeTaskNode(obj) {
  let taskCont = document.createElement('li');
  let taskSpan = document.createElement('span')
  taskSpan.className = 'task';
  taskSpan.innerText = obj.text;
  taskCont.appendChild(taskSpan);
  taskCont.dataset['id'] = obj.id;

  return taskCont;
}

function renderTasks(tasks) {
  !tasks.length || tasks.forEach(task => {
    containers[task.type].appendChild(makeTaskNode(task));
  });
}

function changeTaskType(elementId, targetContainerId) {
  let type = getTaskType(targetContainerId);
  tasks.map(elem => {
    if (elem.id === +elementId) elem.type = type;
    return elem;
  });

  setLocalStorage();
  // renderTasks();
  tasks = getTasks();
}

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
    id: id++,
    text: 'Shalam',
    type: type
  }
}

init();