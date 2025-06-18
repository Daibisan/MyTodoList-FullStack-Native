
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

    inlineError.innerText = errorMsg;
    inlineError.classList.remove('hide');
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

export function hideAllInlineError(usernameInlineError = null, emailInlineError = null, passwordInlineError = null, usernameInputBox = null, emailInputBox = null, passwordInputBox = null) {

    const elementsAreNull = usernameInlineError == null && emailInlineError == null && passwordInlineError == null && usernameInputBox == null && emailInputBox == null && passwordInputBox == null;

    if (!elementsAreNull) { // Hide all error from specified form

        // Hide inline error
        usernameInlineError.classList.add('hide');
        emailInlineError.classList.add('hide');
        passwordInlineError.classList.add('hide');

        // Remove input box error
        usernameInputBox.classList.remove('error');
        emailInputBox.classList.remove('error');
        passwordInputBox.classList.remove('error');

    } else { // Hide all error from all form

        const usernameInput = document.querySelector('input[name=username]');
        const emailInputs = document.querySelectorAll('input[name=email]');
        const passwordInputs = document.querySelectorAll('input[name=pw]');

        const inline_err_msgs = document.querySelectorAll('.inline-err-msg');

        // Remove input box error
        if (usernameInput.classList.contains('error'))
            usernameInput.classList.remove('error');

        emailInputs.forEach(input => {
            if (input.classList.contains('error'))
                input.classList.remove('error');
        });

        passwordInputs.forEach(input => {
            if (input.classList.contains('error'))
                input.classList.remove('error');
        });

        // Hide inline error
        inline_err_msgs.forEach(msg => {
            if (!msg.classList.contains('hide'))
                msg.classList.add('hide')
        });

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