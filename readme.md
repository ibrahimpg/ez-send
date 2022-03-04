# ez-send

```
npm install ez-send
```

Send emails in Node with a single function.

A simple-to-use abstraction that sits on top of Nodemailer for simple use cases and quick prototyping.

Only works with username/password authentication and TLS-secured mail servers (PORT 465).

Emails are automatically formatted in a simple HTML template.

<br>

## Basic Example

#### **`.env`**
```
HOST="smtp.example.com"
USER="user@example.com"
PASS="my_password_123"
```

#### **`index.js`**
``` js
import ezSend from 'ez-send';

const sendEmail = async (recipient, subject, body) => {
  const host = process.env.HOST;
  const user = process.env.USER;
  const pass = process.env.PASS;
  await ezSend(host, user, pass, recipient, subject, body);
};

const body = 'Thank you for signing up to our mailing list. You will now receive promotional emails and newsletters related to our product.'

sendEmail('someone@example.com', 'Welcome!', body);
```

<br>

## Modular Example with Express

#### **`.env`**
```
HOST="smtp.example.com"
USER="user@example.com"
PASS="my_password_123"
```

#### **`services/email.js`**
``` js
import ezSend from 'ez-send';

const host = process.env.HOST;
const user = process.env.USER;
const pass = process.env.PASS;

export default async (recipient, subject, body) => {
  await ezSend(host, user, pass, recipient, subject, body);
};
```

#### **`index.js`**
``` js
import express from 'express';
import { randomBytes } from 'crypto';
import sendEmail from './services/email';

const app = express();

app.post('/register-user', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // handle other non-email logic
    const body = 'Thank you for signing up to our service! Click on the link below to confirm your email address:';
    const verificationCode = randomBytes(4).toString('hex');
    const verificationLink = `${process.env.API_URL}/confirm-email/${}/${verificationCode}`;
    await sendEmail(email, 'Thank you for signing up', body, verificationLink)
  } catch (err) {
    // handle error
  }
});
```