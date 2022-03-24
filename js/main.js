'use strict'
document.addEventListener('DOMContentLoaded', function() {
    // side menu
    const menuBtn = document.querySelector('.header__menu-btn');
    const sideMenu = document.querySelector('.side-menu');
    menuBtn.onclick = () => {
        if (sideMenu.classList.contains('open')) {
            closeMenu();
        }
        else {
            menuBtn.classList.add('open');
            sideMenu.classList.add('open');
            overlay.classList.add('open');
        }
    }
    function closeMenu() {
        if (sideMenu.classList.contains('open')) {
            menuBtn.classList.remove('open');
            sideMenu.classList.remove('open');
            if (!loginRegModal.classList.contains('open')) {
                overlay.classList.remove('open');
            }
        }
    }

    // reviews slider
    $('.reviews-slider').slick({
        slidesToShow: 3,
        prevArrow: '.review-slider--previous',
        nextArrow: '.review-slider--next',
        responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
              }
            }
        ]    
    })

    // scroll to top btn
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
    scrollToTopBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    // display btn after 400px scroll
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 400) {
            scrollToTopBtn.style.display = 'block';
        }
        else {
            scrollToTopBtn.style.display = 'none';
        }
    }


    // login and registration modal
    const loginRegModal = document.querySelector('.login-reg-modal');
    const overlay = document.querySelector('.overlay');
    const usernamesHtml = document.querySelectorAll('.username');
    // close btn
    const clsoeLoginRegModalBtn = document.querySelectorAll('.close-login-reg-modal-btn');

    // open login 
    const openLoginModalBtn = document.querySelectorAll('.show-login-btn');
    openLoginModalBtn.forEach(btn => {
        btn.onclick = () => {
            loginRegModal.classList.add('open', 'login-reg-modal--login');
            loginRegModal.classList.remove('login-reg-modal--register', 'login-reg-modal--success', 'login-reg-modal--logout');
            overlay.classList.add('open');
            // close menu
            menuBtn.classList.remove('open');
            sideMenu.classList.remove('open');
        }
    })

    // open registration 
    const openRegModalBtn = document.querySelectorAll('.show-registration-btn');
    openRegModalBtn.forEach(btn => {
        btn.onclick = () => {
            loginRegModal.classList.add('open', 'login-reg-modal--register');
            loginRegModal.classList.remove('login-reg-modal--login', 'login-reg-modal--success');
            overlay.classList.add('open');
            // close menu
            menuBtn.classList.remove('open');
            sideMenu.classList.remove('open');
        }
    })

    // close modal
    let transitionDuration = 300;
    function closeModal() {
        if (loginRegModal.classList.contains('open')) {
            loginRegModal.classList.remove('open');
            setTimeout(function() {
                loginRegModal.classList.remove('login-reg-modal--login', 'login-reg-modal--register', 'login-reg-modal--success', 'login-reg-modal--logout');
            }, transitionDuration);
            if (!sideMenu.classList.contains('open')) {
                overlay.classList.remove('open');
            }
        }
    }
    clsoeLoginRegModalBtn.forEach(btn => {
        btn.onclick = () => {
            closeModal();
        }
    })
    overlay.onclick = () => {
        closeModal();
        closeMenu();
    }
    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    }

    // register 
    const registerForm = document.querySelector('.register-form');
    const registerBtn = document.querySelector('.register-btn');
    // reg name
    const registerName = registerForm.querySelector('.name');
    const registerNameError = registerForm.querySelector('.name-error-msg');
    // reg password 
    const registerPassowrd = registerForm.querySelector('.password');
    const registerPasswordError = registerForm.querySelector('.password-error-msg');
    const regShowPasswordBtn = registerForm.querySelector('.show-passowrd-btn');
    // reg password strength 
    const regPasswordStrenthIcons = registerForm.querySelector('.passowrd-strength-icons');
    const regPasswordStrengthHtml = registerForm.querySelector('.password-strength');
    // reg confirm passowrd 
    const registerConfirmPassword = registerForm.querySelector('.confirm-password');
    const regConfirmPasswordError = registerForm.querySelector('.confirm-password-error-msg');

    // reg name key down
    registerName.onkeydown = () => {
        preventSpace();
        // error reset
        registerName.classList.remove('invalid');
        registerNameError.innerHTML = '';
    }

    // reg password key down
    registerPassowrd.oninput = () => {
        preventSpace();
        // strength
        regPasswordStrenthIcons.classList.add('very-weak');
        regPasswordStrengthHtml.innerHTML = 'very weak';
        passwordStrength();
        // reset error
        registerPassowrd.classList.remove('invalid');
        regShowPasswordBtn.classList.remove('invalid');
        registerPasswordError.innerHTML = '';
    }
    // reg password no space
    registerPassowrd.onkeydown = () => {
        preventSpace();
    }

    // reg show and hide passwords 
    function showHidePasswords(passwordInput, showPassBtn) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPassBtn.classList.add('shown');
            if (loginRegModal.classList.contains('login-reg-modal--register')) {
                registerConfirmPassword.type = 'text';
            }
        }
        else {
            passwordInput.type = 'password';
            showPassBtn.classList.remove('shown');
            if (loginRegModal.classList.contains('login-reg-modal--register')) {
                registerConfirmPassword.type = 'password';
            }
        }
    }

    // reg show password
    regShowPasswordBtn.onclick = () => {
        showHidePasswords(registerPassowrd, regShowPasswordBtn);
    }

    // reg confirm password key down
    registerConfirmPassword.onkeydown = () => {
        preventSpace();
        // error reset
        registerConfirmPassword.classList.remove('invalid');
        regConfirmPasswordError.innerHTML = '';
    }

    // registration click   
    let logedIn = false;
    let logedUser = null;
    registerBtn.onclick = () => {
        nameValidation(registerName, registerNameError);
        passwordValidation(registerPassowrd, registerPasswordError, regShowPasswordBtn);
        regConfirmPassValidation();
        // registration
        if (nameValid === true && passwordValid === true && regConfirmPassValid === true) {
            let enteredName = registerName.value;
            let enteredPassword = registerPassowrd.value;
            // check for existing name
            let nameAvailable = true;
            for (let i=0; i<users.length; i++) {
                if (users[i].name === enteredName) {
                    nameAvailable = false;
                    break;
                }
            }
            if (nameAvailable === true) {
                logedIn = true;
                // make new user
                logedUser = new User(enteredName, enteredPassword);
                logedUser.add();
                // clear form
                registerName.value = '';
                registerPassowrd.value = '';
                registerConfirmPassword.value = '';
                // passeord strength reset
                regPasswordStrenthIcons.classList.remove('very-weak', 'weak', 'okay', 'good', 'very-good');
                regPasswordStrengthHtml.innerHTML = '';
                loginChangeContent();
                loginSuccessful('Registration');
            }
            else {
                registerName.classList.add('invalid');
                registerNameError.innerHTML = 'This name is already taken';
            }
        }
    }
    
    // prevent space
    function preventSpace() {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    }


    // users
    class User {
        constructor (name, password) {
            this.name = name;
            this.password = password;
            this.add = function() {
                users.push(this);
            }
        }
    }
    let users = [];

    let user1 = new User('username1', 'password1');
    user1.add();
    // console.log(users);
    // testpass1
    

    // login
    const body = document.querySelector('body');
    if (logedIn === false) {
        body.classList.add('loged-out');
    }
    function loginChangeContent() {
        body.classList.remove('loged-out');
        body.classList.add('loged-in');
    }

    // login form
    const loginForm = document.querySelector('.login-form');
    // name
    const loginName = loginForm.querySelector('.name');
    const loginNameError = loginForm.querySelector('.name-error-msg');
    // password
    const loginPassword = loginForm.querySelector('.password');
    const loginPasswordError = loginForm.querySelector('.password-error-msg');
    const loginShowPasswordBtn = loginForm.querySelector('.show-passowrd-btn');
    const loginBtn = loginForm.querySelector('.login-btn');
    // login error
    const loginError = loginForm.querySelector('.login-error-msg');

    // login attempt
    loginBtn.onclick = () => {
        nameValidation(loginName, loginNameError);
        passwordValidation(loginPassword, loginPasswordError, loginShowPasswordBtn);
        let enteredName = loginName.value;
        let enteredPassword = loginPassword.value;
        if (nameValid === true && passwordValid === true) {
            for (let i=0; i<users.length; i++) {
                if (enteredName == users[i].name && enteredPassword == users[i].password) {
                    logedIn = true;
                    logedUser = users[i];
                    // clear form
                    loginName.value = '';
                    loginPassword.value = '';
                    loginChangeContent();
                    loginSuccessful('Login');
                    return;
                }
            }
        }
        loginError.innerHTML = 'Username and password do not match!';
    }

    // login name no space and error reset 
    loginName.onkeydown = () => {
        preventSpace();
        // error reset
        loginName.classList.remove('invalid');
        loginNameError.innerHTML = '';
        loginError.innerHTML = '';
    }

    // login password no space and error reset 
    loginPassword.onkeydown = () => {
        preventSpace();
        // error reset
        loginPassword.classList.remove('invalid');
        loginShowPasswordBtn.classList.remove('invalid');
        loginPasswordError.innerHTML = '';
        loginError.innerHTML = '';
    }

    // login show password
    loginShowPasswordBtn.onclick = () => {
        showHidePasswords(loginPassword, loginShowPasswordBtn);
    }

    // successful login
    const regLoginModalSuccessMsgElement = document.querySelector('.login-reg-modal__success-messsage__element');
    function loginSuccessful(element) {
        regLoginModalSuccessMsgElement.innerHTML = element;
        loginRegModal.classList.remove('login-reg-modal--login', 'login-reg-modal--register');
        loginRegModal.classList.add('login-reg-modal--success');
        usernamesHtml.forEach(elem => {
            elem.innerHTML = logedUser.name;
        })
        setTimeout(function() {
            closeModal();
        }, 2000);
    }

    // open log out
    const showLogOutBtn = document.querySelector('.show-log-out');
    showLogOutBtn.onclick = () => {
        loginRegModal.classList.add('open', 'login-reg-modal--logout');
        loginRegModal.classList.remove('login-reg-modal--register', 'login-reg-modal--success', 'login-reg-modal--login');
        overlay.classList.add('open');
        // close menu
        menuBtn.classList.remove('open');
        sideMenu.classList.remove('open');
    }
    // log out
    const logOutBtns = document.querySelectorAll('.log-out-btn');
    logOutBtns.forEach(btn => {
        btn.onclick = () => {
            logedIn = false;
            logedUser = null;
            body.classList.add('loged-out');
            body.classList.remove('loged-in');
            closeModal();
        }
    })


    // validations

    // name validation
    let nameValid = false;
    function nameValidation(nameInput, nameError) {
        nameValid = false;
        let enteredName = nameInput.value;
        if (enteredName.length == 0) {
            nameInput.classList.add('invalid');
            nameError.innerHTML = 'This field is required';
            console.log('1');
            return;
        }
        if (enteredName.length < 3) {
            nameInput.classList.add('invalid');
            nameError.innerHTML = 'Name must contain atleast 3 characters';
            console.log('2');
            return;
        }
        if (enteredName.length > 15) {
            nameInput.classList.add('invalid');
            nameError.innerHTML = 'Name must contain less than 15 characters';
            console.log('3');
            return;
        }
        nameValid = true;
    }

    // password validation
    let passwordValid = false;
    function passwordValidation(passwordInput, passwordError, showPassBtn) {
        passwordValid = false;
        let enteredPassword = passwordInput.value;
        // not entered
        if (enteredPassword.length == 0) {
            passwordInput.classList.add('invalid');
            showPassBtn.classList.add('invalid');
            passwordError.innerHTML = 'This field is required';
            return;
        }
        // not long enough
        let longEnough = false;
        if (enteredPassword.length > 7) {
            longEnough = true;
        }
        // no number
        let hasNumber = false;
        for (let i=0; i < enteredPassword.length; i++) {
            if (!isNaN(enteredPassword[i])) {
                hasNumber = true;
                break;
            }
        }
        // too long 
        let tooLong = false;
        if (enteredPassword.length > 20) {
            tooLong = true;
        }

        // both error
        if (longEnough === false && hasNumber === false) {
            passwordInput.classList.add('invalid');
            showPassBtn.classList.add('invalid');
            passwordError.innerHTML = 'Password must contain atleast 8 characters and one number';
            return;
        }
        if (longEnough === false) {
            passwordInput.classList.add('invalid');
            showPassBtn.classList.add('invalid');
            passwordError.innerHTML = 'Password must contain atleast 8 characters';
            return;
        }
        if (hasNumber === false) {
            passwordInput.classList.add('invalid');
            showPassBtn.classList.add('invalid');
            passwordError.innerHTML = 'Password must contain atleast one number';
            return;
        }
        if (tooLong === true) {
            passwordInput.classList.add('invalid');
            showPassBtn.classList.add('invalid');
            passwordError.innerHTML = 'Password must be max 20 characters long';
            return;
        }
        passwordValid = true;
    }

    // confirm password validation
    let regConfirmPassValid = false;
    function regConfirmPassValidation() {
        regConfirmPassValid = false;
        let enteredPassword = registerPassowrd.value;
        let enteredConfirmPassword = registerConfirmPassword.value;
        if (enteredConfirmPassword.length == 0) {
            registerConfirmPassword.classList.add('invalid');
            regConfirmPasswordError.innerHTML = 'This field is required';
            return;
        }
        if (enteredPassword !== enteredConfirmPassword) {
            registerConfirmPassword.classList.add('invalid');
            regConfirmPasswordError.innerHTML = 'Passwords need to match';
            return;
        }
        regConfirmPassValid = true;
    }

    // reg password strength check
    function passwordStrength() {
        let enteredPassword = registerPassowrd.value;
        let passwordStrengthLevel = 0;
        regPasswordStrenthIcons.classList.remove('very-weak', 'weak', 'okay', 'good', 'very-good');

        // atleast 8 characters
        let regPasswordLong = false;
        if (enteredPassword.length > 7) {
            regPasswordLong = true;
            passwordStrengthLevel ++;
        }
        // atleast  one number
        let regPasswordNumber = false;
        for (let i=0; i < enteredPassword.length; i++) {
            if (!isNaN(enteredPassword[i])) {
                regPasswordNumber = true;
                passwordStrengthLevel ++;
                break;
            }
        }
        
        // very weak
        if (passwordStrengthLevel === 0) {
            regPasswordStrenthIcons.classList.add('very-weak');
            regPasswordStrengthHtml.innerHTML = ' very weak';
        } 
        // weak
        if (passwordStrengthLevel === 1) {
            regPasswordStrenthIcons.classList.add('weak');
            regPasswordStrengthHtml.innerHTML = 'weak';
        } 
        // okay
        if (passwordStrengthLevel === 2) {
            regPasswordStrenthIcons.classList.add('okay');
            regPasswordStrengthHtml.innerHTML = 'okay';
        } 
        // dont continue if password isnt long enough and doesnt have atleast one number
        if (regPasswordLong === false || regPasswordNumber === false) {
            return;
        }

        // atleast 1 uppercase letter
        for (let i=0; i < enteredPassword.length; i++) {
            let characterCharCode = enteredPassword[i].charCodeAt(0);
            if (characterCharCode >= 65 && characterCharCode <= 90) {
                passwordStrengthLevel ++;
                break;
            }
        }
        // more than 12 characters
        if (enteredPassword.length > 11) {
            passwordStrengthLevel ++;
        }

        // good
        if (passwordStrengthLevel === 3) {
            regPasswordStrenthIcons.classList.remove('very-weak', 'weak', 'okay', 'good', 'very-good');
            regPasswordStrenthIcons.classList.add('good');
            regPasswordStrengthHtml.innerHTML = 'good';
        } 
        // very good
        if (passwordStrengthLevel === 4) {
            regPasswordStrenthIcons.classList.remove('very-weak', 'weak', 'okay', 'good', 'very-good');
            regPasswordStrenthIcons.classList.add('very-good');
            regPasswordStrengthHtml.innerHTML = 'very good';
        } 
    }
})
