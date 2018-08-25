"use strict"

const nodemailer = require('nodemailer');

function SendMail(req, res) {
     var params=req.body;
     var nombre=params.nombre;
     var correo=params.email;
     var asunto=params.tema;
     var mensaje=params.mensaje;
    // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //host: 'smtp.ethereal.email',
       // port: 587,
       service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: "wilverhidalgobarja@gmail.com", // generated ethereal user
            pass: "yowilverelmejor" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Negocios Inteligentes" <wilverhidalgobarja@gmail.com>', // sender address
        to: 'wilverhidalgo@outlook.com', // list of receivers
        subject: asunto, // Subject line
        text: mensaje, // plain text body
        html: '<h1 align="center">'+ nombre +' '+ correo+'</h1> <p>'+mensaje+'</p>' // html body
    };
    let mailOptions2 = {
        from: '"Negocios Inteligentes" <wilverhidalgobarja@gmail.com>', // sender address
        to: correo, // list of receivers
        subject: 'Respuesta', // Subject line
        text: 'Gracias por enviarnos su opinion, revisaremos su sugerencia y nos contactaremos con usted', // plain text body
        html: '<h1 algin="center">Negocios Inteligente</h1> <p>Gracias por enviarnos su opinion, revisaremos su sugerencia y nos contactaremos con usted</p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            console.log(error);
         //   res.status(500).send("error no pudimos enviar un correo de respuesta a "+ correo);

        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


     //   res.status(200).send("Gracias por enviarnos sus opiniones");
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {

            console.log(error);
            res.status(500).send({mensaje:"error no pudimos enviar un correo de respuesta a "+ correo});

        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


        res.status(200).send({mensaje:"Gracias por enviarnos sus opiniones"});
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

}
module.exports = { SendMail}