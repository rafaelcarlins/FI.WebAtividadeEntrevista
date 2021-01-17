using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FI.AtividadeEntrevista.DML;

namespace FI.AtividadeEntrevista.DAL.Beneficiario
{
    internal class DaoBeneficiario : AcessoDados
    {
        internal long Incluir(List<DML.Beneficiario> beneficiario)
        {

            
            DataSet ds = new DataSet();
            for (int i = 0; i < beneficiario.Count; i++)
            {
                List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
                parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", beneficiario[i].Nome));
                parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", beneficiario[i].CPF));
                parametros.Add(new System.Data.SqlClient.SqlParameter("IdCliente", beneficiario[i].IdCliente));


                 ds = base.Consultar("FI_SP_IncBenef", parametros);
                
            }

            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);
            return ret;
        }
        internal DML.Beneficiario Consultar(string CPF)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
            
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", CPF));

            DataSet ds = base.Consultar("FI_SP_ConsBenef", parametros);
            List<DML.Beneficiario> benef = Converter(ds);

            return benef.FirstOrDefault();
        }

        private List<DML.Beneficiario> Converter(DataSet ds)
        {
            List<DML.Beneficiario> lista = new List<DML.Beneficiario>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.Beneficiario benef = new DML.Beneficiario();
                    benef.CPF = row.Field<string>("CPF");
                    benef.IdCliente = row.Field<long>("IDCLIENTE");
                    benef.Nome = row.Field<string>("NOME");
                    lista.Add(benef);
                }
            }

            return lista;
        }

        internal void Exclui( long IDCliente)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", IDCliente));
            base.Executar("FI_SP_DeleteBenef", parametros);
        }
        internal List<DML.Beneficiario> Pesquisa(  long ID)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", ID));
            DataSet ds = base.Consultar("FI_SP_ConsBenefCliente", parametros);
            List<DML.Beneficiario> benef = Converter(ds);

            int iQtd = 0;

            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                int.TryParse(ds.Tables[1].Rows[0][0].ToString(), out iQtd);

            

            return benef;
        }
    }
}
