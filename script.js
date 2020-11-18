
const xlabels = [];
const ytemps = [];

chartIt();

async function chartIt () {
    const ctx = document.getElementById('chart').getContext('2d');
    await getData();
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Global Mean Average Temperature in C',
                data: ytemps,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }
    });
}

async function getData () {
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();
    console.log(data);

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xlabels.push(year);
        const temp = columns[1];
        ytemps.push(parseFloat(temp) + 14);
        console.log(year, temp);
    });
}



