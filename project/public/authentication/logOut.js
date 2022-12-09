
//// Log out event ////
let logOut = document.querySelector("#log_out");
logOut.addEventListener("click", e =>{
    e.preventDefault();
    fetch(`http://localhost:8080/auth/logout`,{
        method: 'GET',
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
