import { signUp } from "./signup.js";
import { autoCursotPlacement, switchForm, togglePasswordEye } from "./ui.js";

export function domEventInit() {

    // Auto Cursor Placement
    autoCursotPlacement('Signup Form');
    
    // Show/Hide password onclick
    const togglePasswordBtn = document.querySelectorAll('.toggle-password-btn');
    togglePasswordBtn.forEach( btn => btn.addEventListener('click', (e) => togglePasswordEye(e.target)) );

    // Switch Form onclick
    const bottom_container = document.querySelectorAll('.bottom-container');    
    bottom_container.forEach( elm => elm.querySelector('a').addEventListener('click', switchForm) );

    // Signup event
    signUpEvent();
    
}

function signUpEvent() {

    // onclick
    const signup_btn = document.getElementById('signup-btn');
    signup_btn.addEventListener('click', () => signUp(signup_btn)); 

    // on keyboard enter
    const signUp_inputs = (document.getElementById('signUp-container').querySelector('.form-container')).querySelectorAll('input');
    signUp_inputs.forEach( input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                signUp(signup_btn);
        }) 
    });

}