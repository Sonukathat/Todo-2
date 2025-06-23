let addbtn = document.querySelector("#addbtn");
let inp = document.querySelector("#inp");
let section1 = document.querySelector("#section1")
let section2 = document.querySelector("#section2");
let saveBtn = document.querySelector("#saveBtn")
let arr = [];
let id = 0;

addbtn.addEventListener("click", addTask)
function addTask() {
    if (inp.value == "") {
        alert("Please Enter Task...");
    }
    else {
        let currentId = id;
        let taskdiv = document.createElement("div");
        section1.appendChild(taskdiv);
        let task = document.createElement("span");
        let delbtn = document.createElement("button");
        delbtn.innerText = "DELETE"
        let upbtn = document.createElement("button");
        upbtn.innerText = "UPDATE"
        let chek = document.createElement("input");
        chek.setAttribute("type", "checkbox")
        taskdiv.append(chek, task, delbtn, upbtn);
        task.textContent = inp.value;
        arr.push({ id: currentId, task: inp.value, completed: false })

        inp.value = "";
        // console.log(arr);
        // let data = JSON.stringify(arr)
        // localStorage.setItem("Task",data);



        delbtn.addEventListener("click", function (e) {
            taskdiv.remove();
            // console.log(id);

            console.log(arr);
            arr = arr.filter((ele) => {
                if (ele.id !== currentId) {
                    console.log(id);
                    return ele;
                }
            })
            console.log(arr);

        })


        upbtn.addEventListener("click", function () {
            let pro = prompt("Update Task");
            if (pro) {
                task.textContent = pro;

                arr = arr.map((ele) => {
                    if (ele.id === currentId) {
                        return { ...ele, task: pro };
                    }
                    return ele;
                });
            }
        })

        chek.addEventListener("click", function () {

            if (chek.checked) {
                section2.appendChild(taskdiv);

                arr.forEach(item => {
                    item.completed = true;
                    // console.log("");                    
                });
            } else {
                section1.appendChild(taskdiv);
                arr.forEach(item => {
                    item.completed = false;
                    // console.log("");

                });
            }
        })

        id++;

    }
}

window.addEventListener('load', () => {
    let data = localStorage.getItem('Task');
    data = JSON.parse(data);
    if (data) {
        arr = data;
        // const idArr = arr.map((ele)=> ele.id);
        // console.log(idArr);
        id = arr[arr.length - 1].id;
        arr.map((obj) => {
            let taskdiv = document.createElement("div");
            section1.appendChild(taskdiv);
            let task = document.createElement("span");
            let delbtn = document.createElement("button");
            delbtn.innerText = "DELETE"
            let upbtn = document.createElement("button");
            upbtn.innerText = "UPDATE"
            let chek = document.createElement("input");
            chek.setAttribute("type", "checkbox")
            taskdiv.append(chek, task, delbtn, upbtn);
            task.textContent = obj.task;

            delbtn.addEventListener("click", function () {
                taskdiv.remove();
                // console.log(arr); 
                arr = arr.filter((ele) => {
                    if (ele.id !== obj.id) {
                        console.log(id);
                        return ele;
                    }
                })
                // console.log(arr);


            })

            if (obj.completed == true) {
                chek.checked = true;
                section2.appendChild(taskdiv);
            }
            chek.addEventListener("click", function () {


                if (chek.checked) {
                    section2.appendChild(taskdiv);
                    obj.completed = true;

                } else {
                    section1.appendChild(taskdiv);
                    obj.completed = false;
                }
            })

            upbtn.addEventListener("click", function () {
                let pro = prompt("Update Task");
                if (pro) {
                    task.textContent = pro;

                    arr = arr.map((ele) => {
                        if (ele.id === obj.id) {
                            return { ...ele, task: pro };
                        }
                        return ele;
                    });
                }
            });

        })
    }

})


saveBtn.addEventListener("click", function () {
    let data = JSON.stringify(arr)
    // console.log(data);
    // console.log(data);
    saveBtn.style.backgroundColor = "#22c55e"; 
    saveBtn.innerText = "Saved";

    
    setTimeout(() => {
        saveBtn.style.backgroundColor = "#3b82f6";
        saveBtn.innerText = "Save";
    }, 500);
    localStorage.setItem("Task", data);

})