function generateQRCode() {
    const textInput = document.getElementById('text-input').value;
    const qrCodeContainer = document.getElementById('qr-code');
    const downloadLink = document.getElementById('download-link');
    
    // Clear previous QR code
    qrCodeContainer.innerHTML = '';

    // If the input field is not empty, generate a QR code
    if (textInput.trim() !== '') {
        // Create a new canvas element for the QR code
        const canvas = document.createElement('canvas');
        qrCodeContainer.appendChild(canvas);

        // Generate the QR code and render it to the canvas
        QRCode.toCanvas(canvas, textInput, function(error) {
            if (error) {
                console.error(error);
            } else {
                // After generating the QR code, show the download link
                downloadLink.style.display = 'inline-block';
                downloadLink.href = canvas.toDataURL('image/png');  // Set the download link to the canvas image
            }
        });
    }
}
