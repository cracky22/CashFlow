// Formular-Submit-Event-Listener
document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standard-Formular-Absenden

    const reason = document.getElementById('reason').value.trim();
    const value = parseFloat(document.getElementById('value').value);

    if (reason && !isNaN(value)) {
        const date = new Date().toISOString().split('T')[0]; // Aktuelles Datum im Format YYYY-MM-DD
        const formattedValue = `+${value}`; // Wert formatieren

        const newEntry = { date, reason, value: formattedValue };

        // Alte Daten aus LocalStorage holen
        let balanceHistory = JSON.parse(localStorage.getItem('balanceHistory')) || [];
        balanceHistory.push(newEntry);
        localStorage.setItem('balanceHistory', JSON.stringify(balanceHistory));

        // Formular zurücksetzen
        document.getElementById('addForm').reset();

        alert('Transaktion hinzugefügt!');
    } else {
        alert('Bitte alle Felder korrekt ausfüllen.');
    }
});