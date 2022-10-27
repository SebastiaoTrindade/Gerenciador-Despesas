using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace GerenciadorDespesas.Models
{
    public class TipoDespesa
    {
        public int TipoDespesaId { get; set; }

        [Required(ErrorMessage ="Campo Obrigatório")]
        [StringLength(50, ErrorMessage ="Use menos caracteres")]

        [Remote("TipoDespesaExiste", "TipoDespesas")]
        public string Nome { get; set; }
        public ICollection<Despesa> Despesas { get; set; }
    }
}
