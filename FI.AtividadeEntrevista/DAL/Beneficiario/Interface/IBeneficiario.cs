using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DAL.Clientes.Interface
{
    public interface ICliente
    {
        bool BuscarBeneficiarios(int cpf);
    }
}
