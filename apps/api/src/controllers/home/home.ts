import { APP_SLUG_CAP, WEB_URL } from '@mizzo/utils'

export const homePage = ({ heading }: { heading: string }) => {
  const html = `
  <!DOCTYPE html>
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
      <link rel="icon" type="image/x-icon" href="/icon.ico" />
      <title>${APP_SLUG_CAP} Connect</title>
      <style type="text/css">
        body {
          margin: 0px;
          padding: 0px;
          height: 100vh;
          display: grid;
          place-items: center;
          font-family: 'Outfit', Helvetica, Arial, sans-serif;
          background-color: #f0f0f0 !important;
          text-align: center;
          color: #111;
          font-size: 18px;
        }
        a,
        h1,
        h3,
        p {
          font-family: 'Outfit', Helvetica, Arial, sans-serif;
          color: #111;
        }
        a {
          text-decoration: none;
        }
        h1 {
          font-size: 28px;
        }
        h3 {
          font-size: 24px;
        }
        .container {
          margin: 20px;
          padding: 20px;
          max-width: 400px;
          text-align: center;
          background-color: #fff;
          border: 1px solid #ff4466;
          border-radius: 10px;
        }
        .logo-wrapper {
          margin: 0 auto;
          height: 50px;
          width: fit-content;
          display: flex;
          gap: 2px;
          justify-items: center;
          align-items: center;
        }
        .logo {
          height: 40px;
          width: 40px;
          margin: auto auto;
          margin-right: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a class="logo-wrapper" href="${WEB_URL}" target="_blank">
          <img src="${WEB_URL}/icon.ico" class="logo" />
          <h3 style="margin: auto auto">${APP_SLUG_CAP}</h3>
        </a>
  
        <h1 style="margin-bottom: 0">${heading}</h1>
        <p style="margin-top: 0">
          Where melodies are meticulously composed and finely tuned, crafting an
          unparalleled experience for the true melophiles.
        </p>
        <br />
        <p style="margin-bottom: 0">We know a fact for sure!</p>
        <p style="margin-top: 0">You are a Software Engineer.</p>
      </div>
    </body>
  </html>
    `

  return html
}
