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
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - ${APP_SLUG_CAP}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        
        body, #bodyTable { 
            margin: 0;
            padding: 0;
            width: 100% !important;
            height: 100% !important;
            background-color: #FFFFFF;
        }
        
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        table {
            border-collapse: collapse !important;
        }
        
        .ReadMsgBody {
            width: 100%;
        }
        
        .ExternalClass {
            width: 100%;
        }
        
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: 'Outfit', Arial, sans-serif;
        }
        
        .container {
            max-width: 500px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(133, 110, 247, 0.15);
        }
        
        .header {
            background-color: #856EF7;
            padding: 20px;
        }
        
        .logo {
            height: 40px;
            width: 40px;
        }
        
        .logo-text {
            color: #FFFFFF;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin: 0;
            text-decoration: none;
        }
        
        .content {
            background-color: #FAFAFF;
            padding: 30px;
        }
        
        .main-title {
            color: #0F0F0F;
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 20px 0 !important;
        }
        
        .greeting {
            color: #0F0F0F;
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 15px 0 !important;
        }
        
        .text {
            color: #0F0F0F;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 15px 0 !important;
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
            -webkit-text-size-adjust: none;
        }
        
        .button:hover {
            background-color: #7258F0;
        }
        
        .footer {
            background-color: #AE9FF9;
            padding: 15px;
            border-top: 1px solid #E4E4E7;
        }
        
        .footer-text {
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
        
        @media screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                border-radius: 0 !important;
            }
            .content {
                padding: 20px !important;
            }
            .header {
                padding: 15px !important;
            }
            .button {
                width: 100% !important;
                display: block !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" id="bodyTable">
        <tr>
            <td align="center" valign="top" style="padding: 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" class="container">
                    <!-- Header -->
                    <tr>
                        <td class="header" align="center">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="${WEB_URL}" target="_blank" style="text-decoration: none;">
                                            <table role="presentation" cellpadding="0" cellspacing="0" style="display: inline-table;">
                                                <tr>
                                                    <td align="center" valign="middle" style="padding-right: 6px;">
                                                        <img src="${WEB_URL}/icon.ico" class="logo" alt="" />
                                                    </td>
                                                    <td align="center" valign="middle">
                                                        <span class="logo-text">${APP_SLUG_CAP}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="content" align="center">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <h3 class="greeting">Hello, ${recipientName}</h3>
                                        
                                        <p class="text">
                                            You have requested to reset your ${APP_SLUG_CAP} password for your account
                                            <span class="highlight">${recipientEmail}</span>.
                                        </p>
                                        
                                        <p class="text">To reset your password, please click the button below:</p>
                                        
                                        <table role="presentation" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <a class="button" href="${resetLink}" target="_blank">Reset Password</a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p class="text">This link is valid for <span class="highlight">1 hour</span>.</p>
                                        
                                        <p class="text">If you did not request a password reset, please ignore this email.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer" align="center">
                            <p class="footer-text">Thank you for using ${APP_SLUG_CAP}!</p>
                            <p class="footer-text">&copy; ${new Date().getFullYear()} Team ${APP_SLUG_CAP}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}
