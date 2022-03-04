import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import template from './template';

export const Greeter = (name: string) => `Hello ${name}`; 

export default async (
  host: string,
  pass: string,
  from: string,
  to: string,
  subject: string,
  text: string,
) => {
  let transporter: Transporter<SentMessageInfo>;

  transporter = nodemailer.createTransport({
    host, port: 465, secure: true, auth: { user: from, pass },
  });

  const msg: Options = {
    from,
    to,
    subject,
    text,
    html: template(subject, text),
  };

  await transporter.sendMail(msg);
};
