let selectedCell = null;

// Select a cell
function selectCell(cell) {
  document.querySelectorAll('.sheet td').forEach(td => td.classList.remove('selected'));
  cell.classList.add('selected');
  selectedCell = cell;
}

// Apply color to selected cell
function applyColor() {
  if (selectedCell) selectedCell.style.backgroundColor = prompt('Enter a color:');
}

// Open the HTML editor modal
function openHtmlEditor() {
  if (!selectedCell) {
    alert('Please select a cell first.');
    return;
  }
  document.getElementById('htmlEditorModal').style.display = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
  document.getElementById('htmlCode').value = selectedCell.innerHTML;
}

// Close the HTML editor modal
function closeHtmlEditor() {
  document.getElementById('htmlEditorModal').style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
}

// Save the HTML code to the selected cell
function saveHtml() {
  if (selectedCell) {
    selectedCell.innerHTML = document.getElementById('htmlCode').value;
    closeHtmlEditor();
  }
}

// Open settings
function openSettings() {
  alert('Settings opened (additional settings to be configured).');
}

// Download sheet as HTML without borders, headers, or row numbers
function downloadSheet() {
  const tableContent = document.createElement("table");
  tableContent.style.borderCollapse = "collapse";
  document.querySelectorAll("#sheet tbody tr").forEach(row => {
    const newRow = tableContent.insertRow();
    Array.from(row.querySelectorAll("td")).forEach(cell => {
      const newCell = newRow.insertCell();
      newCell.innerHTML = cell.innerHTML;
      newCell.style.padding = "8px";
      newCell.style.textAlign = "center";
    });
  });

  const blob = new Blob(
    [`<!DOCTYPE html><html><head><title>Downloaded Sheet</title></head><body>`, tableContent.outerHTML, `</body></html>`],
    { type: "text/html" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sheet.html";
  a.click();
  URL.revokeObjectURL(url);
    }
