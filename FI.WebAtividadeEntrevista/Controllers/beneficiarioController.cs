using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class beneficiarioController : Controller
    {


        // GET: beneficiario
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Incluir(BeneficiarioModel beneficiario)
        {
            Models.BeneficiarioModel model = null;

            model = new BeneficiarioModel()
            {
                CPF = beneficiario.CPF,
                Nome = beneficiario.Nome
            };

            
            return View(model);

            //return View();
        }

    }
}