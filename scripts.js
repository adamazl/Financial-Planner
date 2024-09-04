// scripts.js

document.getElementById('incomeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the primary income value
    const primaryIncome = parseFloat(document.getElementById('income').value);

    // Get additional incomes
    const additionalIncomeInputs = document.querySelectorAll('.additional-income-input');
    let additionalIncome = 0;

    additionalIncomeInputs.forEach(input => {
        additionalIncome += parseFloat(input.value) || 0;
    });

    // Calculate total income
    const totalIncome = primaryIncome + additionalIncome;

    // Calculate budget allocations
    const needs = (totalIncome * 0.50).toFixed(2);
    const wants = (totalIncome * 0.30).toFixed(2);
    const savings = (totalIncome * 0.20).toFixed(2);

    // Update the display
    document.getElementById('needs').textContent = `Needs: $${needs}`;
    document.getElementById('wants').textContent = `Wants: $${wants}`;
    document.getElementById('savings').textContent = `Savings: $${savings}`;

    // Show the budget allocation section
    document.getElementById('budgetAllocation').classList.remove('hidden');
});

// Add new additional income field
document.getElementById('addIncomeBtn').addEventListener('click', function () {
    const additionalIncomesContainer = document.getElementById('additionalIncomes');
    const newIncomeField = document.createElement('div');
    newIncomeField.className = 'additional-income';
    newIncomeField.innerHTML = '<input type="number" class="additional-income-input" placeholder="Additional Income">';
    additionalIncomesContainer.appendChild(newIncomeField);
});
