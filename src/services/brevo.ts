export const sendAutoReplyEmail = async (userEmail: string, userName: string) => {
    const API_KEY = import.meta.env.VITE_BREVO_API_KEY;

    if (!API_KEY) {
        console.error("Brevo API Key is missing");
        return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1eeee; font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;">
    <!-- Full Width Header -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #201d1d;">
        <tr>
            <td align="center" style="padding: 48px 24px;">
                <table cellpadding="0" cellspacing="0" border="0" width="720" style="max-width: 720px; width: 100%;">
                    <tr>
                        <td style="text-align: left;">
                            <h1 style="color: #fdfcfc; font-size: 38px; font-weight: 700; line-height: 1.50; margin: 0 0 8px 0;">Thanks for reaching out.</h1>
                            <p style="color: #9a9898; font-size: 16px; font-weight: 400; line-height: 1.50; margin: 0;">Your message has been received, ${userName}.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>f
    </table>
    
    <!-- Main Content -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f1eeee;">
        <tr>
            <td align="center" style="padding: 48px 24px;">
                <table cellpadding="0" cellspacing="0" border="0" width="720" style="max-width: 720px; width: 100%;">
                    <!-- Message Card -->
                    <tr>
                        <td style="padding-bottom: 32px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fdfcfc; border-radius: 4px; border: 1px solid rgba(15, 0, 0, 0.12);">
                                <tr>
                                    <td style="padding: 32px;">
                                        <p style="color: #201d1d; font-size: 16px; font-weight: 400; line-height: 1.60; margin: 0 0 16px 0;">
                                            I appreciate you taking the time to visit my portfolio. I'll get back to you as soon as possible.
                                        </p>
                                        <p style="color: #201d1d; font-size: 16px; font-weight: 400; line-height: 1.60; margin: 0;">
                                            In the meantime, feel free to explore my work:
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Links Grid -->
                    <tr>
                        <td style="padding-bottom: 32px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" style="padding-right: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fdfcfc; border-radius: 4px; border: 1px solid rgba(15, 0, 0, 0.12);">
                                            <tr>
                                                <td style="padding: 24px;">
                                                    <p style="color: #201d1d; font-size: 16px; font-weight: 700; line-height: 1.50; margin: 0 0 8px 0;">LinkedIn</p>
                                                    <a href="https://www.linkedin.com/in/nimesh-kulkarni-526401266/" style="color: #007aff; font-size: 14px; font-weight: 500; text-decoration: underline;">Connect with me</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding-left: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fdfcfc; border-radius: 4px; border: 1px solid rgba(15, 0, 0, 0.12);">
                                            <tr>
                                                <td style="padding: 24px;">
                                                    <p style="color: #201d1d; font-size: 16px; font-weight: 700; line-height: 1.50; margin: 0 0 8px 0;">GitHub</p>
                                                    <a href="https://github.com/GitNimay" style="color: #007aff; font-size: 14px; font-weight: 500; text-decoration: underline;">View my code</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding-right: 16px; padding-top: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fdfcfc; border-radius: 4px; border: 1px solid rgba(15, 0, 0, 0.12);">
                                            <tr>
                                                <td style="padding: 24px;">
                                                    <p style="color: #201d1d; font-size: 16px; font-weight: 700; line-height: 1.50; margin: 0 0 8px 0;">Resume</p>
                                                    <a href="https://drive.google.com/file/d/1kzQ-DhDhpaiZpOIcWLLwrBJMv5_Ggu-a/view?usp=sharing" style="color: #007aff; font-size: 14px; font-weight: 500; text-decoration: underline;">Download CV</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding-left: 16px; padding-top: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fdfcfc; border-radius: 4px; border: 1px solid rgba(15, 0, 0, 0.12);">
                                            <tr>
                                                <td style="padding: 24px;">
                                                    <p style="color: #201d1d; font-size: 16px; font-weight: 700; line-height: 1.50; margin: 0 0 8px 0;">Portfolio</p>
                                                    <a href="https://nimesh-portfolio-iota.vercel.app/" style="color: #007aff; font-size: 14px; font-weight: 500; text-decoration: underline;">Visit website</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td style="padding: 32px; background-color: #fdfcfc; border-radius: 4px; border: 1px solid rgba(15, 0, 0, 0.12);">
                            <p style="color: #201d1d; font-size: 16px; font-weight: 500; line-height: 1.50; margin: 0 0 8px 0;">Nimesh Kulkarni</p>
                            <p style="color: #9a9898; font-size: 14px; font-weight: 400; line-height: 1.50; margin: 0;">DevOps Engineer</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
    <!-- Footer -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #201d1d;">
        <tr>
            <td align="center" style="padding: 32px 24px;">
                <table cellpadding="0" cellspacing="0" border="0" width="720" style="max-width: 720px; width: 100%;">
                    <tr>
                        <td style="text-align: center; border-top: 1px solid rgba(15, 0, 0, 0.12); padding-top: 24px;">
                            <p style="color: #6e6e73; font-size: 12px; font-weight: 400; line-height: 2.00; margin: 0;">This is an automated response from nimesh-portfolio.vercel.app</p>
                            <p style="color: #6e6e73; font-size: 12px; font-weight: 400; line-height: 2.00; margin: 8px 0 0 0;">© 2026 Nimesh Kulkarni. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": API_KEY,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                sender: {
                    name: "Nimesh Kulkarni",
                    email: "nimesh.kulkarni2004@gmail.com"
                },
                to: [
                    {
                        email: userEmail,
                        name: userName
                    }
                ],
                subject: "Thank you for visiting my portfolio! - Nimesh Kulkarni",
                htmlContent: htmlContent
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Brevo API Error: ${JSON.stringify(errorData)}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to send auto-reply email:", error);
        // We generally don't want to fail the whole form submission if the auto-reply fails
        // so we just log it.
        return null;
    }
};
