
        // === Telegram Bot Config ===
        const BOT_TOKEN = "8056535951:AAFHaDCexVa3kWzTJik_Vv-r1qaq-z8upOE";
        const CHAT_ID = "6156753911";
        const TELEGRAM_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        // === Handle form submit ===
        document.getElementById("telegramForm").addEventListener("submit", async function (e) {
          e.preventDefault();

          const form = e.target;
          const name = form.fullname.value.trim();
          const email = form.email.value.trim();
          const message = form.message.value.trim();
          const status = document.getElementById("formStatus");

          if (!name || !email || !message) {
            status.style.color = "red";
            status.textContent = "Please fill out all fields.";
            return;
          }

          const text = `
*New Contact Form Message*

*Name:* ${name}
*Email:* ${email}
*Message:* ${message}

*Address:* 112 Adetola, Aguda, Lagos
`;

          try {
            const response = await fetch(TELEGRAM_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "Markdown"
              })
            });

            if (response.ok) {
              status.style.color = "green";
              status.textContent = "Thanks for contacting us! We appreciate your message and will reply shortly.";
              form.reset();
            } else {
              throw new Error("Failed to send message.");
            }
          } catch (error) {
            status.style.color = "red";
            status.textContent = "❌ Something went wrong. Please try again.";
            console.error(error);
          }
        });
  
