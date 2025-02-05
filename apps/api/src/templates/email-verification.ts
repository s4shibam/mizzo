import { APP_SLUG_CAP, WEB_URL } from '@mizzo/utils'

export type EmailVerificationTemplateProps = {
  recipientName: string
  recipientEmail: string
  otp: string
}

export const emailVerificationTemplate = ({
  recipientName,
  recipientEmail,
  otp
}: EmailVerificationTemplateProps) => {
  return `
<!doctype html>
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
    <title>Email Verification - ${APP_SLUG_CAP}</title>
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
      .otp-container {
        background-color: #FAFAFF;
        border: 1px solid #AE9FF9;
        border-radius: 8px;
        padding: 15px;
        margin: 20px auto;
        max-width: 200px;
        letter-spacing: 2px;
      }
      .otp {
        color: #856EF7;
        font-size: 28px;
        font-weight: 700;
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
        <h1>Email Verification</h1>
        
        <h3>Hello, ${recipientName}</h3>
        
        <p>
          Please use the verification code below to verify your email address 
          <span class="highlight">${recipientEmail}</span> for your ${APP_SLUG_CAP} account.
        </p>
        
        <div class="otp-container">
          <span class="otp">${otp}</span>
        </div>
        
        <p>This verification code will expire in <span class="highlight">10 minutes</span>.</p>
        
        <p>If you didn't request this code, you can safely ignore this email.</p>
      </div>
      
      <div class="footer">
        <p>Thank you for using ${APP_SLUG_CAP}!</p>
        <p>&copy; ${new Date().getFullYear()} Team ${APP_SLUG_CAP}</p>
      </div>
    </div>
  </body>
</html>
`
}
