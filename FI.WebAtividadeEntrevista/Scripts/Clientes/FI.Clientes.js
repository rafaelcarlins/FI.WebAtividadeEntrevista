
$(document).ready(function () {
    
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val().replace(/\D/g, '')
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                }
        });
        
    })

    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');


}

function CadastrarBeneficiario() {

    var CPFBenef = document.getElementById("CPFBeneficiario").value;
    var NomeBenef = document.getElementById("NomeBeneficiario").value;
    var Id = urlPost.replace(/^\D+/g, '');
    var obj = {};

    

    obj["CPFBeneficiario"] = CPFBenef;
    obj["NomeBeneficiario"] = NomeBenef;
    obj["IdCliente"] = Id;

    $.ajax({

        type: "POST",
        url: "../IncluirBeneficiario",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Beneficiário cadastrado com sucesso!", r)
                MontarGridBeneficiario(r.Records.Data);


            }

    })

}
//function validarCPF(cpf) {

//    cpf = cpf.replace(/\D/g, '');
//    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
//    var result = true;
//    [9, 10].forEach(function (j) {
//        var soma = 0, r;
//        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
//            soma += parseInt(e) * ((j + 2) - (i + 1));
//        });
//        r = soma % 11;
//        r = (r < 2) ? 0 : 11 - r;
//        if (r != cpf.substring(j, j + 1)) result = false;
//    });

//    return result;

//}

//function fMasc(objeto, mascara) {
//    obj = objeto
//    masc = mascara
//}

//function fMascEx() {
//    obj.value = masc(obj.value)
//}

//function mCPF(cpf) {
//    cpf = cpf.replace(/\D/g, "")
//    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
//    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
//    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
//    return cpf
//}

function is_cpf(c) {

    if ((c = c.replace(/[^\d]/g, "")).length != 11)
        return false

    if (c == "00000000000")
        return false;

    var r;
    var s = 0;

    for (i = 1; i <= 9; i++)
        s = s + parseInt(c[i - 1]) * (11 - i);

    r = (s * 10) % 11;

    if ((r == 10) || (r == 11))
        r = 0;

    if (r != parseInt(c[9]))
        return false;

    s = 0;

    for (i = 1; i <= 10; i++)
        s = s + parseInt(c[i - 1]) * (12 - i);

    r = (s * 10) % 11;

    if ((r == 10) || (r == 11))
        r = 0;

    if (r != parseInt(c[10]))
        return false;
    return true;
}


function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

cpfCheck = function (el) {
    document.getElementById('cpfResponse').innerHTML = is_cpf(el.value) ? document.getElementById("btnCadastrar").disabled = false : document.getElementById("btnCadastrar").disabled = true;
    if (el.value == '') document.getElementById('cpfResponse').innerHTML = '';
}
function AdicionarGridBeneficiario() {
    var d = document;
    var newRow = d.createElement('tr');

    var CPFBenef = d.getElementById('CPFBeneficiario').value;
    if (!is_cpf(CPFBenef)) {
        ModalDialog("Ocorreu um erro", "CPF Inválido");
        return;
    }
    if (!CPFIncluido(CPFBenef)) {
        ModalDialog("Ocorreu um erro", "CPF já cadastrado");
        return;
    }
    var NomeBenef = d.getElementById('NomeBeneficiario').value;

    newRow.insertCell(0).innerHTML = CPFBenef;
    newRow.insertCell(1).innerHTML = NomeBenef;

    var newBtnAlterar = d.createElement('Button');
    newBtnAlterar.setAttribute("class", "btn btn-link");
    newBtnAlterar.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.innerHTML == "Alterar") {
            AlterarBeneficiario(target.parentNode.rowIndex);
            e.preventDefault();
        }
        else {
            e.preventDefault();
        }
    };
    var newBtnDeletar = d.createElement('Button');
    newBtnDeletar.setAttribute("class", "btn btn-danger delete");
    newBtnDeletar.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.innerHTML == "Deletar") {
            if (confirm('Deseja realmente excluir?')) {
                ExcluirBeneficiario(target.parentNode.rowIndex);
                e.preventDefault();
            }
            else {
                e.preventDefault();
            }
        }
    };

    newBtnAlterar.innerHTML = "Alterar";
    newBtnDeletar.innerHTML = "Deletar";

    newRow.appendChild(newBtnAlterar);
    newRow.appendChild(newBtnDeletar);
    d.getElementById('gridBeneficiarios').appendChild(newRow);

    var List;
    var table = document.getElementById('gridBeneficiarios');

    var listOfObjects = [];

    if (table.rows.length > 0) {
        contLinhas = table.rows.length;
        for (var i = 1; i < contLinhas; i++) {
            CPFBenef = document.getElementById('gridBeneficiarios').rows[i].cells[0].innerText;
            NomeBenef = document.getElementById('gridBeneficiarios').rows[i].cells[1].innerText;
            List = { "Nome": NomeBenef, "CPF": CPFBenef, "IdCliente": urlPost.replace(/^\D+/g, '') };
            listOfObjects.push(List);
        }

    }

    salvarLista(listOfObjects);
}
function CPFIncluido(CPF) {
    var table = document.getElementById('gridBeneficiarios');
    if (table.rows.length > 0) {
        contLinhas = table.rows.length;
        for (var i = 1; i < contLinhas; i++) {
            var CPFTabela = document.getElementById('gridBeneficiarios').rows[i].cells[0].innerText;
            if (CPFTabela == CPF) {
                return false;
            }
        }
        
    }
    return true;
}