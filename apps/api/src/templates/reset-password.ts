import { APP_SLUG_CAP, WEB_URL } from '@mizzo/utils'

export type ResetPasswordTemplateProps = {
  recipientName: string
  recipientEmail: string
  resetLink: string
}

export const resetPasswordTemplate = ({
  recipientName,
  recipientEmail,
  resetLink
}: ResetPasswordTemplateProps) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <title>Password Reset - ${APP_SLUG_CAP}</title>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Outfit', Helvetica, Arial, sans-serif;
      }
      
      body {
        background-color: #F5EFFF !important;
        margin: 0;
        padding: 20px;
      }
      .email-container {
        max-width: 500px;
        margin: 0 auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(133, 110, 247, 0.15);
      }
      .header {
        background-color: #856EF7;
        padding: 20px;
        text-align: center;
      }
      .logo-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
      }
      .logo {
        height: 40px;
        width: 40px;
      }
      .logo-text {
        color: #FFFFFF;
        font-size: 24px;
        font-weight: 700;
        margin: 0;
      }
      .content {
        background-color: #FFFFFF;
        padding: 30px;
        text-align: center;
      }
      h1 {
        color: #0F0F0F;
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 20px 0;
      }
      h3 {
        color: #0F0F0F;
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 15px 0;
      }
      p {
        color: #0F0F0F;
        font-size: 16px;
        line-height: 1.5;
        margin: 0 0 15px 0;
      }
      .button {
        display: inline-block;
        background-color: #856EF7;
        color: #FFFFFF !important;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 8px;
        margin: 20px 0;
        transition: background-color 0.2s ease;
      }
      .button:hover {
        background-color: #7258F0;
      }
      .footer {
        background-color: #FAFAFF;
        padding: 15px;
        text-align: center;
        border-top: 1px solid #E4E4E7;
      }
      .footer p {
        color: #0F0F0F;
        font-size: 14px;
        margin: 0 0 5px 0;
      }
      .highlight {
        color: #856EF7;
        font-weight: 600;
      }
      a {
        color: #856EF7;
        text-decoration: none;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <a class="logo-wrapper" href="${WEB_URL}" target="_blank">
          <img src="${WEB_URL}/icon.ico" class="logo" alt="${APP_SLUG_CAP} Logo" />
          <h2 class="logo-text">${APP_SLUG_CAP}</h2>
        </a>
      </div>
      
      <div class="content">
        <h1>Password Reset</h1>
        
        <h3>Hello, ${recipientName}</h3>
        
        <p>
          You have requested to reset your ${APP_SLUG_CAP} password for your account
          <span class="highlight">${recipientEmail}</span>.
        </p>
        
        <p>To reset your password, please click the button below:</p>
        
        <a class="button" href="${resetLink}" target="_blank">Reset Password</a>
        
        <p>This link is valid for <span class="highlight">1 hour</span>.</p>
        
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
      
      <div class="footer">
        <p>Thank you for using ${APP_SLUG_CAP}!</p>
        <p>&copy; ${new Date().getFullYear()} Team ${APP_SLUG_CAP}</p>
      </div>
    </div>
  </body>
</html>`
}
