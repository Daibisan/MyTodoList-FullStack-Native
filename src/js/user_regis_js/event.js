import { login } from "./login.js";
import { signUp } from "./signup.js";
import { autoCursotPlacement, switchForm, togglePasswordEye } from "./ui.js";

export function domEventInit() {

    // Auto switch form after logout
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('condition');
    
    if (param === 'logout') 
        switchForm();

    // Auto Cursor Placement
    autoCursotPlacement('Signup Form');

    // Show/Hide password onclick
    document
        .querySelectorAll('.toggle-password-btn')
        .forEach(btn => btn.addEventListener('click', (e) => togglePasswordEye(e.target)));

    // Switch Form onclick
    document
        .querySelectorAll('.bottom-container a')
        .forEach(btn => btn.addEventListener('click', switchForm));

    // Signup event
    signUpEvent();

    // Login event
    loginEvent();

}

function loginEvent() {

    // onclick
    const login_btn = document.getElementById('login-btn');
    login_btn.addEventListener('click', () => login(login_btn));

    // on keyboard enter
    const login_inputs = (document.getElementById('login-container').querySelector('.form-container')).querySelectorAll('input');
    login_inputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                login(login_btn);
        })
    });

}

function signUpEvent() {

    // onclick
    const signup_btn = document.getElementById('signup-btn');
    signup_btn.addEventListener('click', () => signUp(signup_btn));

    // on keyboard enter
    const signUp_inputs = (document.getElementById('signUp-container').querySelector('.form-container')).querySelectorAll('input');
    signUp_inputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                signUp(signup_btn);
        })
    });

}