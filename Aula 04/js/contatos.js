/* FUNÇÕES */
function $(objId){
    return document.getElementById(objId);
}

// Função padrão para 'sanitizar' os valores dos campos
function sanitiza(texto) { 
	// Limpa espaços antes e depois da string
	texto = texto.trim();

	// Limpa espaçs duplicados dentro da string
	while(texto.indexOf('  ') != -1) { 
		texto = texto.replace('  ', ' ');
	}

	// Altera caracteres indesejados(usando expressÃ£o regular) 
	texto = texto.replace(/&/g, '&amp;'); /* Caractere '&' */
	texto = texto.replace(/</g, '&lt;'); /* Caractere '<' */
	texto = texto.replace(/>/g, '&gt;'); /* Caractere '>' */
	texto = texto.replace(/"/g, '&quot;'); /* Caractere '"' */

	// Retorna string 'limpa'
	return texto;
}

// Função para validar somente letras (usando expressão regular e match())
function soLetras(texto) { 
    if(texto.match(/[^a-zà-ú ]/gi)){
        return false;
    }
    return true;
}

// Função para validar um endereço de e-mail(usando expressão regular e match())
function isMail(texto) { 
	if(texto.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}$/)) {
		return true;
	}
	return false;
}

/* VALIDANDO FORMULÃRIO DE CONTATOS */

/* REFERÊNCIAS */
var form = $('contatos'); // Formulário
var errocaixa = $('errocaixa'); // Caixa de erros
var erromsg = $('erromsg'); // Mensagem de erro
var errofecha = $('errofecha'); // Botão fechar erros
var feedback = $('feedback'); // Mensagem de agradecimento
var toggleNome = $('toggleNome');

toggleNome.onclick = function(){
    $('ajudaNome').style.display = 'block';
}

$('toggleEmail').onclick = function(){
    $('ajudaEmail').style.display = 'block';
}

$('toggleAssunto').onclick = function(){
    $('ajudaAssunto').style.display = 'block';
}

$('toggleMensagem').onclick = function(){
    $('ajudaMensagem').style.display = 'block';
}

form.onsubmit = function() {

    // Variável que armazena as mensagens de erro
    var erro = '';
    
    // Variável que contém o feedback do erro
    var out = '';

    // Campos do formulário
    var nome = sanitiza($('contato_nome').value);
    var email = sanitiza($('contato_email').value);
    var assunto = sanitiza($('contato_assunto').value);
    var mensagem = sanitiza($('contato_mensagem').value);

    // Atualizando os campos do formulário com dados sanitizados
    $('contato_nome').value = nome;
    $('contato_email').value = email;
    $('contato_assunto').value = assunto;
    $('contato_mensagem').value = mensagem;

	// Validando nome
	if (nome.length < 3) {
		erro += '<li>Seu nome está muito curto.</li>';
	} else if (!soLetras(nome)) {
		erro += '<li>Seu nome tem caracteres inválidos.</li>';
	}

	// Validando e-mail
	if (email.indexOf('@') < 1) {
        erro += '<li>Seu e-mail não é válido.</li>';
    } else if (!isMail(email)) {
        erro += '<li>Seu e-mail não é válido.</li>';
    }

    // Validando assunto com pelo menos 5 caracteres
    if(assunto.length < 5){
        erro += '<li>O assunto está muito curto.</li>';
    };

    // Validando mensagem com pelo menos 5 caracteres
    if(mensagem.length < 5){
        erro += '<li>A mensagem está muito curta.</li>';
    };  

    if(erro == ''){
        var nomes = nome.split(' ');
        console.log(nomes);
        out += '<h3>Olá ' + nomes[0] + '!</h3>';
        out += '<blockquote>Seu contato foi enviado para a equipe do site.</blockquote>';
        out += '<p><i>Obrigado...</i></p>';
        out += '<p class="text-center"><a href="JavaScript:history.go(0)">&larr; Voltar</a></p>';

        feedback.innerHTML = out; // Escreve a mensagem na DIV
        form.style.display = 'none'; // Oculta o formulário
        feedback.style.display = 'block'; // Mostra a DVI

        return true;
    } else {
        out += '<big><strong>Oooops!</strong></big>';
        out += '<p>Ocorreram erros que impedem o envio do contato.</p>';
        out += '<ul>' + erro + '</ul>';
        out += '<p>Por favor, corrija e tente novamente...</p>';

        erromsg.innerHTML = out;
        errocaixa.style.display = 'table';
    }
    return false;
}

// Fecha caixa de mensagem
errofecha.onclick = function(){
    errocaixa.style.display = 'none';
}

/* AJUDA DO FORMULÁRIO */
/*
// Função que exibe a mensagem de ajuda
function exibeAjuda(objId) {
    var ajudas = document.getElementsByClassName('ajudaMsg');
 
    // Fecha todas as ajudas
    for(a = 0; a < ajudas.length; a ++){
        ajudas[a].style.display = 'none';
    }

    $(objId).style.display = 'block'
}

// Ações
$('toggleNome').onclick = function(){
    exibeAjuda('ajudaNome');
}
$('toggleEmail').onclick = function(){
    exibeAjuda('ajudaEmail');
}
$('toggleAssunto').onclick = function(){
    exibeAjuda('ajudaAssunto');
}
$('toggleMensagem').onclick = function(){
    exibeAjuda('ajudaMensagem');
}*/