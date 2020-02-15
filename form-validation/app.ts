import './style';

// ui elements
const form = document.getElementById('form') as HTMLFormElement;
const userName = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const password2 = document.getElementById('password2') as HTMLInputElement;

// check required
function checkRequired(inputArr: HTMLInputElement[]) {
    inputArr.forEach((input) => {
        input.value
            ? setSuccess(input)
            : setError(input, `${getInputName(input)} is required`);
    });
}

// check email
function checkEmail(input: HTMLInputElement) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(email.value).toLowerCase())) {
        setSuccess(input);
    } else {
        setError(input, 'Email is not valid');
    }
}

// check length
function checkLength(input: HTMLInputElement, min: number, max?: number) {
    if (input.value.length < min) {
        setError(
            input,
            `${getInputName(input)} must be at least ${min} characters`,
        );
    } else if (input.value.length > max) {
        setError(
            input,
            `${getInputName(input)} must be less then ${max} characters`,
        );
    } else {
        setSuccess(input);
    }
}

function checkPasswordsMatch(
    input1: HTMLInputElement,
    input2: HTMLInputElement,
) {
    if (input1.value === input2.value) {
        setSuccess(input1);
        setSuccess(input2);
    } else {
        setError(input2, 'Passwords do not match');
    }
}

// get input name
function getInputName(input: HTMLInputElement) {
    return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;
}

// set error message
function setError(input: HTMLElement, message: string) {
    // set classname on parent el
    const formControl = input.parentElement;
    formControl.className = 'form-control form-control--error';

    // set error message
    const error = formControl.querySelector('small');
    error.innerText = message;
}

// set success
function setSuccess(input: HTMLElement) {
    const formControl = input.parentElement;
    formControl.className = 'form-control form-control--success';
}

// event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([userName, email, password, password2]);
    checkEmail(email);
    checkLength(userName, 3, 25);
    checkLength(password, 6);
    checkPasswordsMatch(password, password2);
});
