
//// Log out event ////
let logOut = document.querySelector("#log_out");
logOut.addEventListener("click", e =>{
    e.preventDefault();
    fetch(`http://localhost:8080/session/logout`,{
        method: 'GET',
        redirect: 'follow',
    })
    .then( res =>{
        window.location.href = res.url;
    })
    .catch(function(err) {
        console.log(err);
    });
})