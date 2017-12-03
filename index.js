{
  /*<li class="task">
      <span>Заниматься JS</span>
  </li>*/
}

let param = [{
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
  document.getElementById('0'),
  document.getElementById('1'),
  document.getElementById('2'),
  document.getElementById('3')
];

const init = () => {
  let tasks = getTasks();

  renderTasks(tasks);

  addEventListenersToButtons();
  // console.log(chrome.storage.local.get('phasersTo',(items) => console.log(items)) );

  dragula(containers)
    .on('drop', (element, target, source) => {
      if (target.id !== source.id) {
        changeTaskType(element.dataset['id'], target.id)
      }
    })
};

const addEventListenersToButtons = () => {
  let dialogIsOpened = false;
  
  const openEditDialog = (containerId) => {
    const form = document.createElement('form');
    const input = document.createElement('input');
  
    input.className = 'edit-input';
    input.name = 'edit-input';
    input.autofocus = true;
    form.appendChild(input);
  
    form.addEventListener('submit', (target) => {
      let tasks = getTasks();
  
      tasks.push(createTask(target.target[0].value, containerId));
      // chrome.storage.local.set({ 'tasks': tasks});
  
      // localStorage['tasks'] = JSON.stringify(tasks);
      renderTasks(tasks);
      dialogIsOpened = false;
    })
  
    containers[containerId].appendChild(form)
  };
  
  // getElementsByClassName returns pseudo array.  
  Array.from(document.getElementsByClassName('add-button'))
    .forEach(button => button.addEventListener('click', ({target:{previousElementSibling:{ id }}}) => {
      if (!dialogIsOpened){
        openEditDialog(id);
        dialogIsOpened = !dialogIsOpened;        
      }
    }))
};

const clearAll = () => {
  // localStorage.clear();
  chrome.storage.local.clear();
  renderTasks();
};


const getTasks = () => {
  debugger;
  let tasks;
  chrome.storage.local.get(items =>{
    tasks = items || []
  } );
  // return JSON.parse(localStorage['tasks'] || '[]');
  return tasks;
};

const makeTaskNode = ({text,id}) => {
  const taskCont = document.createElement('li');
  const taskSpan = document.createElement('span')

  taskSpan.className = 'task';
  taskSpan.innerText = text;

  taskCont.appendChild(taskSpan);
  taskCont.dataset['id'] = id;

  return taskCont;
};

const renderTasks = (tasks) => {
  containers.forEach(container => {
    container.innerHTML = '';
  });

  !tasks || tasks.forEach(task => {
    containers[task.type].appendChild(makeTaskNode(task));
  });
};

const changeTaskType = (elementId, targetContainerId) => {
  let tasks = getTasks().map(elem => {
    if (elem.id === +elementId) elem.type = +targetContainerId;
    return elem;
  });


  chrome.storage.local.set({tasks: tasks});
  // localStorage['tasks'] = JSON.stringify(tasks);
};

const createTask = (text, containerId) => {
  return {
    id: Date.now(),
    text,
    type: +containerId
  };
};

init();