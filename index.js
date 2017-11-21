{/*<li class="task">
    <span>Заниматься JS</span>
</li>*/}

let tasks = [
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
  document.querySelector('#I'),
  document.querySelector('#II'),
  document.querySelector('#III'),
  document.querySelector('#IV')
];

function init() {
  setLocalStorage();
  renderTasks();
  Array.from(document.getElementsByClassName('add-button'))
    .forEach(button => button.addEventListener('click', e => {
      console.log(e.target.parent);
    }))

  dragula(containers, {
    // isContainer: function(el){
    //     console.log(el);
    // },
    removeOnSpill: true,
    accepts: function (el, target, source, sibling) {
      // console.log(el);
      // console.log(target);
      // console.log(source);
      // console.log(sibling);

      return true; // elements can be dropped in any of the `containers` by default
    },
    // moves: function (el, source, handle, sibling) {
    // console.log(source);
    // console.log(handle);
    // console.log(sibling);

    // return true; 
    //   },
  });
}

function setLocalStorage() {
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
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

  return taskCont;
}

function renderTasks() {
  let tasks = getTasks();
  !tasks.length || tasks.forEach(task => {
    containers[task.type].appendChild(makeTaskNode(task));
  });
}

function addTask(e) {
  // tasks.push()
  alert(e.target);
}

init();