
let portfolio = {};

const gainers = [
    { symbol: 'ABC', price: 15045, change: 4.50 },
    { symbol: 'XYZ', price: 12030, change: 3.80 },
    { symbol: 'MNO', price: 9560, change: 2.75 }
];

const losers = [
    { symbol: 'PQR', price: 8520, change: -2.50 },
    { symbol: 'LMN', price: 10240, change: -3.10 },
    { symbol: 'JKL', price: 5570, change: -4.20 }
];


function renderTables() {
    const gainersBody = document.getElementById('gainersBody');
    const losersBody = document.getElementById('losersBody');
    const combinedBody = document.getElementById('combinedBody');

    gainersBody.innerHTML = '';
    losersBody.innerHTML = '';
    combinedBody.innerHTML = '';


    gainers.forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.symbol}</td>
            <td>₹${stock.price.toFixed(2)}</td>
            <td>${stock.change}%</td>
            <td>
                <button onclick="buyStock('${stock.symbol}', ${stock.price})">Buy</button>
                <button onclick="sellStock('${stock.symbol}', ${stock.price})">Sell</button>
            </td>
        `;
        gainersBody.appendChild(row);
    });


    losers.forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.symbol}</td>
            <td>₹${stock.price.toFixed(2)}</td>
            <td>${stock.change}%</td>
            <td>
                <button onclick="buyStock('${stock.symbol}', ${stock.price})">Buy</button>
                <button onclick="sellStock('${stock.symbol}', ${stock.price})">Sell</button>
            </td>
        `;
        losersBody.appendChild(row);
    });


    const combinedStocks = [...gainers, ...losers].sort((a, b) => b.price - a.price);

    combinedStocks.forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.symbol}</td>
            <td>₹${stock.price.toFixed(2)}</td>
            <td>${stock.change}%</td>
            <td>
                <button onclick="buyStock('${stock.symbol}', ${stock.price})">Buy</button>
                <button onclick="sellStock('${stock.symbol}', ${stock.price})">Sell</button>
            </td>
        `;
        combinedBody.appendChild(row);
    });
}


function buyStock(symbol, price) {
    const quantity = prompt(`How many shares of ${symbol} do you want to buy at ₹${price.toFixed(2)}?`);
    const shares = parseInt(quantity);

    if (isNaN(shares) || shares <= 0) {
        alert('Please enter a valid number of shares.');
        return;
    }

    if (!portfolio[symbol]) {
        portfolio[symbol] = { quantity: 0, averagePrice: 0 };
    }

    const totalCost = portfolio[symbol].quantity * portfolio[symbol].averagePrice + shares * price;
    portfolio[symbol].quantity += shares;
    portfolio[symbol].averagePrice = totalCost / portfolio[symbol].quantity;

    updatePortfolioTable();
}


function sellStock(symbol, price) {
    const quantity = prompt(`How many shares of ${symbol} do you want to sell at ₹${price.toFixed(2)}?`);
    const shares = parseInt(quantity);

    if (isNaN(shares) || shares <= 0) {
        alert('Please enter a valid number of shares.');
        return;
    }

    if (portfolio[symbol] && portfolio[symbol].quantity >= shares) {
        portfolio[symbol].quantity -= shares;
        if (portfolio[symbol].quantity === 0) {
            delete portfolio[symbol];
        }
    } else {
        alert('You do not have enough shares to sell.');
    }

    updatePortfolioTable();
}


function updatePortfolioTable() {
    const portfolioBody = document.getElementById('portfolioBody');
    portfolioBody.innerHTML = '';

    Object.keys(portfolio).forEach(symbol => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${symbol}</td>
            <td>${portfolio[symbol].quantity}</td>
            <td>₹${portfolio[symbol].averagePrice.toFixed(2)}</td>
        `;
        portfolioBody.appendChild(row);
    });
}
window.onload = renderTables;
