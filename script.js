document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('userName');
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.querySelector('.output-section');
    const canvas = document.getElementById('quoteCanvas');
    const ctx = canvas.getContext('2d');
    const generatedImage = document.getElementById('generatedImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');

    const quotes = [
        "Har subah ek nayi shuruaat hai, ek naya mauka.",
        "Muskurahat se din shuru karein, sab acha hoga.",
        "Aaj ka din aapke liye shaandar ho!",
        "Utho, jaago aur tab tak mat ruko jab tak lakshya na praapt ho jaaye.",
        "Ek choti si positive soch aapka pura din badal sakti hai.",
        "Sapne wo nahi jo aap sote waqt dekhte hain, sapne wo hain jo aapko sone nahi dete.",
        "Har din ko apni masterpiece banao.",
        "Khushiyaan choti choti cheezon mein milti hain, unhe mehsoos karein.",
        "Aapki subah mangalmay ho!",
        "Nayi subah, nayi ummeed, naye vichar."
    ];

    generateBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        if (!name) {
            alert('Kripya apna naam daalein!');
            return;
        }

        outputSection.style.display = 'block';
        generateImage(name);
    });

    function generateImage(name) {
        const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Background Gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, '#FFDAB9'); // PeachPuff
        gradient.addColorStop(0.5, '#FFA07A'); // LightSalmon
        gradient.addColorStop(1, '#FF7F50'); // Coral
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Text properties
        ctx.textAlign = 'center';

        // "Good Morning" Text
        ctx.font = 'bold 60px "Trebuchet MS", sans-serif';
        ctx.fillStyle = '#FFFFFF'; // White text
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText('Good Morning,', canvasWidth / 2, canvasHeight * 0.22);

        // User's Name
        ctx.font = 'bold 70px "Comic Sans MS", cursive, sans-serif';
        ctx.fillStyle = '#FFFFE0'; // LightYellow for name
        // Reset shadow for name or use different shadow
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 6;
        ctx.fillText(`${name}!`, canvasWidth / 2, canvasHeight * 0.38);

        // Reset shadow for quote
        ctx.shadowColor = 'transparent';

        // Quote Text
        ctx.fillStyle = '#333333'; // Dark gray for quote for better readability
        ctx.font = 'italic 32px "Georgia", serif';
        
        const maxLineWidth = canvasWidth * 0.85;
        const lineHeight = 40;
        let yPos = canvasHeight * 0.58;

        wrapText(ctx, selectedQuote, canvasWidth / 2, yPos, maxLineWidth, lineHeight);

        // Watermark/Credit
        ctx.font = '16px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('Aapke liye pyaar se <3', canvasWidth / 2, canvasHeight - 30);

        // Display the image
        const dataURL = canvas.toDataURL('image/png');
        generatedImage.src = dataURL;
        generatedImage.style.display = 'block';

        // Setup download and share buttons
        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = `good_morning_${name.replace(/\s+/g, '_')}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        shareBtn.onclick = async () => {
            if (navigator.share) {
                try {
                    const response = await fetch(dataURL);
                    const blob = await response.blob();
                    const file = new File([blob], `good_morning_${name.replace(/\s+/g, '_')}.png`, { type: blob.type });

                    await navigator.share({
                        title: 'Good Morning!',
                        text: `Dekho ${name} ke liye yeh good morning message!`,
                        files: [file],
                    });
                } catch (error) {
                    console.error('Error sharing:', error);
                    alert('Share nahi ho paya. Aap image download karke share kar sakte hain.');
                }
            } else {
                alert('Aapka browser Web Share API support nahi karta. Kripya image download karke share karein.');
            }
        };
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line.trim(), x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line.trim(), x, y);
    }
});