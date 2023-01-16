import logger from "../config/logger.js";
import 
    {
        createTransport,
    }
from 'nodemailer';

/**
 * Mail content template for register.
 * 
 * Builds the content of an email with the data of a new user 
 *     registration, this email in meant for the administration.
 * 
 * @param {Object} RegistrationData All data necessary for the administrator.
 * 
 * @returns {String}
 */
function mailTemplateUserReg(RegistrationData){
    const content = 
        `<h1>New registration<h1/>` +
        `<span> Date: ${new Date()} <span/>`+
        `<section>` +
            `<h2> User data<h2/>` +
            `<div>Email: ${RegistrationData?.email || 'no data'}<div/>` +
            `<div>Full name: ${RegistrationData?.name || 'no data'}` +
            `<div>Age: ${RegistrationData?.age || 'no data'}<div/>` +
            `<div>Phone: ${RegistrationData?.phone || 'no data'}<div/>` +
            `<div>Private password is encrypted at database<div/>`;

    // if (RegistrationData?.photoURL) {content.concat(`<img src="${RegistrationData.photoURL}"/>`)};

    return content
}

/**
 * Sends new user registration to admin.
 * 
 * @see mailTemplateUserReg
 * 
 * @param RegistrationData All data necessary for the administrator.
 * 
 * @returns {Promise<void>}
*/
async function sendNewUserToAdmin(RegistrationData){

    /**
     * Admin email address.
     * 
     * @type {String}
     */
    const ADMIN_MAIL = 'josiah.larkin33@ethereal.email';

    /**
     * Admin email transporter.
     * 
     * @type {winston.Transporter<SMTPTransport.SentMessageInfo>}
     */
    const adminTransport = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: ADMIN_MAIL,
            pass: 'T8MgWxyCYRu1hHhSU2'
        }
    });

    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'New user registration',
        html: mailTemplateUserReg(RegistrationData)
    }

    try{
        const info = await adminTransport.sendMail(mailOptions);
        logger.info(info);
    } catch (error) {
        logger.error(error)
    }
}

export {
    mailTemplateUserReg,
    sendNewUserToAdmin,
}
