// import ejs from "/ejs.js"
// eslint-disable-next-line no-undef
const { render } = ejs;
// Requiere EJS
function renderTemplate(elementID, templatePath, data = {}) {
    fetch(templatePath)
        .then((res) => res.text())
        .then((template) => {
            // eslint-disable-next-line no-undef
            let html = render(template, data);
            // eslint-disable-next-line no-undef
            let elementDOM = document.getElementById(elementID);
            elementDOM.innerHTML = html;
        })
        .catch((err) => console.log(err));
}

// eslint-disable-next-line no-unused-vars
function dataToRenderedTemplate(elementID, templatePath, dataPath, dataKeys) {
    fetch(dataPath)
        .then((res) => res.text())
        .then((rawJSON) => JSON.parse(rawJSON))
        .then((parsedData) => {
            console.log({
                [dataKeys]: parsedData,
            });
            renderTemplate(elementID, templatePath, {
                [dataKeys]: parsedData,
            });
        })
        .catch((err) => console.log(err));
}
// export default renderTemplate
