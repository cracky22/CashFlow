document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const reason = document.getElementById('reason').value.trim();
    const value = parseFloat(document.getElementById('value').value);

    if (reason && !isNaN(value)) {
        const date = new Date().toISOString().split('T')[0];
        const formattedValue = `+${value}`;
        const newEntry = { date, reason, value: formattedValue };
        let balanceHistory = JSON.parse(localStorage.getItem('balanceHistory')) || [];
        balanceHistory.push(newEntry);
        localStorage.setItem('balanceHistory', JSON.stringify(balanceHistory));
        document.getElementById('addForm').reset();
        alert('Transaktion hinzugefügt!');
    } else {
        alert('Bitte alle Felder korrekt ausfüllen.');
    }
});