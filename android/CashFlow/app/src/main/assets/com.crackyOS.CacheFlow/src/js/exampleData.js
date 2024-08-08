const exampleData = [
    { "date": "2024-08-01", "reason": "Gehalt", "value": "+100" },
    { "date": "2024-08-02", "reason": "Einkauf", "value": "-50" },
    { "date": "2024-08-03", "reason": "Bonus", "value": "+75" },
    { "date": "2024-08-04", "reason": "Rechnung", "value": "-30" },
    { "date": "2024-08-05", "reason": "Verkauf", "value": "+150" },
    { "date": "2024-08-06", "reason": "Miete", "value": "-90" }
];
localStorage.setItem('balanceHistory', JSON.stringify(exampleData));