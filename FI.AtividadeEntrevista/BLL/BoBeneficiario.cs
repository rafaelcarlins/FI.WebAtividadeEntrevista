using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public long Incluir(List<DML.Beneficiario> beneficiario)
        {
            DAL.Beneficiario.DaoBeneficiario benef = new DAL.Beneficiario.DaoBeneficiario();
            return benef.Incluir(beneficiario);
        }
        public DML.Beneficiario Consultar(string CPF)
        {
            DAL.Beneficiario.DaoBeneficiario benef = new DAL.Beneficiario.DaoBeneficiario();
            return benef.Consultar(CPF);
        }

        public List<DML.Beneficiario> Pesquisa( long ID)
        {
            DAL.Beneficiario.DaoBeneficiario cli = new DAL.Beneficiario.DaoBeneficiario();
            return cli.Pesquisa( ID);
        }

        public void Exclui( long IDCliente)
        {
            DAL.Beneficiario.DaoBeneficiario benef = new DAL.Beneficiario.DaoBeneficiario();
            benef.Exclui(IDCliente);
        }
    }
}
