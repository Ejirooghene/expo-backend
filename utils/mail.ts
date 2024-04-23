// import nodemailer from "nodemailer";


// export const mail = async (email: string) => {
//     const transporter = await nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER!,
//           pass: process.env.EMAIL_PASS!,
//         },
//       });
    
    
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Password Reset Request',
//         text: `Click on the following link to reset your password: ${""}`,
//       };

//       await transporter.sendMail(mailOptions);
// }