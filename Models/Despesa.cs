using System.ComponentModel.DataAnnotations;

namespace GerenciadorDespesas.Models
{
    public class Despesa
    {
        public int DespesaId { get; set; }
        public int MesId { get; set; }
        public Mes Meses { get; set; }
        public int TipoDespesaId { get; set; }
        public TipoDespesa TipoDespesa { get; set; }

        [Required(ErrorMessage = "Campo Obrigatório.")]
        [Range(0, double.MaxValue, ErrorMessage = "Valor Inválido.")]
        public double Valor { get; set; }
    }
}
