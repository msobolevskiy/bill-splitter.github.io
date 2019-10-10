const xhr = new XMLHttpRequest();

class LoginPage {
    constructor() {
        this.userNameInputSignUp = document.querySelector('#user-name');
        this.emailInputSignUp = document.querySelector('#email-input');
        this.passwordInputSignUp = document.querySelector('#password-input');
        this.userNameInputLogin = document.querySelector('#user-name-input-login');
        this.loginPasswordField = document.querySelector('#password-input-login');
        this.buttonLogIn = document.querySelector('#button-login');
        this.buttonSubmit = document.querySelector('#button-submit');
        this.buttonSubmit.addEventListener('click', this.signIn.bind(this));
        this.buttonLogIn.addEventListener('click', this.logIn.bind(this));
        this.usernamediv = document.querySelector('.username');

    }

    signIn() {
        const email = this.emailInputSignUp.value;
        const password = this.passwordInputSignUp.value;
        const userName = this.userNameInputSignUp.value;
        //добавить валидацию на инпут поля
        let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let validEmailname = email.match(emailRegex);
        if (validEmailname == null) {
            alert("Your email is not valid.");

        } else {
            // высылаем пост запрос XMLHttpRequest  для созданя юзера
            xhr.open("POST", 'http://localhost:5000/api/v1/CreateUser', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

            xhr.send(JSON.stringify({
                userEmail: email,
                password: password,
                userName: userName
            }));

            this.emailInputSignUp.value = "";
            this.passwordInputSignUp.value = "";
            this.userNameInputSignUp.value = "";
        }
    }

    logIn() {
        const email = this.userNameInputLogin.value;
        const password = this.loginPasswordField.value;
        // добавить валидацию на инпт поля

        let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let validEmailname = email.match(emailRegex);
        if (validEmailname == null) {
            alert("Your email is not valid.");

        } else {
            xhr.open("POST", 'http://localhost:5000/api/v1/GetUser', false);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

            xhr.send(JSON.stringify({
                userEmail: email,
                password: password
            }));
            // если идентичные данные есть в JSON, то вход успешен и мы заберём  UserName / проверка происходимт в endPoints
            const status = xhr.status;
            const response = JSON.parse(xhr.responseText);
            const UserName = response.foundUser.name;
            sessionStorage.setItem('username', UserName);
            let tempuser = sessionStorage.getItem('username');
            if (tempuser != null) {
                this.usernamediv.innerText = tempuser;
            } else {
                this.usernamediv.innerText = "Guest";
            }

        }
        this.userNameInputLogin.value = "";
        this.loginPasswordField.value = "";
        // высылаем пост запрос XMLHttpRequest  для получения юзера


    }

    // функция отправки UserName в локалсторадж
}

export {
    LoginPage
};