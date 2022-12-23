
const routeProtector = {}
routeProtector.onlyAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) next();
    else res.redirect("/auth/login");
};

export default routeProtector;
