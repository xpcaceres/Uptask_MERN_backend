import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos;
    //Integracion de modemailer, creando un Trasnsport
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
      });

      //Informacion del email
      const info = await transport.sendMail({
        from: '"Uptask - Desde el Administrador de Cuentas <cuantas@uptask.com"',
        to: email,
        subject: "Uptask Comprueba tu cuenta",
        text: "Comprueba tu cuenta y empieza a administrar tus proyectos",
        html: `<p>Hola ${nombre}, Comprueba tu cuenta con UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla dando clic en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        </p>
        `
      })
};


export const emailOlvidePassword = async (datos) => {
  const {email, nombre, token} = datos;
  //Integracion de modemailer, creando un Trasnsport
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
      },
    });

    //Informacion del email
    const info = await transport.sendMail({
      from: '"Uptask - Desde el Administrador de Cuentas <cuantas@uptask.com"',
      to: email,
      subject: "Uptask Reestablece tu password",
      text: "Reestablece tu password y empieza a administrar tus proyectos",
      html: `<p>Hola ${nombre}, has solicitado reestablecer tu password con UpTask</p>
      <p>Sigue el siguiente enlace para generar un nuevo password:
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
      <p>Si tu no solicitaste este email, puedes ignorar este mensaje</p>
      
      </p>
      `
    })
};