

/**
 * Compares two inputs values for equality.
*
* Searches two input fields (both must exist) of a given id, then compares their values for equality.
*
* @see document.getElementById()
* 
* @param   {String}    fieldA      Id of the first input tag.
* @param   {String}    fieldB      Id of the second input tag.
* 
* @return  {Boolean}   True if value of both fields are equal, false otherwise.
*/
function areFieldsMatched(fieldA,fieldB){
    const valueA = document.getElementById(fieldA).value;
    const valueB = document.getElementById(fieldB).value;
    
    return (valueA === valueB);
}

const signup = document.querySelector("#session_signup");

signup.addEventListener('submit', e =>{
    if(!areFieldsMatched("inputPassword","confirmPassword")){
        e.preventDefault();
        alert('Password confirmation error: passwords are not equal');
    }
    else if(!areFieldsMatched("inputEmail","confirmEmail")){
        e.preventDefault();
        alert('Email confirmation error: emails are not equal');
    }
});
