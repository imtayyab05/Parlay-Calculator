// Sample matchup data (you can replace this with your Excel data later)
const matchups = [
    { home_team: "Team A", home_spread: "+2.5", home_odds: -110, away_team: "Team B", away_spread: "-2.5", away_odds: 120 },
    { home_team: "Team C", home_spread: "-1.5", home_odds: -130, away_team: "Team D", away_spread: "+1.5", away_odds: 150 }
];

// This function will generate the matchups dynamically
function loadMatchups() {
    const container = document.getElementById('matchup-container');
    matchups.forEach((matchup, idx) => {
        const matchupHTML = `
            <div class="matchup">
                <div class="row">
                    <label>${matchup.home_team} | Spread: ${matchup.home_spread} | Odds: ${matchup.home_odds}</label>
                    <input type="checkbox" id="bet_home_${idx}" onchange="toggleAmount(${idx}, 'home')">
                    <input type="text" id="amount_home_${idx}" disabled>
                </div>
                <div class="row">
                    <label>${matchup.away_team} | Spread: ${matchup.away_spread} | Odds: ${matchup.away_odds}</label>
                    <input type="checkbox" id="bet_away_${idx}" onchange="toggleAmount(${idx}, 'away')">
                    <input type="text" id="amount_away_${idx}" disabled>
                </div>
            </div>
        `;
        container.innerHTML += matchupHTML;
    });
}

// Enable/disable the amount field based on checkbox selection
function toggleAmount(idx, team) {
    const amountField = document.getElementById(`amount_${team}_${idx}`);
    const checkbox = document.getElementById(`bet_${team}_${idx}`);
    amountField.disabled = !checkbox.checked;
}

// Function to calculate payout based on odds and amount
function calculatePayout(odds, amount) {
    if (odds < 0) {
        return (amount / (Math.abs(odds) / 100)).toFixed(2);
    } else {
        return (amount * (odds / 100)).toFixed(2);
    }
}

// Calculate the total parlay payout
function calculateParlay() {
    let selectedTeams = [];
    let totalPayout = 0;

    matchups.forEach((matchup, idx) => {
        const betHome = document.getElementById(`bet_home_${idx}`);
        const amountHome = parseFloat(document.getElementById(`amount_home_${idx}`).value) || 0;
        if (betHome.checked) {
            const payout = calculatePayout(matchup.home_odds, amountHome);
            totalPayout += parseFloat(payout);
            selectedTeams.push(`${matchup.home_team}: Bet $${amountHome} -> Payout $${payout}`);
        }

        const betAway = document.getElementById(`bet_away_${idx}`);
        const amountAway = parseFloat(document.getElementById(`amount_away_${idx}`).value) || 0;
        if (betAway.checked) {
            const payout = calculatePayout(matchup.away_odds, amountAway);
            totalPayout += parseFloat(payout);
            selectedTeams.push(`${matchup.away_team}: Bet $${amountAway} -> Payout $${payout}`);
        }
    });

    const resultDiv = document.getElementById('result');
    if (selectedTeams.length === 0) {
        resultDiv.textContent = "No bets selected!";
    } else {
        resultDiv.innerHTML = `Selected Bets:<br>${selectedTeams.join('<br>')}<br>Total Payout: $${totalPayout}`;
    }
}

// Clear the form by reloading the matchups
function clearForm() {
    document.getElementById('matchup-container').innerHTML = '';
    document.getElementById('result').textContent = '';
    loadMatchups();
}

// Initialize the page by loading matchups when it loads
window.onload = loadMatchups;
