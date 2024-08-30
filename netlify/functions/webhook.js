const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body);
    const message = body.message || 'No message';

    const msg = {
      to: 'michael.cuebasw@gmail.com',  // Replace with recipient's email address
      from: 'michael.cuebas@gmail.com',  // Replace with sender's email address
      subject: 'Alert Notification',
      text: `New alert received: ${message}`,
      html: `<strong>New alert received:</strong> ${message}`,
    };

    try {
      await sgMail.send(msg);
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 'email sent' }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ status: 'error', message: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ status: 'method not allowed' }),
    };
  }
};

