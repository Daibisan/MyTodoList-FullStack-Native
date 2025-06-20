import { emailFormatIsWrong, inputsAreEmpty } from "./formValidation.js";
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
    if (inputsAreEmpty(inputsArr)) { // Exit if inputs are empty
        return;

    } else if (emailFormatIsWrong(emailValue, inputsArr)) { // Exit if email format is wrong
        return;

    } else if (await emailIsDuplicate(emailValue, inputsArr)) { // Exit if email already taken
        return;
    }

    // Create Account
    const createAccountResult = await createAccount(usernameValue, emailValue, passwordValue);
    if (createAccountResult.message === 'Signup Success!') {
        switchForm();
    }
    showFeedbackPopup(createAccountResult.message);

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

        // Error Message
        if (result.status === 'server error')
            console.error('Server error: '+result.body);
        
        return result;
        
    } catch (error) {
        console.error(error);
        alert('Failed : Signup failed!');
    }
    
}

async function emailIsDuplicate(email, inputsArr) {

    const formContainer = inputsArr[0].closest('form');
    const emailInputBox = formContainer.querySelector('input[name=email]');
    const emailInlineError = emailInputBox.nextElementSibling;  
    const errorMsg = 'Email is already taken';

    try {
        const response = await fetch('/myTodoList_PHP_MySql/server/route/user_regis_routes/checkEmailExistence.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });        

        const result = await response.json();

        if (result.message === 'Email is exist') {

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