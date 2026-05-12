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
<body style="margin: 0; padding: 0; background-color: #f1eeee; font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace; color: #201d1d;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f1eeee;">
        <tr>
            <td align="center" style="padding: 32px 16px;">
                <table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width: 640px; width: 100%; background-color: #fdfcfc; border: 1px solid rgba(15, 0, 0, 0.12); border-radius: 12px; overflow: hidden;">
                    <tr>
                        <td style="padding: 0; background-color: #201d1d;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 40px 32px 32px 32px;">
                                        <p style="margin: 0 0 18px 0; color: #9a9898; font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;">Portfolio Contact</p>
                                        <h1 style="margin: 0 0 12px 0; color: #fdfcfc; font-size: 34px; font-weight: 700; line-height: 1.25;">Thanks for reaching out.</h1>
                                        <p style="margin: 0; color: #d2cdcd; font-size: 15px; line-height: 1.7;">Your message is in my inbox, ${userName}. I wanted the first reply you got to feel a little more intentional.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 32px; background-color: #fdfcfc;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; background-color: #f7f4f4; border: 1px solid rgba(15, 0, 0, 0.08); border-radius: 10px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <p style="margin: 0 0 10px 0; color: #201d1d; font-size: 18px; font-weight: 700; line-height: 1.5;">What happens next</p>
                                        <p style="margin: 0 0 14px 0; color: #4a4545; font-size: 14px; line-height: 1.8;">I appreciate you taking the time to visit my portfolio and send a message. I will review it and get back to you as soon as possible.</p>
                                        <p style="margin: 0; color: #4a4545; font-size: 14px; line-height: 1.8;">Until then, you can explore a few quick links below.</p>
                                    </td>
                                </tr>
                            </table>

                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                                <tr>
                                    <td width="50%" valign="top" style="padding-right: 8px; padding-bottom: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="height: 100%; background-color: #201d1d; border-radius: 10px;">
                                            <tr>
                                                <td style="padding: 22px;">
                                                    <p style="margin: 0 0 8px 0; color: #fdfcfc; font-size: 16px; font-weight: 700;">LinkedIn</p>
                                                    <p style="margin: 0 0 18px 0; color: #b9b3b3; font-size: 13px; line-height: 1.7;">Professional updates, experience, and recent activity.</p>
                                                    <a href="https://www.linkedin.com/in/nimesh-kulkarni-526401266/" style="display: inline-block; color: #201d1d; background-color: #fdfcfc; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 14px; border-radius: 999px;">Connect with me</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" valign="top" style="padding-left: 8px; padding-bottom: 16px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="height: 100%; background-color: #f7f4f4; border: 1px solid rgba(15, 0, 0, 0.08); border-radius: 10px;">
                                            <tr>
                                                <td style="padding: 22px;">
                                                    <p style="margin: 0 0 8px 0; color: #201d1d; font-size: 16px; font-weight: 700;">GitHub</p>
                                                    <p style="margin: 0 0 18px 0; color: #5a5353; font-size: 13px; line-height: 1.7;">Projects, experiments, and the code behind my work.</p>
                                                    <a href="https://github.com/GitNimay" style="display: inline-block; color: #fdfcfc; background-color: #201d1d; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 14px; border-radius: 999px;">View my code</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" valign="top" style="padding-right: 8px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="height: 100%; background-color: #f7f4f4; border: 1px solid rgba(15, 0, 0, 0.08); border-radius: 10px;">
                                            <tr>
                                                <td style="padding: 22px;">
                                                    <p style="margin: 0 0 8px 0; color: #201d1d; font-size: 16px; font-weight: 700;">Resume</p>
                                                    <p style="margin: 0 0 18px 0; color: #5a5353; font-size: 13px; line-height: 1.7;">A concise overview of my background and hands-on work.</p>
                                                    <a href="https://drive.google.com/file/d/1kzQ-DhDhpaiZpOIcWLLwrBJMv5_Ggu-a/view?usp=sharing" style="display: inline-block; color: #fdfcfc; background-color: #201d1d; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 14px; border-radius: 999px;">Download CV</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" valign="top" style="padding-left: 8px;">
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="height: 100%; background-color: #201d1d; border-radius: 10px;">
                                            <tr>
                                                <td style="padding: 22px;">
                                                    <p style="margin: 0 0 8px 0; color: #fdfcfc; font-size: 16px; font-weight: 700;">Portfolio</p>
                                                    <p style="margin: 0 0 18px 0; color: #b9b3b3; font-size: 13px; line-height: 1.7;">A closer look at selected work, writing, and current focus.</p>
                                                    <a href="https://nimesh-portfolio-iota.vercel.app/" style="display: inline-block; color: #201d1d; background-color: #fdfcfc; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 14px; border-radius: 999px;">Visit website</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #201d1d; border-radius: 10px;">
                                <tr>
                                    <td style="padding: 24px 24px 22px 24px;">
                                        <p style="margin: 0 0 6px 0; color: #fdfcfc; font-size: 16px; font-weight: 700;">Nimesh Kulkarni</p>
                                        <p style="margin: 0 0 14px 0; color: #9a9898; font-size: 13px; line-height: 1.6;">DevOps Engineer</p>
                                        <p style="margin: 0; color: #d2cdcd; font-size: 13px; line-height: 1.8;">This is an automated confirmation from my portfolio contact form.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width: 640px; width: 100%;">
                    <tr>
                        <td style="padding: 18px 12px 0 12px; text-align: center;">
                            <p style="margin: 0; color: #6e6e73; font-size: 12px; line-height: 1.8;">This is an automated response from nimesh-portfolio.vercel.app</p>
                            <p style="margin: 6px 0 0 0; color: #6e6e73; font-size: 12px; line-height: 1.8;">© 2026 Nimesh Kulkarni. All rights reserved.</p>
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
