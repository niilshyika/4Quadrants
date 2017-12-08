{
  /*<li class="task">
      <span>Заниматься JS</span>
  </li>*/
}

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
];

const containers = [
  document.getElementById('0'),
  document.getElementById('1'),
  document.getElementById('2'),
  document.getElementById('3')
];

const init = () => {
  getTasks().then(({ tasks }) => {
    renderTasks(tasks);
  });
  addEventListenersToButtons();
  dragula(containers, { removeOnSpill: true })
    .on('drop', (element, target, source) => {
      if (target.id !== source.id) {
        (element.dataset['id'], target.id)
      }
    })
    .on('remove', (element) => {
      revomeTask(element.dataset.id);
    })
};

const addEventListenersToButtons = () => {
  let dialogIsOpened = false;

  const openEditDialog = (containerId) => {
    const form = document.createElement('form');
    const input = document.createElement('input');

    input.className = 'edit-input';
    input.name = 'edit-input';
    form.appendChild(input);

    form.addEventListener('submit', (target) => {
      debugger;
      target.preventDefault();

      getTasks().then(({ tasks }) => {
        let newList = tasks || []; 
        newList.push(createTask(target.target[0].value, containerId));
        // chrome.storage.local.set({ 'tasks': tasks});

        // localStorage['tasks'] = JSON.stringify(tasks);
        chrome.storage.local.set({ tasks: newList });
        renderTasks(newList);
        dialogIsOpened = false;
      });
    })

    containers[containerId].appendChild(form)
    input.focus();    
  };

  // getElementsByClassName returns pseudo array.  
  Array.from(document.getElementsByClassName('add-button'))
    .forEach(button => button.addEventListener('click', ({ target: { previousElementSibling: { id } } }) => {
      if (!dialogIsOpened) {
        openEditDialog(id);
        dialogIsOpened = !dialogIsOpened;
      }
    }))

    document.getElementsByClassName('container__clear-button')[0].addEventListener('click', clearAll);
};

const clearAll = () => {
  chrome.storage.local.clear();
  renderTasks();
};


const getTasks = () => new Promise((resolve) => {
  chrome.storage.local.get(items => {
    resolve(items);
  });
});

const removeTask = (id) => {
  getTasks().then(({ tasks }) => {
    
  });
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
  containers.forEach(container => {
    container.innerHTML = '';
  });

  !tasks || tasks.forEach(task => {
    containers[task.type].appendChild(makeTaskNode(task));
  });
};

const changeTaskType = (elementId, targetContainerId) => {
  debugger;
  getTasks().then(({ tasks }) => {
    //здесь происходит чертовщина будто map меняет исходный array
    tasks.map(elem => {
      if (elem.id === +elementId) elem.type = +targetContainerId;
      return elem;
    });
    //здесь уже измененный 
    chrome.storage.local.set({ tasks });
  })
};

const createTask = (text, containerId) => {
  return {
    id: Date.now(),
    text,
    type: +containerId
  };
};

init();