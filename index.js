{/*<li class="task">
    <span>Заниматься JS</span>
</li>*/}

let tasks = [
    {
        id: 0,
        text: 'Заниматься JS',
        status: 1
    },
    {
        id: 1,
        text: 'Web Purple ( create speaker modal )',
        status: 0
    },
    {
        id: 2,
        text: 'Issues ( work )',
        status: 0
    },
    {
        id: 3,
        text: '"The nature of code"',
        status: 1
    },
    {
        id: 4,
        text: 'Waste time in the VK',
        status: 1
    },
];

let containers = [
    document.querySelector('#I'),
    document.querySelector('#II'),
    document.querySelector('#III'),
    document.querySelector('#IV')
];

function renderTasks() {
    tasks.forEach((el) => {
        let taskCont = document.createElement('li');
        let taskSpan = document.createElement('span');
        taskSpan.className = 'task';
        taskSpan.innerText = el.text;
        taskCont.appendChild(taskSpan);
        containers[el.status].appendChild(taskCont);
    });
}

renderTasks();

dragula(containers, {
    // isContainer: function(el){
    //     console.log(el);
    // },
    accepts: function (el, target, source, sibling) {
        // console.log(el);
        console.log(target);
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