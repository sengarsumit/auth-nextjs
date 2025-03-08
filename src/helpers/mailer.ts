import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendMail=async({email,emailType,userId}:any)=>{
    try {

        const hashedToken=await bcryptjs.hash(userId.toString(),10)
        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000},{new:true,runValidators:true});
        }else if(emailType==='RESET '){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000},{new:true,runValidators:true});
        }
       const transporter= nodemailer.createTransport({
        // Looking to send emails in production? Check out our Email API/SMTP product!
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "96be6157e7bd52",
        pass: "73ab29edcb79da"
        }
       });

       const mailOptions={
        from:'sengarsumit45@gmail.com',
        to:email,
        subject:emailType==='VERIFY'?'Verify your email':'Reset your password',
        html:`<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your password"} </p>`
       }
       const mailResponse=await transport.sendMail(mailOptions);
       return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}