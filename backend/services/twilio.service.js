import Twilio from 'twilio';

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = (to, body) => client.messages.create({
  to,
  from: process.env.TWILIO_FROM_NUMBER,
  body,
});
