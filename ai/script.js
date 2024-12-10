document.addEventListener("DOMContentLoaded", () => {
    const aiButton = document.getElementById("aiButton");
    const modal = document.getElementById("promptModal");
    const closeModalButton = document.getElementById("closeModal");
    const submitCommandButton = document.getElementById("submitCommand");
    const commandInput = document.getElementById("commandInput");
    const errorMessage = document.getElementById("errorMessage");
    const table = document.getElementById("spreadsheet");

    // Show Modal
    aiButton.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Close Modal
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
        resetModal();
    });

    // Submit Command
    submitCommandButton.addEventListener("click", () => {
        const command = commandInput.value.trim();
        if (!processCommand(command)) {
            errorMessage.textContent = "Invalid command. Use formats like: 'Put Text in cell A1' or 'Put Text in row 5 column D'.";
            errorMessage.style.display = "block";
        } else {
            modal.style.display = "none";
            resetModal();
        }
    });

    function resetModal() {
        commandInput.value = "";
        errorMessage.style.display = "none";
    }

    function processCommand(command) {
        const regex = /Put "(.*?)" (in cell ([A-Z])(\d+)|in row (\d+) column ([A-Z])|from row (\d+) to row (\d+) in column ([A-Z]))/i;
        const match = command.match(regex);

        if (match) {
            const textToPut = match[1];
            if (match[3] && match[4]) {
                // Format: Put "Text" in cell A1
                const col = match[3].toUpperCase();
                const row = parseInt(match[4], 10);
                updateCell(col, row, textToPut);
            } else if (match[5] && match[6]) {
                // Format: Put "Text" in row 5 column C
                const row = parseInt(match[5], 10);
                const col = match[6].toUpperCase();
                updateCell(col, row, textToPut);
            } else if (match[7] && match[8] && match[9]) {
                // Format: Put "Text" from row 1 to row 10 in column C
                const startRow = parseInt(match[7], 10);
                const endRow = parseInt(match[8], 10);
                const col = match[9].toUpperCase();
                for (let r = startRow; r <= endRow; r++) {
                    updateCell(col, r, textToPut);
                }
            }
            return true;
        }
        return false;
    }

    function updateCell(col, row, text) {
        const colIndex = col.charCodeAt(0) - 65; // Convert column letter to index (0-based)
        const rowIndex = row - 1; // Convert row number to index (0-based)
        if (rowIndex >= 0 && rowIndex < 100 && colIndex >= 0 && colIndex < 26) {
            const cell = table.rows[rowIndex + 1].cells[colIndex + 1]; // Skip header row and row number column
            cell.textContent = text;
        }
    }
});
