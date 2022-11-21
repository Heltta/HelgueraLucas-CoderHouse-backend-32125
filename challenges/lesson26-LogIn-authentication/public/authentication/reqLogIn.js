
//// Log in event ////
let login = document.querySelector("#session_login");
login.addEventListener("submit", e =>{
    e.preventDefault();
    const userName = e.target.querySelector("#userName").value;
    fetch(`/session/login?username=${userName}&password=pepepass`,{
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