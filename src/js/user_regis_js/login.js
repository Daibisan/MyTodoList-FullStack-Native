import { inputsAreEmpty, emailFormatIsWrong } from "./formValidation.js";
import { hideAllInlineError, showFeedbackPopup, showInlineError } from "./ui.js";

export async function login(elm) {

    // Get all input from submited form
    const formElm = (elm.parentElement.parentElement).querySelector('.form-container');
    const inputsArr = formElm.querySelectorAll('input');

    // Get inputs data value
    const emailValue = inputsArr[0].value.trim();
    const passwordValue = inputsArr[1].value.trim();

    // Form Validation
    if (inputsAreEmpty(inputsArr)) { // Exit if inputs are empty
        return;

    } else if (emailFormatIsWrong(emailValue, inputsArr)) { // Exit if email format is wrong
        return;

    } else if (await emailIsNotExist(emailValue, inputsArr)) { // Exit if email is not found
        return;
    }

    // login account
    const loginResult = await loginAccount(emailValue, passwordValue);
    if (loginResult.message === 'Login Success!') { // If login success
        showFeedbackPopup(loginResult.message);

        // Go to todoApp
        window.location.href = '/myTodoList_PHP_MySql/Public/index.html';

    } else {
        showLoginInlineError(inputsArr);
    }

}

async function loginAccount(emailValue, passwordValue) {

    const inputValues = {
        email: emailValue,
        password: passwordValue,
    };

    try {

        const response = await fetch('/myTodoList_PHP_MySql/server/route/user_regis_routes/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        });

        const result = await response.json();

        // Error Message
        if (result.status === 'server error')
            console.error('Server error: '+result.body);
        
        return result;

    } catch (error) {
        console.error(error);
        alert('Failed : Login failed!');
    }

}

async function emailIsNotExist(email, inputsArr) {

    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/user_regis_routes/checkEmailExistence.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const result = await response.json();

        // Error Message
        if (result.status === 'server error')
            console.error('Server error: '+result.body);

        if (result.message === 'Email is not found') {

            showLoginInlineError(inputsArr);
            return true;

        }
        hideAllInlineError();
        return false;

    } catch (error) {
        console.error(error);
        alert('Failed : Checking Email Failed!');
    }

}

function showLoginInlineError(inputsArr) {

    const formContainer = inputsArr[0].closest('form');

    const emailInputBox = formContainer.querySelector('input[name=email]');
    const passwordInputBox = formContainer.querySelector('input[name=pw]');

    const passwordInlineError = passwordInputBox.closest('li').querySelector('.inline-err-msg');
    const errorMsg = 'Email or Password is incorrect';

    showInlineError(null, emailInputBox, null);
    showInlineError(passwordInlineError, passwordInputBox, errorMsg);

}