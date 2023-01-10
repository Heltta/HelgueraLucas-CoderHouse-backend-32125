
const passwordOriginal = document.querySelector("#inputPassword");
const passwordConfirm = document.querySelector("#confirmPassword");

const signup = document.querySelector("#session_signup");

signup.addEventListener('submit', e =>{
    if(passwordOriginal.value !== passwordConfirm.value){
        e.preventDefault();
        alert('Password confirmation error: passwords are not equal');
    }
});
