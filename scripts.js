// Navigation and page switching
document.getElementById('homeLink').addEventListener('click', () => showPage('home'));
document.getElementById('incomeLink').addEventListener('click', () => showPage('income'));
document.getElementById('expenseLink').addEventListener('click', () => showPage('expense'));
document.getElementById('budgetLink').addEventListener('click', () => showPage('budget'));
document.getElementById('getStartedBtn').addEventListener('click', () => showPage('income'));

// Function to show/hide pages
function showPage(pageId) {
    document.querySelectorAll('.content').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    updateSummary();
}

// Handle income form submission
document.getElementById('incomeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const income = parseFloat(document.getElementById('incomeInput').value);
    if (!isNaN(income)) {
        localStorage.setItem('income', income);
        showPage('expense');
    }
});

// Handle expense form submission
document.getElementById('expenseForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const expenseType = document.getElementById('expenseType').value;
    const expenseDesc = document.getElementById('expenseDesc').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (!isNaN(expenseAmount)) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push({ type: expenseType, description: expenseDesc, amount: expenseAmount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        showPage('budget');
    }
    updateSummary();
    calculateBudget();
});

// Update the summary section with income and expenses
function updateSummary() {
    const income = parseFloat(localStorage.getItem('income')) || 0;
    document.getElementById('summaryIncome').textContent = `Income: $${income.toFixed(2)}`;

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalExpenses = 0;
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = ''; // Clear previous entries

    expenses.forEach(exp => {
        totalExpenses += exp.amount;
        const li = document.createElement('li');
        li.textContent = `${exp.type} - ${exp.description}: $${exp.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    });

    document.getElementById('summaryExpenses').textContent = `Expenses: $${totalExpenses.toFixed(2)}`;
}

// Calculate budget and display on the budget page
function calculateBudget() {
    const income = parseFloat(localStorage.getItem('income')) || 0;
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    let totalExpenses = 0;
    expenses.forEach(exp => totalExpenses += exp.amount);

    const remainingIncome = income - totalExpenses;

    const needs = (remainingIncome * 0.50).toFixed(2);
    const wants = (remainingIncome * 0.30).toFixed(2);
    const savings = (remainingIncome * 0.20).toFixed(2);

    document.getElementById('needs').textContent = `Needs: $${needs}`;
    document.getElementById('wants').textContent = `Wants: $${wants}`;
    document.getElementById('savings').textContent = `Savings: $${savings}`;
}

// Show the home page initially
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    updateSummary();
});
