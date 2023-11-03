import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const inputForm = document.getElementById('input-form')
const inputTask = document.getElementById('task-field')
const selectedCost = document.getElementById('cost-select')

let taskList = []


document.addEventListener('click', function (e) {
    if (e.target.id === 'plus-btn') {
        addTaskToArray()
        renderTotalAmount()
        inputForm.reset()
    } else if (e.target.id === 'send-btn') {
        reset()
    } else if (e.target.dataset.remove) {
        removeTask(e.target.dataset.remove)
    }
})

const addTaskToArray = () => {
const existingTask = taskList.some(task => task.name === inputTask.value)

    if (inputTask.value && !existingTask) {
        taskList.push({
            name: inputTask.value,
            cost: selectedCost.value,
            uuid: uuidv4()
        })
    }
    renderTask()
}


const renderTask = () => {
    let renderTask = ''
    taskList.forEach((task) => {
        renderTask += `
            <div class="task-list">
                <p class="task-name">${task.name}</p>
                <p data-remove="${task.name}" class="remove-btn">Remove</p>
                <p class="task-price"><span class="dollar-sign">$</span>${task.cost}</p>
            </div>
        `
    })
    return document.getElementById('js-container').innerHTML = renderTask   
}


const getTotalAmount = () => {
    const totalAmount = taskList.reduce(function(total, current) {
        return parseInt(total) + parseInt(current.cost)
    },0)
    return totalAmount
}

const renderTotalAmount = () => {
    return document.getElementById('total-amount').innerText = "$" + getTotalAmount()
}


const reset = () => {
    taskList = []
    renderTask()
    renderTotalAmount()
}

const removeTask = (name) => {
   for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].name === name) {
            taskList.splice(i, 1)
    }
   }
   renderTask()
   renderTotalAmount()
}