let IDcounter = 0;
let input = document.querySelector('input[type="text"]');


inputUser.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask();
    guardarDatos();
});

let addTask = () => {
    IDcounter++;
    let task = input.value;
    if (task) {

        const taskContainer = `<div class="task-container" id="${IDcounter}">
                                    <label>
                                        <input type="checkbox" id="idTask">
                                        ${task}
                                    </label>
                                    <img src="img/trash-bin.png" alt="" class="btnClose">
                                </div>`;


            list.insertAdjacentHTML('beforeend', taskContainer);
            input.value = '';
        updateStats();
    } else {
        alert('Please, write a task');
    }
};


list.addEventListener('click', (event) => {
    if (event.srcElement.nodeName === 'INPUT') {
        updateStats();
    } else if (event.srcElement.nodeName === 'IMG') {
        deleteTask(event.srcElement.parentNode.id);
    }
});

let updateStats = () => {
    let element = document.querySelectorAll('div');
    let elements = element.length - 3;
    let check = document.querySelectorAll('input[type="checkbox"]:checked');
    stats.innerHTML = `<p>Pending Tasks: ${elements - check.length} | Complete Task: ${check.length} </p>`;
    guardarDatos();
};

let deleteTask = (id) => {
    let element = document.getElementById(id);
    element.remove();
    updateStats();
    guardarDatos();
}

cargarData();
function guardarDatos() {
    let element = document.querySelectorAll('div');
    let elements = element.length - 3;
    let check = document.querySelectorAll('input[type="checkbox"]:checked');
    let labell = document.querySelectorAll('label');
    let data = {
        pendientes: elements - check.length,
        completadas: check.length,
        tareas: {
            tarea: []
        }
    };
    for (let i = 0; i < labell.length; i++) {
        let task = labell[i].innerText;
        let checkbox = labell[i].firstElementChild.checked;
        data.tareas.tarea.push({
            task: task,
            checkbox: checkbox
        });
    }
    localStorage.setItem('data', JSON.stringify(data));
};

function cargarData() {
    if (typeof (Storage) !== "undefined") {
        let data = localStorage.getItem('data');
        if (data) {
            data = JSON.parse(data);

            let tareas = data.tareas.tarea;
            for (let i = 0; i < tareas.length; i++) {
                let task = tareas[i].task;
                let checkbox = tareas[i].checkbox;
                if (checkbox) {
                    list.innerHTML +=
                        `<div class="task-container" id="${IDcounter++}">
                            <label>
                                <input type="checkbox" checked>
                                ${task}
                            </label>
                            <img src="img/trash-bin.png" alt="" class="btnClose">
                        </div>`;
                } else {
                    list.innerHTML +=
                        `<div class="task-container" id="${IDcounter++}">
                            <label>
                                <input type="checkbox" >
                                ${task}
                            </label>
                            <img src="img/trash-bin.png" alt="" class="btnClose">
                        </div>`;
                }
            }
            updateStats();
        }
    }
};
