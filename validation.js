const form = document.getElementById("form")
const firstNameInput = document.getElementById("FirstName_input")
const emailInput = document.getElementById("EMail_input")
const passwordInput = document.getElementById("Password_input")
const confirmPasswordInput = document.getElementById("Confirm_Password_input")
const errorMessage = document.getElementById("error-message")

form.addEventListener('submit', (e) => {

    e.preventDefault()

    let errors = []

    if(firstNameInput){

        errors = getSignUpFormErrors(firstNameInput.value, emailInput.value, passwordInput.value, confirmPasswordInput.value)

        if(errors.length === 0){
            registerUser(firstNameInput.value, emailInput.value, passwordInput.value)
            return
        }

    } else {

        errors = getLoginFormErrors(emailInput.value, passwordInput.value)

        if(errors.length === 0){
            loginUser(emailInput.value, passwordInput.value)
            return
        }

    }

    errorMessage.innerText = errors.join(". ")

})

function getSignUpFormErrors(name, email, password, confirmPassword){

    let errors = []

    if(name === '' || name == null){
        errors.push("Name Required")
        firstNameInput.parentElement.classList.add("Incorrect")
    }

    if(email === '' || email == null){
        errors.push("Email Required")
        emailInput.parentElement.classList.add("Incorrect")
    }

    if(password === '' || password == null){
        errors.push("Password Required")
        passwordInput.parentElement.classList.add("Incorrect")
    } else if(password.length < 6){
        errors.push("Password Must Be At Least 6 Characters")
        passwordInput.parentElement.classList.add("Incorrect")
    }

    if(confirmPassword === '' || confirmPassword == null){
        errors.push("Enter Password Again")
        confirmPasswordInput.parentElement.classList.add("Incorrect")
    } else if(confirmPassword !== password){
        errors.push("Passwords Do Not Match")
        confirmPasswordInput.parentElement.classList.add("Incorrect")
    }

    return errors;
}

function getLoginFormErrors(email, password){

    let errors = []

    if(email === '' || email == null){
        errors.push("Email Required")
        emailInput.parentElement.classList.add("Incorrect")
    }

    if(password === '' || password == null){
        errors.push("Password Required")
        passwordInput.parentElement.classList.add("Incorrect")
    }

    return errors;
}

async function registerUser(name, email, password){

    try{

        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })

        const data = await response.json()

        if(!response.ok){
            emailInput.parentElement.classList.add("Incorrect")
            errorMessage.innerText = data.error
            return
        }

        window.location.href = "login.html"

    } catch(err){
        errorMessage.innerText = "Something went wrong. Please try again."
    }

}

async function loginUser(email, password){

    try{

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if(!response.ok){
            errorMessage.innerText = data.error
            emailInput.parentElement.classList.add("Incorrect")
            passwordInput.parentElement.classList.add("Incorrect")
            return
        }

        window.location.href = "welcome.html"

    } catch(err){
        errorMessage.innerText = "Something went wrong. Please try again."
    }

}

const allInputs = [firstNameInput, emailInput, passwordInput, confirmPasswordInput].filter(Boolean)

allInputs.forEach(input => {
input.addEventListener("input", () => {
    if(input.value.trim() !== "" && input.parentElement.classList.contains("Incorrect")){
        input.parentElement.classList.remove("Incorrect")

        const stillIncorrect = allInputs.some(inp => inp.parentElement.classList.contains("Incorrect"))
        if(!stillIncorrect){
            errorMessage.innerText = ""
        }
    }
})
})
