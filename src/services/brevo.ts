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
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
                .header { background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { padding: 20px; }
                .links { margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 5px; }
                .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px 0; }
                .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Thank You for Connecting!</h2>
                </div>
                <div class="content">
                    <p>Hi ${userName},</p>
                    
                    <p>Thank you for visiting my portfolio and reaching out! I'm excited to see your interest in my work.</p>
                    
                    <p>As you're interested in potentially working together, I've attached my contact information and professional profiles below for your convenience:</p>
                    
                    <div class="links">
                        <p>📄 <strong>Resume:</strong> <a href="https://drive.google.com/file/d/1kzQ-DhDhpaiZpOIcWLLwrBJMv5_Ggu-a/view?usp=sharing">View Resume</a></p>
                        <p>💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nimesh-kulkarni-526401266/">Connect on LinkedIn</a></p>
                        <p>💻 <strong>GitHub:</strong> <a href="https://github.com/GitNimay">Check my Code</a></p>
                        <p>🌐 <strong>Portfolio:</strong> <a href="https://nimesh-portfolio-iota.vercel.app/">Visit Website</a></p>
                    </div>
                    
                    <p>I look forward to discussing how I can contribute to your team.</p>
                    
                    <p>Best regards,<br>Nimesh Kulkarni</p>
                </div>
                <div class="footer">
                    <p>This is an automated response from Nimesh Kulkarni's Portfolio.</p>
                </div>
            </div>
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
