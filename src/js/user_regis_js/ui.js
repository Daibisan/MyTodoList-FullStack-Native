
export function togglePasswordEye(elm) {

    const parentElm = elm.closest('.password-input-container');
    const passwordInput = parentElm.querySelector('input');
    const icon = parentElm.querySelector('i');

    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    console.log(parentElm);


    icon.classList.toggle('fa-eye', isPassword);
    icon.classList.toggle('fa-eye-slash', !isPassword);

}

export function switchForm() {

    // Clear all inline error and input values
    hideAllInlineError();
    clearAllInputValue();

    const signUp_container = document.getElementById('signUp-container');
    const login_container = document.getElementById('login-container');

    if (signUp_container.classList.contains('hide')) { // Show sign up form

        signUp_container.classList.remove('hide');
        login_container.classList.add('hide');

        // Cursor Auto Placement
        autoCursotPlacement('Signup Form');

    } else if (login_container.classList.contains('hide')) { // Show login form

        signUp_container.classList.add('hide');
        login_container.classList.remove('hide');

        // Cursor Auto Placement
        autoCursotPlacement('Login Form');

    }

}

export function autoCursotPlacement(whichForm) {

    if (whichForm === 'Signup Form') { // Signup form selected

        let nameInputElm = document.querySelector(`#signUp-container input[name="username"]`);
        nameInputElm.focus();

    } else { // Login form selected
        let nameInputElm = document.querySelector(`#login-container input[name="email"]`);
        nameInputElm.focus();
    }

}

export function showInlineError(inlineError, inputBox, errorMsg) {

    if (inlineError !== null) {

        inlineError.innerText = errorMsg;
        inlineError.classList.remove('hide');

    }

    if (inputBox !== null)
        inputBox.classList.add('error');

}

export function showFeedbackPopup(msg) {

    const feedback_message_popup = document.getElementById('feedback-message-popup');

    // Set Feedback Message
    const text_container = feedback_message_popup.querySelector('p');
    text_container.innerText = msg;

    // Show
    if (feedback_message_popup.classList.contains('hide')) {
        feedback_message_popup.classList.remove('hide');
        feedback_message_popup.classList.add('show');
    }

    // Hide after 3 seconds
    setTimeout(() => {
        if (feedback_message_popup.classList.contains('show')) {
            feedback_message_popup.classList.remove('show');
            feedback_message_popup.classList.add('hide');
        }
    }, 3000);

}

export function hideAllInlineError(fields) {

    const hide = ({ inlineErrEl, inputEl }) => {
        inlineErrEl?.classList.add("hide");
        inputEl?.classList.remove("error");
    };

    if (Array.isArray(fields) && fields.length) { // Hide specific input error
        fields.forEach(hide);

    } else { // Hide semua error
        document.querySelectorAll(".inline-err-msg").forEach((el) => el.classList.add("hide"));
        document.querySelectorAll("input.error").forEach((el) => el.classList.remove("error"));
    }

}

export function clearAllInputValue() {

    const usernameInput = document.querySelector('input[name=username]');
    const emailInputs = document.querySelectorAll('input[name=email]');
    const passwordInputs = document.querySelectorAll('input[name=pw]');

    // Clear username
    if (usernameInput.value !== '')
        usernameInput.value = '';

    // Clear emails
    emailInputs.forEach(input => {
        if (input.value !== '')
            input.value = '';
    });

    // Clear passwords
    passwordInputs.forEach(input => {
        if (input.value !== '')
            input.value = '';
    });

}