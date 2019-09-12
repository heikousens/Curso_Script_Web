/* JAVASCRIPT USADO EXCLUSIVAMENTE PARA A PÃGINA DE CONTATOS DO SITE */
/*
    VersÃ£o 2.0 - AssÃ­ncrono
    IMPORTANTE!
    Este documento depende de 'global.js'. No HTML, carregue 'global.js' antes de carregar este arquivo.
*/

/* VALIDANDO FORMULÃRIO DE CONTATOS */

// Monitora o formulÃ¡rio, aguardando um 'submit'
$('#contatos').addEventListener('submit', function(){

    // Evita que formulÃ¡rio seja enviado pelo HTML
    event.preventDefault();

    // Desabilita botÃ£o de envio para evitar mais de um click nele
    $('#contato_enviar').disabled = true;
    
    // Mostra modal spinner de processamento
    $('#spinner').style.visibility = 'visible';

    // VariÃ¡vel que armazena as mensagens de erro
    var erro = '';
    
    // VariÃ¡vel para formatar mensagens de saÃ­da em HTML
    var out = '';

    // ObtÃ©m campos do formulÃ¡rio
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
        // Preparando dados para envio por Ajax
        var formData = `nome=${nome}&email=${email}&assunto=${assunto}&mensagem=${mensagem}`;

        // Prepara requisiÃ§Ã£o por Ajax
        var ajax = new XMLHttpRequest();

        // Seta tipo de requisiÃ§Ã£o: Post e a URL da API que receberÃ¡ os dados e responderÃ¡
        ajax.open("POST", "processa.php", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Seta dados do formulÃ¡rio e envia a requisiÃ§Ã£o
        ajax.send(formData);

        // Cria um evento para receber o retorno de forma assÃ­ncrona.
        ajax.onreadystatechange = function() {
            // Caso o state seja 4 e o http.status seja 200, Ã© porque a requisiÃ§Ãµe acabou.
            if (ajax.readyState == 4 && ajax.status == 200) {
                var dataResponse = ajax.responseText;
                // Retorno do Ajax. Se deu tudo certo, retorna 'sucesso'.
                if(dataResponse == 'sucesso') {
                    // Quebra o nome em um array (nomes[0], nomes[1], nomes[2]...)
                    var nomes = nome.split(' ');
                    // nomes[0] contÃ©m o primeiro nome sempre
                    out = `<h3>OlÃ¡ ${nomes[0]}!</h3>
                            <blockquote>Seu contato foi enviado para a equipe do site.</blockquote>
                            <p><i>Obrigado...</i></p>
                            <p class="text-center"><a href="JavaScript:history.go(0)">&larr; Voltar</a></p>
                    `;
                    $('#feedback').innerHTML = out; // Escreve a mensagem na DIV
                    $('#contatos').style.display = 'none'; // Oculta o formulÃ¡rio
                    $('#feedback').style.display = 'block'; // Mostra a DVI
                    $('#spinner').style.visibility = 'hidden'; // Oculta o modal spinner
                } else {
                    // Se nÃ£o retornou com 'sucesso', exibe erro.
                    out = `<big><strong>Oooops!</strong></big>
                    <p>Ocorreram erros que impedem o envio do contato.</p>
                    <ul><li>Erro interno do servidor.</li></ul>
                    <p>A equipe do site jÃ¡ foi avisada deste erro e estÃ¡ verificando.</p>
                    <p>Por favor, tente novamente mais tarde...</p>
                    `;
                    $('#erromsg').innerHTML = out; // Escrevo a mensagem na DIV
                    $('#errocaixa').style.display = 'table'; // Mostro a DVI
                }
            }
        }
    } else {
        out = `<big><strong>Oooops!</strong></big>
                <p>Ocorreram erros que impedem o envio do contato.</p>
                <ul>${erro}</ul>
                <p>Por favor, corrija e tente novamente...</p>
        `;
        $('#erromsg').innerHTML = out; // Escreve a mensagem na DIV
        $('#errocaixa').style.display = 'table'; // Mostra a DVI

        // Oculta modal spinner de processamento
        $('#spinner').style.visibility = 'hidden';
    }
    // Reabilita botÃ£o de envio
    $('#contato_enviar').disabled = false;

    return false; // Sai sem enviar o formulÃ¡rio
}, false);

// Fecha caixa de mensagem
$('#errocaixa').addEventListener('click', function(){
    this.style.display = 'none';
});

/* AJUDA DO CONTEXTO DOS CAMPOS DO FORMULÃRIO */

// FunÃ§Ã£o que exibe a mensagem de ajuda do contexto
function toggleAjuda(objId) {
    var ajudas = $('.ajudaMsg');

    objId = '#'+this.getAttribute('data-target');

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

// Aciona monitor de eventos 'click' para os botÃµes de ajuda
var ajudaBtn = $(".ajudaBtn");
for (var i = 0; i < ajudaBtn.length; i++) {
    ajudaBtn[i].addEventListener('click', toggleAjuda, false);
}