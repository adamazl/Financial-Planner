// scripts.js

document.getElementById('incomeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the income value
    const income = parseFloat(document.getElementById('income').value);

    // Calculate budget allocations
    const needs = (income * 0.50).toFixed(2);
    const wants = (income * 0.30).toFixed(2);
    const savings = (income * 0.20).toFixed(2);

    // Update the display
    document.getElementById('needs').textContent = `Needs: $${needs}`;
    document.getElementById('wants').textContent = `Wants: $${wants}`;
    document.getElementById('savings').textContent = `Savings: $${savings}`;

    // Show the budget allocation section
    document.getElementById('budgetAllocation').classList.remove('hidden');
});
