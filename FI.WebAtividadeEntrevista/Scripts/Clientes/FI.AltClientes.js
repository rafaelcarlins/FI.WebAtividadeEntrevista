

$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

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
                "CPF": $(this).find("#CPF").val(),
                "ListaBeneficiarios": recuperarLista()
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
                window.location.href = urlRetorno;
            }
        });
    })


    BuscarListaBeneficiario();
    
})

function BuscarListaBeneficiario() {

    var ID = urlPost.replace(/^\D+/g, '');
    $.ajax({

        type: "POST",
        url: "../BenefList",
        data: JSON.stringify({ ID: ID}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success:
            function (data) {
                MontarGridBeneficiario(data);
            }

    })

}
function MontarGridBeneficiario(Lista) {

    var d = document;

    var newRow = d.createElement('tr');
    var contLinhas;
    var table = d.getElementById('gridBeneficiarios');
    if (table.rows.length > 0) {
        contLinhas = table.rows.length;
        for (var i = 0; i < contLinhas; i++) {
            d.getElementById('gridBeneficiarios').deleteRow(0);
        }
    }
    newCol = d.createElement('tr');
    newCol.insertCell(0).innerHTML = "CPF";
    newCol.insertCell(1).innerHTML = "Nome";


    d.getElementById('gridBeneficiarios').appendChild(newCol);
    for (var i = 0; i < Lista.Records.length; i++) {
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
        newRow.insertCell(0).innerHTML = Lista.Records[i].CPF;
        newRow.insertCell(1).innerHTML = Lista.Records[i].Nome;
        newBtnAlterar.innerHTML = "Alterar";
        newBtnDeletar.innerHTML = "Deletar";

        newRow.appendChild(newBtnAlterar);
        newRow.appendChild(newBtnDeletar);
        d.getElementById('gridBeneficiarios').appendChild(newRow);
        newRow = d.createElement('tr');
        newCol = d.createElement('tr');
        newBtnAlterar = d.createElement('Button');
        newBtnDeletar = d.createElement('Button');
        newBtnAlterar.setAttribute("class", "btn btn-link");
        newBtnDeletar.setAttribute("class", "btn btn-danger delete");
    }

    salvarLista(Lista.Records);
    
}

function salvarLista(Lista) {
    try {
        if (Lista.length > 0 ) {
            for (var i = 0; i < Lista.length; i++) {
                //localStorage.clear();
                localStorage.setItem('ListaBeneficiario', JSON.stringify(Lista))
            }
        }
        else {
            localStorage.clear();
        }
        
    } catch (e) {

    }
}

function recuperarLista() {

    return  data = JSON.parse(localStorage.getItem('ListaBeneficiario'))
}
function ExcluirBeneficiario(index) {
    var d = document;
    var table = d.getElementById('gridBeneficiarios');
    if (table.rows.length > 0) {
       d.getElementById('gridBeneficiarios').deleteRow(index);
    }


    var List;
    var table = document.getElementById('gridBeneficiarios');

    var listOfObjects = [];

    if (table.rows.length > 0) {
        contLinhas = table.rows.length;
        for (var i = 1; i < contLinhas; i++) {
            CPFBenef = d.getElementById('gridBeneficiarios').rows[i].cells[0].innerText;
            NomeBenef = d.getElementById('gridBeneficiarios').rows[i].cells[1].innerText;
            List = { "Nome": NomeBenef, "CPF": CPFBenef, "IdCliente": urlPost.replace(/^\D+/g, '') };
            listOfObjects.push(List);
        }

    }

    salvarLista(listOfObjects);
}

function AlterarBeneficiario(index) {

    var d = document;

    var table = d.getElementById('gridBeneficiarios');
    if (table.rows.length > 0) {
        var CPF = d.getElementById('gridBeneficiarios').rows[index].cells[0].innerHTML;
        var Nome = d.getElementById('gridBeneficiarios').rows[index].cells[1].innerHTML;
        d.getElementById('gridBeneficiarios').deleteRow(index);
    }

    d.getElementById('CPFBeneficiario').value = CPF;
    d.getElementById('NomeBeneficiario').value = Nome;
    
    
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