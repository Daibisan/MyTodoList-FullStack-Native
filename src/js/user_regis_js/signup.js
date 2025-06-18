import { hideAllInlineError, showFeedbackPopup, showInlineError, switchForm } from "./ui.js";

export async function signUp(elm) {

    // Get all input from submited form
    const formElm = (elm.parentElement.parentElement).querySelector('.form-container');
    const inputsArr = formElm.querySelectorAll('input');

    // Get inputs data value
    const usernameValue = inputsArr[0].value.trim();
    const emailValue = inputsArr[1].value.trim();
    const passwordValue = inputsArr[2].value.trim();

    // Form Validation
    if (inputsAreEmpty(usernameValue, emailValue, passwordValue, inputsArr)) { // Exit if inputs are empty
        return;

    } else if (emailFormatIsWrong(emailValue, inputsArr)) { // Exit if email format is wrong
        return;

    } else if (await emailIsDuplicate(emailValue, inputsArr)) { // Exit if email already taken
        return;
    }

    // Create Account
    createAccount(usernameValue, emailValue, passwordValue);

}

async function createAccount(usernameValue, emailValue, passwordValue) {

    const inputValues = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
    };

    try {

        const response = await fetch('/myTodoList_PHP_MySql/server/route/user_regis_routes/sign_up.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        });
        
        const result = await response.json();

        showFeedbackPopup(result.message);
        switchForm();

    } catch (error) {
        console.error(error);
        alert('Failed : Signup failed!');
    }
    
}

// Form Validation Functions
function inputsAreEmpty(username, email, password, inputsArr) {

    // Get InlineError Elements
    const usernameInlineError = (inputsArr[0].parentElement).querySelector('.inline-err-msg');
    const emailInlineError = (inputsArr[1].parentElement).querySelector('.inline-err-msg');
    const passwordInlineError = (inputsArr[2].parentElement.parentElement).querySelector('.inline-err-msg');

    const usernameInputBox = (usernameInlineError.parentElement).querySelector('input');
    const emailInputBox = (emailInlineError.parentElement).querySelector('input');
    const passwordInputBox = (passwordInlineError.parentElement).querySelector('input');


    const usernameIsEmpty = username === '';
    const emailIsEmpty = email === '';
    const passwordIsEmpty = password === '';

    // Check if there is no empty value
    if (!usernameIsEmpty && !emailIsEmpty && !passwordIsEmpty) {
        hideAllInlineError(usernameInlineError, emailInlineError, passwordInlineError,
            usernameInputBox, emailInputBox, passwordInputBox);
        return false;
    }

    // Hide error on switch form
    const bottom_container = document.querySelectorAll('.bottom-container');
    bottom_container.forEach(elm => elm.querySelector('a').addEventListener('click', switchForm));

    if (usernameIsEmpty) {

        const errorMsg = `Name can't be empty!`;
        showInlineError(usernameInlineError, usernameInputBox, errorMsg);

    }

    if (emailIsEmpty) {

        const errorMsg = `Email can't be empty!`;
        showInlineError(emailInlineError, emailInputBox, errorMsg);

    }

    if (passwordIsEmpty) {

        const errorMsg = `Password can't be empty!`;
        showInlineError(passwordInlineError, passwordInputBox, errorMsg);

    }

    return true;
}

function emailFormatIsWrong(email, inputsArr) {
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/)) {

        const emailInlineError = (inputsArr[1].parentElement).querySelector('.inline-err-msg');
        const emailInputBox = (emailInlineError.parentElement).querySelector('input');
        const errorMsg = 'Email format is wrong';

        showInlineError(emailInlineError, emailInputBox, errorMsg);
        return true;
    }
    return false;
}

async function emailIsDuplicate(email, inputsArr) {

    const emailInlineError = (inputsArr[1].parentElement).querySelector('.inline-err-msg');
    const emailInputBox = (emailInlineError.parentElement).querySelector('input');
    const errorMsg = 'Email is already taken';

    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/user_regis_routes/duplicateEmail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });        

        const result = await response.json();

        if (result.message === 'Email is duplicate') {

            showInlineError(emailInlineError, emailInputBox, errorMsg);
            return true;

        }
        hideAllInlineError();
        return false;

    } catch (error) {
        console.error(error);
        alert('Failed : Checking Email Failed!');
    }

}