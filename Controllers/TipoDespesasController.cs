using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GerenciadorDespesas.Models;

namespace GerenciadorDespesas.Controllers
{
    public class TipoDespesasController : Controller
    {
        private readonly AppDbContext _context;

        public TipoDespesasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: TipoDespesas
        [HttpGet]
        public async Task<IActionResult> Index()
        {
              return View(await _context.TipoDespesas.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Index(string txtPesquisar)
        {
            if (!String.IsNullOrEmpty(txtPesquisar))
            {
                return View(await _context.TipoDespesas.Where(td => td.Nome.ToUpper().Contains(txtPesquisar.ToUpper())).ToListAsync());
            }

            return View(await _context.TipoDespesas.ToListAsync());
        }
        
        // Metodo para verificar Tipo de Despesa
        public async Task<JsonResult> TipoDespesaExiste(string Nome)
        {
            if (await _context.TipoDespesas.AnyAsync(td => td.Nome.ToUpper() == Nome.ToUpper()))
            {
                return Json("Este tipo de despesa já existe!");
            }

            return Json(true);
        }

        // Metodo Adicionar através do Modal
        public JsonResult AdicionarTipoDespesa(string txtDespesa)
        {
            if (!String.IsNullOrEmpty(txtDespesa))
            {
                if (!_context.TipoDespesas.Any(td => td.Nome.ToUpper() == txtDespesa.ToUpper()))
                {
                    TipoDespesa tipoDespesa = new TipoDespesa();
                    tipoDespesa.Nome = txtDespesa;
                    _context.Add(tipoDespesa);
                    _context.SaveChanges();

                    return Json(true);
                }
            }

            return Json(false);
        }

        // GET: TipoDespesas/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TipoDespesas/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("TipoDespesaId,Nome")] TipoDespesa tipoDespesa)
        {
            if (ModelState.IsValid)
            {
                TempData["Confirmacao"] = tipoDespesa.Nome +  " foi cadastrado com sucesso!";
                _context.Add(tipoDespesa);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(tipoDespesa);
        }

        // GET: TipoDespesas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TipoDespesas == null)
            {
                return NotFound();
            }

            var tipoDespesa = await _context.TipoDespesas.FindAsync(id);
            if (tipoDespesa == null)
            {
                return NotFound();
            }
            return View(tipoDespesa);
        }

        // POST: TipoDespesas/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("TipoDespesaId,Nome")] TipoDespesa tipoDespesa)
        {
            if (id != tipoDespesa.TipoDespesaId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    TempData["Confirmacao"] = tipoDespesa.Nome +  " foi atualizado com sucesso!";
                    _context.Update(tipoDespesa);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TipoDespesaExists(tipoDespesa.TipoDespesaId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(tipoDespesa);
        }
                
        // POST: TipoDespesas/Delete/5
        [HttpPost]        
        public async Task<JsonResult> Delete(int id)
        {            
            var tipoDespesa = await _context.TipoDespesas.FindAsync(id);
            TempData["Confirmacao"] = tipoDespesa.Nome +  " foi excluído com sucesso!";
            if (tipoDespesa != null)
            {
                _context.TipoDespesas.Remove(tipoDespesa);
            }
            
            await _context.SaveChangesAsync();
            return Json(tipoDespesa.Nome + "excluído com sucesso!" );
        }

        private bool TipoDespesaExists(int id)
        {
          return _context.TipoDespesas.Any(e => e.TipoDespesaId == id);
        }
    }
}
