// Email Templates for KAYA

// ============================================
// PASSWORD RESET EMAIL TEMPLATE
// ============================================

const PASSWORD_RESET_TEMPLATE = {
  subject: 'Reset Your KAYA Password',
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background-color: #141414; }
    .header { background-color: #ffeb3b; padding: 30px; text-align: center; }
    .header h1 { margin: 0; color: #000; font-size: 28px; font-weight: 900; }
    .content { padding: 40px 30px; color: #fff; }
    .content h2 { margin-top: 0; color: #ffeb3b; }
    .content p { line-height: 1.8; color: #a0a0a0; }
    .button { display: inline-block; background-color: #ffeb3b; color: #000; padding: 15px 40px;
               text-decoration: none; border-radius: 5px; font-weight: 800; margin: 20px 0; }
    .footer { padding: 30px; text-align: center; color: #666; font-size: 12px;
              border-top: 1px solid #2a2a2a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>KAYA</h1>
    </div>
    <div class="content">
      <h2>Reset Your Password</h2>
      <p>Hi there,</p>
      <p>We received a request to reset your password for your KAYA account.</p>
      <p>Click the button below to create a new password:</p>
      <a href="{{RESET_LINK}}" class="button">RESET PASSWORD</a>
      <p>This link will expire in 1 hour. If you didn't make this request, please ignore this email.</p>
      <p>Stay KAYA!<br>The KAYA Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2026 KAYA. All rights reserved.</p>
      <p>100% Made in India Streetwear</p>
    </div>
  </div>
</body>
</html>
  `,
  text: `
Reset Your KAYA Password

Hi there,

We received a request to reset your password for your KAYA account.

Click the link below to create a new password:
{{RESET_LINK}}

This link will expire in 1 hour. If you didn't make this request, please ignore this email.

Stay KAYA!
The KAYA Team

---
© 2026 KAYA. All rights reserved.
100% Made in India Streetwear
  `
};

// ============================================
// ORDER CONFIRMATION EMAIL TEMPLATE
// ============================================

const ORDER_CONFIRMATION_TEMPLATE = {
  subject: 'Order Confirmed! #{{ORDER_ID}} - KAYA',
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Confirmation</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background-color: #141414; }
    .header { background-color: #ffeb3b; padding: 30px; text-align: center; }
    .header h1 { margin: 0; color: #000; font-size: 28px; font-weight: 900; }
    .content { padding: 40px 30px; color: #fff; }
    .content h2 { margin-top: 0; color: #ffeb3b; }
    .content p { line-height: 1.8; color: #a0a0a0; }
    .order-summary { background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .order-summary h3 { color: #ffeb3b; margin-top: 0; }
    .order-item { display: flex; justify-content: space-between; padding: 10px 0;
                  border-bottom: 1px solid #2a2a2a; }
    .order-item:last-child { border-bottom: none; font-weight: 800; color: #ffeb3b; }
    .status-badge { display: inline-block; background-color: #00e676; color: #000;
                    padding: 8px 20px; border-radius: 20px; font-weight: 800; }
    .footer { padding: 30px; text-align: center; color: #666; font-size: 12px;
              border-top: 1px solid #2a2a2a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>KAYA</h1>
    </div>
    <div class="content">
      <h2>Order Confirmed!</h2>
      <p>Thanks for shopping with us, {{USER_NAME}}!</p>
      <p>Your order <strong>#{{ORDER_ID}}</strong> has been received and is being processed.</p>

      <div class="order-summary">
        <h3>Order Summary</h3>
        {{ORDER_ITEMS}}
        <div class="order-item">
          <span>Total</span>
          <span>₹{{ORDER_TOTAL}}</span>
        </div>
      </div>

      <p>Current Status: <span class="status-badge">{{ORDER_STATUS}}</span></p>
      <p>Your order will be shipped within 48 hours from the time the order is placed.</p>
      <p>Stay KAYA!<br>The KAYA Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2026 KAYA. All rights reserved.</p>
      <p>100% Made in India Streetwear</p>
    </div>
  </div>
</body>
</html>
  `,
  text: `
Order Confirmation - KAYA

Hi {{USER_NAME}},

Your order #{{ORDER_ID}} has been confirmed!

Order Summary:
{{ORDER_ITEMS}}
Total: ₹{{ORDER_TOTAL}}

Status: {{ORDER_STATUS}}

Your order will be shipped within 48 hours.

Stay KAYA!
The KAYA Team

---
© 2026 KAYA. All rights reserved.
100% Made in India Streetwear
  `
};

// ============================================
// EMAIL HELPER FUNCTIONS
// ============================================

function generatePasswordResetEmail(email, resetLink) {
  const template = { ...PASSWORD_RESET_TEMPLATE };
  template.html = template.html.replace(/{{RESET_LINK}}/g, resetLink);
  template.text = template.text.replace(/{{RESET_LINK}}/g, resetLink);
  return template;
}

function generateOrderConfirmationEmail(order, userName) {
  const template = { ...ORDER_CONFIRMATION_TEMPLATE };

  // Replace placeholders
  template.html = template.html
    .replace(/{{USER_NAME}}/g, userName || 'Customer')
    .replace(/{{ORDER_ID}}/g, order.id.slice(-8).toUpperCase())
    .replace(/{{ORDER_TOTAL}}/g, order.total?.toLocaleString() || '0')
    .replace(/{{ORDER_STATUS}}/g, order.status?.toUpperCase() || 'PENDING');

  template.text = template.text
    .replace(/{{USER_NAME}}/g, userName || 'Customer')
    .replace(/{{ORDER_ID}}/g, order.id.slice(-8).toUpperCase())
    .replace(/{{ORDER_TOTAL}}/g, order.total?.toLocaleString() || '0')
    .replace(/{{ORDER_STATUS}}/g, order.status?.toUpperCase() || 'PENDING');

  // Generate order items HTML
  const itemsHTML = (order.items || []).map(item => `
    <div class="order-item">
      <span>${item.name} x${item.qty}</span>
      <span>₹${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join('');

  template.html = template.html.replace(/{{ORDER_ITEMS}}/g, itemsHTML);
  template.text = template.text.replace(/{{ORDER_ITEMS}}/g,
    (order.items || []).map(item =>
      `${item.name} x${item.qty} - ₹${(item.price * item.qty).toLocaleString()}`
    ).join('\n')
  );

  return template;
}

// Export templates
window.emailTemplates = {
  passwordReset: generatePasswordResetEmail,
  orderConfirmation: generateOrderConfirmationEmail,
  PASSWORD_RESET_TEMPLATE,
  ORDER_CONFIRMATION_TEMPLATE
};
