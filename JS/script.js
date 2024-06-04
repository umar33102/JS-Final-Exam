const showToastify = (msg,colorType) => {
    let bgColor = ""
    switch (colorType) {
        case "success":
            bgColor = "linear-gradient(to right, #00b09b, #96c93d)"
            break;
        case "error":
            bgColor = "background: linear-gradient(to right, #ff0000, #ff6666)";
            break;
        
        default:
            bgColor = "black"
            break;
    }
    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: bgColor,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}



const showSignupPage = () => {
    document.getElementById("loginForm").classList.add("d-none")
    document.getElementById("signupForm").classList.remove("d-none")
}
const showLoginPage = () => {
    document.getElementById("loginForm").classList.remove("d-none")
    document.getElementById("signupForm").classList.add("d-none")
}

let users = []

const getValueFromInputField = id => document.getElementById(id).value

const handleUserLogin = () => {
    let loginEmail = getValueFromInputField("loginEmail")
    let loginPassword = getValueFromInputField("loginPassword")

    if (!loginEmail || !loginPassword) {
        showToastify("Please Fill All Field. ",'error')
        return
    }

    let checkUserEmail = users.find(user => user.email === loginEmail)
    let checkUserPassword = users.find(user => user.password === loginPassword)

    if (checkUserEmail && checkUserPassword) {
        showToastify("Login Successfully. ","success")
        document.getElementById("email").innerHTML = JSON.stringify(checkUserEmail)
        document.getElementById("login-signup").classList.add("d-none")
        document.getElementById("todoApp").classList.remove("d-none")
    } else {
        showToastify("Invalide User Email and Password. ","error")
    }
}


const handleUserSignup = () => {
    let signupEmail = getValueFromInputField("signupEmail")
    let signupPassword = getValueFromInputField("signupPassword")
    if (signupPassword.length < 6) {
        showToastify("Enter Password Minimun 6 Lenght.","error")
        return
    }

    if (!signupEmail || !signupPassword) {
        showToastify("Please Fill All Field. ","error")
        return
    }

    let user = {
        email : signupEmail,
        password : signupPassword
    }

    let checkUserEmail = users.find(item => item.email === signupEmail)

    if (checkUserEmail) {
        showToastify("User Already Exit. ","error")
        return
    } else {
        showToastify("User Successfully Added. ", "success")
        users.push(user)
        showLoginPage()
    }
}



// Todo App

let todos = []

const createTask = () => {
    let title = getValueFromInputField("title")
    let description = getValueFromInputField("description")
    let date = getValueFromInputField("date")

    if (!title || !description || !date) {
        showToastify("Please Fill All Field. ","error")
        return
    }

    let checkTitle = todos.find(todo => todo.title === title)

    

    let todo = {
        title,
        description,
        date,
        status : "Inactive",
        createAt : new Date().getDate(),
        id : todos.length + 1     
    }

    todos.push(todo)
    showToastify("Todo Successfully Created: ","success")

}


const showTask = () => {
    if (todos.length === 0) {
        showToastify("No Task Found: ", "error")
    }

    let output = document.getElementById("output")
    output.innerHTML = ""

    let header = document.createElement("tr");
    header.innerHTML = `
        <th>Title</th>    
        <th>Description</th>    
        <th>Date</th>    
        <th>Status</th>    
        <th>Created At</th>    
        <th>ID</th>    
    `;
    output.appendChild(header);

    todos.forEach(todo => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.date}</td>
            <td>${todo.status}</td>
            <td>${todo.createAt}</td>
            <td>${todo.id}</td>
        `;
        output.appendChild(tr)
    });
};



const updateTask = () => {
    let title = prompt("Enter the title for Update Status: ")
    if (title === null || title === "") {
        showToastify("Enter the title: ","error")
        return
    }
    let update = todos.map(todo  => {
        if (todo.title === title) {
            return {...todo, status : "Active"}
        }
        return todo
    })

    todos = update
    showToastify("Successfully Updated: ",'success')
}
const deleteTask = () => {
    let title = prompt("Enter the title for Delete Task: ")
    if (title === null || title === "") {
        showToastify("Enter the  Title: ")
        return
    }
    let remove = todos.filter(todo => todo.title !== title)

    todos = remove
    showToastify("Successfully Deleted: ",'success')
}

