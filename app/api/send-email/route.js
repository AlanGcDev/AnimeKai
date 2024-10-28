import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Usamos TLS con puerto 587
    auth: {
      user: "animekai.web@gmail.com", // Tu correo
      pass: process.env.GMAIL_PASSWORD, // Contraseña de aplicación
    },
    tls: {
      rejectUnauthorized: false, // Evita errores de certificados
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`, // Correo de quien envía
    to: "soporte.animekai@gmail.com", // Correo destinatario
    subject: `${subject} - Mensaje de ${name}`,
    html: `
      <h1>Nuevo Mensaje de Soporte</h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Nombre</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Correo Electrónico</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Asunto</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${subject}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Descripción</th>
          <td style="border: 1px solid #ddd; padding: 8px;">${message}</td>
        </tr>
      </table>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info.messageId);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
