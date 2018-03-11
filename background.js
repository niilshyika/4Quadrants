const filterPatterns = [
    '/vk.com/'
]

const getTasks = () => new Promise((resolve) => {
    chrome.storage.local.get(items => {
        resolve(items)
    });
})

//TODO: send message from ext script to aware about status. 
chrome.history.onVisited.addListener(resourse => {
    getTasks().then((resolve) => {
        if (filterPatterns.some(pattern => resourse.url.match(pattern))) {
            showNotification(getItems(resolve.tasks))
        }
    })
})



const showNotification = (tasks) => {
    const title = 'Есть свободное время?'
    const body = `${tasks.map(task => task.text + '\n')}`
    const options = { body: body }

    var n = new Notification(title, options);
    setTimeout(n.close.bind(n), 8000);
}

const getItems = (list) => list.filter(item => item.type === 1);