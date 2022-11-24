
//// Log in event ////
let login = document.querySelector("#session_login");
login.addEventListener("submit", e =>{
    e.preventDefault();
    const userEmail = e.target.querySelector("#userEmail").value;
    const userPassword = e.target.querySelector("#userPassword").value;
    fetch(`/session/login?username=${userEmail}&password=${userPassword}`,{
        method: 'POST',
        redirect: 'follow',
    })
    .then( res =>{
        if(res.redirected){
            window.location.href = res.url;
        }
    })
    .catch(function(err) {
        console.log(err);
    });
})