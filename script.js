let addBtn = document.querySelector("#addbtn");
let inp = document.querySelector("#inp");
let section1 = document.querySelector("#section1");
let section2 = document.querySelector("#section2");
let saveBtn = document.querySelector("#saveBtn");

let arr = [];
let id = 0;

// Load from localStorage on page load
window.addEventListener("load", () => {
    const data = JSON.parse(localStorage.getItem("Task")) || [];
    arr = data;
    if (arr.length > 0) id = arr[arr.length - 1].id + 1;
    arr.forEach(createTaskElement);
});

// Add Task
addBtn.addEventListener("click", () => {
    if (inp.value.trim() === "") return alert("Please Enter Task...");

    const taskObj = {
        id: id++,
        task: inp.value,
        completed: false,
    };

    arr.push(taskObj);
    createTaskElement(taskObj);
    inp.value = "";
});

// Create Task Element Function
function createTaskElement(obj) {
    const taskDiv = document.createElement("div");
    const task = document.createElement("span");
    const delBtn = document.createElement("button");
    const upBtn = document.createElement("button");
    const check = document.createElement("input");

    task.textContent = obj.task;
    delBtn.textContent = "DELETE";
    upBtn.textContent = "UPDATE";
    check.type = "checkbox";
    check.checked = obj.completed;

    taskDiv.append(check, task, delBtn, upBtn);
    (obj.completed ? section2 : section1).appendChild(taskDiv);

    if (obj.completed) task.classList.add("textdec");

    // DELETE
    delBtn.addEventListener("click", () => {
        taskDiv.remove();
        arr = arr.filter((ele) => ele.id !== obj.id);
    });

    // UPDATE
    upBtn.addEventListener("click", () => {
        const newVal = prompt("Update Task", obj.task);
        if (newVal) {
            task.textContent = newVal;
            obj.task = newVal;
        }
    });

    // COMPLETE
    check.addEventListener("change", () => {
        obj.completed = check.checked;
        task.classList.toggle("textdec", obj.completed);
        (obj.completed ? section2 : section1).appendChild(taskDiv);
    });
}

// SAVE
saveBtn.addEventListener("click", () => {
    localStorage.setItem("Task", JSON.stringify(arr));
    saveBtn.style.backgroundColor = "#22c55e";
    saveBtn.innerText = "Saved";

    setTimeout(() => {
        saveBtn.style.backgroundColor = "#3b82f6";
        saveBtn.innerText = "Save";
    }, 500);
});
