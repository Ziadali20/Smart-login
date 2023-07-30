var myLogIn = document.querySelector('.myLogIn');

var currentEmail = document.querySelector('input[name="currentEmail"]');
var currentPassword = document.querySelector('input[name="currentPassword"]');

var mySignUpAcc = document.querySelector('.mySignUpAcc');

var myLogInBtn = document.querySelector('.myLogInBtn');

var mySignUp = document.querySelector('.mySignUp');

var nameInp = document.querySelector('input[name="name"]');
var emailInp = document.querySelector('input[name="email"]');
var passInp = document.querySelector('input[name="password"]');

var mySignInAcc = document.querySelector('.mySignInAcc');

var mySignUpBtn = document.querySelector('.mySignUpBtn');

var myHome = document.querySelector('.myHome');
var logOut = document.querySelector('.myI');


var nameRegex = /[\w]{2,9}/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

var dataContainer = [];

if (localStorage.getItem("users") != null) {
    dataContainer = JSON.parse(localStorage.getItem("users"));
}
else {
    dataContainer = [];
}

function clearForm() {
    nameInp.value = "";
    emailInp.value = "";
    passInp.value = "";
}

nameInp.addEventListener('input', function () {
    if (nameRegex.test(nameInp.value)) {
        nameInp.classList.remove("is-invalid");
        nameInp.classList.add("is-valid");
    }
    else {
        nameInp.classList.add("is-invalid")
        nameInp.classList.remove("is-valid");
    }
})

emailInp.addEventListener("input", function () {
    if (emailRegex.test(emailInp.value)) {
        emailInp.classList.remove("is-invalid");
        emailInp.classList.add("is-valid");
    }
    else {
        emailInp.classList.add("is-invalid")
        emailInp.classList.remove("is-valid");
    }
})

passInp.addEventListener("input", function () {
    if (passwordRegex.test(passInp.value)) {
        passInp.classList.remove("is-invalid");
        passInp.classList.add("is-valid");
    }
    else {
        passInp.classList.add("is-invalid")
        passInp.classList.remove("is-valid");
    }
})

function checkDuplicationLocalStorageInSignup(email){
    var users = JSON.parse(localStorage.getItem("users"));
    if (users === null) {
        return true;
    }
    else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                return false;
            }
        }
        return true;
    }
}

function signUpUser() {
    if (nameRegex.test(nameInp.value) && emailRegex.test(emailInp.value) && passwordRegex.test(passInp.value)) {
        if (checkDuplicationLocalStorageInSignup(emailInp.value) ) {
            var userData = {
                name: nameInp.value,
                email: emailInp.value,
                password: passInp.value
            };
            dataContainer.push(userData);
            localStorage.setItem("users", JSON.stringify(dataContainer));
            clearForm();
            myHome.classList.replace('d-none', 'd-block');
            myLogIn.classList.replace('d-block', 'd-none');
            mySignUp.classList.replace('d-block', 'd-none');

            var welcomeSignupMessage = document.createElement('h1');
            welcomeSignupMessage.textContent = "Welcome " + userData.name;
            document.querySelector('.myDiv2').appendChild(welcomeSignupMessage);
        }
        else {
            window.alert("This email is already in use. Please use a different email.");
        }
    } else {
        window.alert(`Your Name or Email or Password is not valid, Please follow the rules below :

        1 - Your name must contain at least 2 characters
        2 - Email must be a valid one
        3 - Password must contain at least one special character (@#$%^&*) , 8 characters`);
    }
}

mySignInAcc.addEventListener('click', function () {
    myLogIn.classList.replace('d-none', 'd-block');
    mySignUp.classList.replace('d-block', 'd-none');
    myHome.classList.replace('d-block', 'd-none');
})

mySignUpBtn.addEventListener('click', function () {
    signUpUser();
})

function checkDuplicationLocalStorageInLogin(email , password) {
    var users = JSON.parse(localStorage.getItem("users"));
    if (users === null) {
        return true;
    }
    else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                return false;
            }
        }
        return true;
    }
}

function logInUser() {
    if (checkDuplicationLocalStorageInLogin(currentEmail.value , currentPassword.value) === true) {
        window.alert("Wrong email or password");
    } else {
        var users = JSON.parse(localStorage.getItem("users"));
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === currentEmail.value && users[i].password === currentPassword.value) {
                myHome.classList.replace('d-none', 'd-block');
                myLogIn.classList.replace('d-block', 'd-none');
                mySignUp.classList.replace('d-block', 'd-none');

                var welcomeLoginMessage = document.createElement('h1');
                welcomeLoginMessage.textContent = "Welcome " + users[i].name;
            }
        }
        document.querySelector('.myDiv2').appendChild(welcomeLoginMessage);
    }
}

mySignUpAcc.addEventListener('click', function () {
    myLogIn.classList.replace('d-block', 'd-none');
    mySignUp.classList.replace('d-none', 'd-block');
    myHome.classList.replace('d-block', 'd-none');
})

myLogInBtn.addEventListener('click', function () {
logInUser();
});


logOut.addEventListener('click', function () {
    myLogIn.classList.replace('d-none', 'd-block');
    mySignUp.classList.replace('d-block', 'd-none');
    myHome.classList.replace('d-block', 'd-none');
})

