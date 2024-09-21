const emailFormat = (name: string, email: string, code: string) => {
  return `
  <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verify your email</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #0f172a; margin: 0;">

            <div class="container" style="background-color: white; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; margin-bottom: 10px;">Verify your identity</h2>

                <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">Hello, ${name}</p>

                <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
                    Welcome! To ensure the safety and security of your account, we need to
                    verify your email address <a href="mailto:${email}" style="color: #0073bb; text-decoration: none;">${email}</a>.
                    If you initiated the request, please enter the following code to verify your identity.
                </p>

                <div class="verification-code" style="text-align: center; background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);">
                    <h1 style="font-size: 48px; color: #333; margin-bottom: 10px;">${code}</h1>
                    <p style="font-size: 14px; color: #888;">(This code will expire 10 minutes after it was sent.)</p>
                </div>

                <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">If you did not initiate the request, please ignore this email.</p>
                <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">Thank you for your cooperation.</p>
            </div>

        </body>
    </html>`;
};

export default emailFormat;
