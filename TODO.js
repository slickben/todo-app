(() => {
    //set storage
    function savaTaskToStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }




    class Todo {
        constructor(focus) {
            this.focus = focus
            this.complete = false
            this.id = Math.random().toString(36).substr(1, 9);
        }
        completed() {
            console.log("hulaho")
        }
    }

    //listen when button click
    function deleteFuncBtn(e) {
        //get id from each element
        id = e.target.parentNode.id;
        //validate 
        if (e.target.classList.contains("#")) {
            //execute delete method
            //pass it the id
            app.deleteFunc(id)
        }
    }
    //listen when button click
    function completeBtn(e) {
        //get id from each element
        id = e.target.parentNode.id;
        //validate 
        if (e.target.classList.contains("*")) {
            //execute delete method
            //pass it the id
            app.completeTaskFunc(id)
        }
    }

    let app = {
        task: document.getElementById("focus"),
        init() {

            this.save();
            this.populate();
            this.completeAllTasksFunc();
            this.deleteAllTask();
            this.deleteAllCompleteTAsks();
        },

        save() {
            // lesten when submit form
            document.getElementById("form").addEventListener("submit", () => {
                let todo = new Todo(this.task.value)
                // console.table(todo)
                let tasks = [];
                //chech if local storage is empty
                if (localStorage.getItem("tasks") === null) {
                    //add input value to array
                    tasks.push(todo)
                    //if storage is empty save array task
                    savaTaskToStorage(tasks);

                    //name
                    //complee false
                } else {
                    // if not empty call get task from local storage 
                    let tasks = JSON.parse(localStorage.getItem("tasks"));
                    //add to it
                    tasks.push(todo)
                    //sava it back
                    savaTaskToStorage(tasks)
                }
            })
        },
        //method populate task to the UI
        populate() {


            //get task from storage
            let tasks = JSON.parse(localStorage.getItem("tasks"));

            //get div to display task

            let showTask = document.getElementById("showFocus")
            showTask.innerHTML = "";

            for (let i = 0; i < tasks.length; i++) {
                let focus = tasks[i].focus
                let id = tasks[i].id

                //dom variables
                let li = document.createElement("li");
                let a = document.createElement("a");
                let checkBox = document.createElement("input");
                let span = document.createElement("span");

                //set attribute to elements
                span.setAttribute("id", "span");
                checkBox.setAttribute("type", "checkbox");
                checkBox.setAttribute("class", "*");
                li.setAttribute("id", id);
                li.setAttribute("class", "$");
                a.setAttribute("href", "#");
                a.setAttribute("class", "far fa-trash-alt")
                a.classList.add("#");

                //Listen when button click
                checkBox.addEventListener('click', completeBtn);
                a.addEventListener("click", deleteFuncBtn);

                //asign focus to span element
                span.innerHTML = focus;

                //append child to list element
                li.appendChild(checkBox);
                li.appendChild(span);
                li.appendChild(a);


                //append list element to mother
                showTask.appendChild(li)

            }
        },

        deleteFunc(id) {
            //get task from local storage
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            //loop through it 
            for (i = 0; i < tasks.length; i++) {
                if (tasks[i].id == id) {
                    tasks.splice(i, 1)
                }
            }
            savaTaskToStorage(tasks);
            this.populate()
        },


        completeTaskFunc(id) {
            //get all input checkbox on list item
            let checkboxs = Array.from(document.querySelectorAll(".task input"));
            console.log(checkboxs);
            //loop through it 
            for (i = 0; i < checkboxs.length;) {
                //if any check 
                let listItem = document.getElementById(id);
                if (checkboxs[i].checked == true) {
                    //get the list item by id and add strick
                    listItem.classList.toggle("strick");
                    checkboxs[i].checked = true
                } else {
                    //get the list item by id and remove strick
                    listItem.classList.toggle("strick");
                    checkboxs[i].checked = false
                }
                i++
            }
            // checkboxs.map( (checkBox) => {
            //    
            // })


        },

        completeAllTasksFunc() {
            //get the checkbox for checkall complete all tasks
            let checkAllTasks = document.getElementById("allTasksCheckbox")
            //get all checkbox input in the list item
            let checkboxs = Array.from(document.querySelectorAll("li input"))
            checkAllTasks.addEventListener("click", () => {
                //if check
                if (checkAllTasks.checked) {
                    //get all list item
                    let tasks = Array.from(document.querySelectorAll("li"))
                    //loop over it and add strick class to it
                    for (i = 0; i < tasks.length; i++) {
                        tasks[i].classList.toggle("strick")
                    }
                    //also loop through the checkbox input set all to checked
                    for (i = 0; i < checkboxs.length; i++) {
                        checkboxs[i].checked = true
                    }


                } else {
                    //get all list item
                    let tasks = Array.from(document.querySelectorAll("li"))
                    //loop over it and remove strick class to it
                    for (i = 0; i < tasks.length; i++) {
                        tasks[i].classList.toggle("strick")
                    }
                    //also loop through the checkbox input set all to unchecked
                    for (i = 0; i < checkboxs.length; i++) {
                        checkboxs[i].checked = false
                    }
                }
            })

        },
        deleteAllTask() {
            //listen when button is click
            document.getElementById("all-tasks-btn").addEventListener("click", () => {
                //remove all tasks from storage
                localStorage.removeItem("tasks");
                //refresh the page
                this.populate();
            })

        },
        deleteAllCompleteTAsks() {
            //Listen when button click
            document.getElementById("all-complete-tasks-btn").addEventListener("click", () => {
                //get  all  element with strick class covert from nodelist to an array
                let tasks = Array.from(document.getElementsByClassName("strick"))
                // loop through and get the ids
                let getIds = tasks.map(function (cur) {
                    let id = cur.id
                    //get all tasks from local storage
                    let tasks = JSON.parse(localStorage.getItem("tasks"));
                    // console.log(tasks)
                    // loop througe tasks and check 
                    for (i = 0; i < tasks.length; i++) {
                        //if id equal to id 
                        if (tasks[i].id == id) {
                            //splice it out of local storage
                            tasks.splice(i, 1)
                        }
                    }
                    //re-set local storage
                    savaTaskToStorage(tasks);

                })
                //refresh the page
                this.populate()
                // console.log(getIds)



            })

        }


    }
    // console.log(app)
    app.init();
})();