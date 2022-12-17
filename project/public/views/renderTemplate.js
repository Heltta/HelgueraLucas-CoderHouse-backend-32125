// import ejs from "/ejs.js"
// Requiere EJS
function renderTemplate (elementID, templatePath, data = {}){
    fetch(templatePath)
        .then( res => res.text())
        .then( template => {
            let html = ejs.render(template, data);
            let elementDOM = document.getElementById(elementID);
            elementDOM.innerHTML = html;
        })
        .catch((err) => console.log(err));
}

function dataToRenderedTemplate (elementID, templatePath, dataPath, dataKeys){
    fetch(dataPath)
        .then( res => res.text())
        .then( rawJSON => JSON.parse(rawJSON))
        .then( parsedData => {
            renderTemplate(elementID, templatePath, {
            [dataKeys]: parsedData,
            });
        })
        .catch((err) => console.log(err));
}
// export default renderTemplate
