/* 
TODO:
1) если еще нет задач, то выводить "Есть свободное время? Может лучше пересмотреть свои дела и создать новые задачки?"
и сделать кнопку на нотификашке, которая откроет расширение и начнет добавлять новую задачку. Может быть и не 
выводить нотификашку когда нет задач.
2) Сделать options page, в которой можно задавать паттерны urls
3) Сделать редактирование задачи double click на задачу
4) Сделать красивое создание новых тасок
*/

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
    .on('remove', element => {
      removeTask(element.dataset.id);
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
      target.preventDefault();

      getTasks().then(({ tasks }) => {
        let newList = tasks || [];
        newList.push(createTask(target.target[0].value, containerId));

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
    const newList = tasks.filter(task => task.id !== +id)
    renderTasks(newList);
    chrome.storage.local.set({ tasks: newList });
  });
};

const makeTaskNode = ({ text, id }) => {
  const taskCont = document.createElement('li');
  taskCont.className = 'task-container';
  const taskSpan = document.createElement('div');

  taskSpan.className = 'task';
  taskSpan.innerText = text;

  taskCont.appendChild(taskSpan);
  taskCont.dataset['id'] = id;
  taskCont.addEventListener('dblclick', e=>{
    const id = +e.target.parentElement['dataset'].id;

    const form = document.createElement('form');
    const input = document.createElement('input');

    input.className = 'edit-input';
    input.name = 'edit-input';
    form.appendChild(input);
    form.addEventListener('submit', target => {
      target.preventDefault();

      getTasks().then(({ tasks }) => {
        let newList = tasks || [];
        newList.push(createTask(target.target[0].value, containerId));

        chrome.storage.local.set({ tasks: newList });
        renderTasks(newList);
        dialogIsOpened = false;
      });
    })
    e.target.appendChild(form);
  })

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
  getTasks().then(({ tasks }) => {
    let newList = tasks.map(elem => {
      if (elem.id === +elementId) elem.type = +targetContainerId;
      return elem;
    });
    chrome.storage.local.set({ tasks: newList });
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