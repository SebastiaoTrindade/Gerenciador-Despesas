/*Função Gastos Totais*/
function CarregarDadosGastosTotais() {
    $.ajax({
        url: 'Despesas/GastosTotais',
        method: 'POST',
        success: function (dados) {
            new Chart(document.getElementById("GraficoGastosTotais"), {
                type: 'line',

                data: {
                    labels: PegarMeses(dados),
                    datasets: [{
                        label: "Total Gasto",
                        data: PegarValores(dados),
                        backgroundColor: "#ecf0f1",
                        borderColor: "#2980b9",
                        fill: false,
                        spanGaps: false
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Total Gasto"
                        }
                    }
                }
            });
        }
    });
}