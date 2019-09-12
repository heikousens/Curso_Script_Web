/* JAVASCRIPT USADO EXCLUSIVAMENTE PARA O FORMULÃRIO DE CONTATOS DO SITE */
/*
    IMPORTANTE!
    Este documento depende de 'global.js'. No HTML, carregue 'global.js' antes de carregar este arquivo.
*/

/* VALIDANDO FORMULÃRIO DE CONTATOS */

/* REFERÃŠNCIAS */
var form = $('#contatos'); // FormulÃ¡rio
var errocaixa = $('#errocaixa'); // Caixa de erros
var erromsg = $('#erromsg'); // Mensagem de erro
var feedback = $('#feedback'); // Mensagem de agradecimento

form.onsubmit = function() {

    // Desabilita botÃ£o de envio para evitar mais de um click nele
    $('#contato_enviar').disabled = true;

    // VariÃ¡vel que armazena as mensagens de erro
    var erro = '';
    
    // VariÃ¡vel que contÃ©m o feedback do erro
    var out = '';

    // Campos do formulÃ¡rio
    var nome = sanitiza($('#contato_nome').value);
    var email = sanitiza($('#contato_email').value);
    var assunto = sanitiza($('#contato_assunto').value);
    var mensagem = sanitiza($('#contato_mensagem').value);

    // Atualizando os campos do formulÃ¡rio com dados sanitizados
    $('#contato_nome').value = nome;
    $('#contato_email').value = email;
    $('#contato_assunto').value = assunto;
    $('#contato_mensagem').value = mensagem;

	// Validando nome
	if (nome.length < 3) {
		erro += '<li>Seu nome estÃ¡ muito curto.</li>';
	} else if (!soLetras(nome)) {
		erro += '<li>Seu nome tem caracteres invÃ¡lidos.</li>';
	}

	// Validando e-mail
	if (email.indexOf('@') < 1) {
        erro += '<li>Seu e-mail nÃ£o Ã© vÃ¡lido.</li>';
    } else if (!isMail(email)) {
        erro += '<li>Seu e-mail nÃ£o Ã© vÃ¡lido.</li>';
    }

    // Validando assunto com pelo menos 5 caracteres
    if(assunto.length < 5){
        erro += '<li>O assunto estÃ¡ muito curto.</li>';
    };

    // Validando mensagem com pelo menos 5 caracteres
    if(mensagem.length < 5){
        erro += '<li>A mesagem estÃ¡ muito curta.</li>';
    };  

    if(erro == ''){
        // Quebra o nome em um array (nomes[0], nomes[1], nomes[2]...)
        var nomes = nome.split(' ');
        // nomes[0] contÃ©m o primeiro nome sempre
        out = `<h3>OlÃ¡ ${nomes[0]}!</h3>
                <blockquote>Seu contato foi enviado para a equipe do site.</blockquote>
                <p><i>Obrigado...</i></p>
                <p class="text-center"><a href="JavaScript:history.go(0)">&larr; Voltar</a></p>
        `;
        feedback.innerHTML = out; // Escrevo a mensagem na DIV
        form.style.display = 'none'; // Oculto o formulÃ¡rio
        feedback.style.display = 'block'; // Mostro a DVI
        return true; // Sai e envia o formulÃ¡rio
    } else {
        out = `<big><strong>Oooops!</strong></big>
                <p>Ocorreram erros que impedem o envio do contato.</p>
                <ul>${erro}</ul>
                <p>Por favor, corrija e tente novamente...</p>
        `;
        erromsg.innerHTML = out; // Escrevo a mensagem na DIV
        errocaixa.style.display = 'table'; // Mostro a DVI
    }
    // Reabilita botÃ£o de envio
    $('#contato_enviar').disabled = false;
    return false; // Sai sem enviar o formulÃ¡rio
}

// Fecha caixa de mensagem
errocaixa.onclick = function(){
    errocaixa.style.display = 'none';
}

/* AJUDA DO CONTEXTO DOS CAMPOS DO FORMULÃRIO */

// FunÃ§Ã£o que exibe a mensagem de ajuda do contexto
function toggleAjuda(objId) {
    var ajudas = $('.ajudaMsg');

    // Se a ajuda jÃ¡ estÃ¡ visÃ­vel, simplesmente oculta ela
    if ($(objId).style.display === "block")
        exibe = false;
    else
        exibe = true;

    // Fecha todas as ajudas
    for(a = 0; a < ajudas.length; a ++){
        ajudas[a].style.display = 'none';
    }

    // SÃ³ mostra se ele estiver
    if (exibe) {
        $(objId).style.display = "block";
    }
}

// Monitora click na ajuda do contexto
$('#toggleNome').onclick = function(){
    toggleAjuda('#'+this.getAttribute('data-target'));
}
$('#toggleEmail').onclick = function(){
    toggleAjuda('#'+this.getAttribute('data-target'));
}
$('#toggleAssunto').onclick = function(){
    toggleAjuda('#'+this.getAttribute('data-target'));
}
$('#toggleMensagem').onclick = function(){
    toggleAjuda('#'+this.getAttribute('data-target'));
} 