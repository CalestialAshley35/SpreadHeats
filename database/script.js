let columns = [];
let rows = [];

function createDatabase() {
  const dbName = document.getElementById('dbName').value;
  if (dbName) {
    document.getElementById('databaseContainer').style.display = 'block';
    document.getElementById('databaseTitle').textContent = `Database: ${dbName}`;
  }
}

function addColumn() {
  const columnName = document.getElementById('columnName').value;
  if (columnName && !columns.includes(columnName)) {
    columns.push(columnName);
    renderColumns();
    document.getElementById('columnName').value = ''; // Clear input
  }
}

function renderColumns() {
  const columnHeaders = document.getElementById('columnHeaders');
  columnHeaders.innerHTML = ''; // Clear existing columns

  columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    columnHeaders.appendChild(th);
  });
}

function addRow() {
  const rowName = document.getElementById('rowName').value;
  const rowValue = document.getElementById('rowValue').value;

  if (rowName) {
    let existingRow = rows.find(row => row.name === rowName);

    if (!existingRow) {
      existingRow = { name: rowName, values: {} };
      rows.push(existingRow);
    }

    if (columns.length > 1) {
      const columnName = columns[1]; // Use the first column for row values
      existingRow.values[columnName] = rowValue;
    }

    renderRows();
    document.getElementById('rowName').value = ''; // Clear row name
    document.getElementById('rowValue').value = ''; // Clear row value
  }
}

function renderRows() {
  const rowsData = document.getElementById('rowsData');
  rowsData.innerHTML = ''; // Clear existing rows

  rows.forEach(row => {
    const tr = document.createElement('tr');

    columns.forEach(col => {
      const td = document.createElement('td');
      td.textContent = col === columns[0] ? row.name : row.values[col] || '';
      tr.appendChild(td);
    });

    rowsData.appendChild(tr);
  });
}

function downloadDatabase() {
  const dbName = document.getElementById('dbName').value || 'UnnamedDatabase';
  const database = {
    name: dbName,
    columns: columns,
    rows: rows
  };

  const dataStr = JSON.stringify(database, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${dbName}.spreadheatsdb`;
  a.click();

  URL.revokeObjectURL(url);
}
