import { hideAllInlineError, showInlineError } from "./ui.js";

export function inputsAreEmpty(inputsArr) {

    let hasEmpty = false;

    // Array berisi inlineErrorElm, inputElm, dan inputValue per input di inputsArr. Juga empty message
    const errorFields = errorFieldsMaker(inputsArr); 
    
    // Hilangkan error lama
    hideAllInlineError(errorFields);

    // Show inline error for each input
    errorFields.forEach(({ value, inputEl, inlineErrEl, emptyMsg }) => {

        const safeValue = value ?? ""; // value = "" if value is null or undefined
        const isEmpty = safeValue.trim() === "";

        // Show inline error if value is empty
        if (isEmpty) {
            showInlineError(inlineErrEl, inputEl, emptyMsg);
            hasEmpty = true;
        }

    });
    return hasEmpty;

}

function errorFieldsMaker(inputsArr) {

    const errorFields = [];

    // Loop sebanyak input di inputsArr
    for (let i = 0; i < inputsArr.length; i++) {

        // Get inlineErrorElm, inputElm, inputValue
        let inlineErrorElm = null;
        if (i === inputsArr.length - 1) { // if input == password
            inlineErrorElm = (inputsArr[i].parentElement.parentElement).querySelector('.inline-err-msg');

        } else {
            inlineErrorElm = (inputsArr[i].parentElement).querySelector('.inline-err-msg');
        }

        let inputElm = (inlineErrorElm.parentElement).querySelector('input');
        let inputValue = inputsArr[i].value.trim();
        let emptyMsg = '';
        
        // Set empty message based on input name/type
        const inputName = inputsArr[i].name;
        switch (inputName) {
            case 'username':
                emptyMsg = `Name can't be empty`;
                break;
            case 'email':
                emptyMsg = `Email can't be empty`;
                break;
            case 'pw':
                emptyMsg = `Password can't be empty`;
                break;
            default:
                break;
        }

        // Push inlineErrorElm, inputElm, inputValue, and empt message to errorFields
        errorFields.push(
            {
                inlineErrEl: inlineErrorElm,
                inputEl: inputElm,
                value: inputValue,
                emptyMsg
            }
        )
    }
    return errorFields;

}

export function emailFormatIsWrong(email, inputsArr) {
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/)) {

        const formContainer = inputsArr[0].closest('form');

        const emailInputBox = formContainer.querySelector('input[name=email]');
        const emailInlineError = emailInputBox.nextElementSibling;        
        const errorMsg = 'Email format is wrong';

        showInlineError(emailInlineError, emailInputBox, errorMsg);
        return true;
    }
    return false;
}