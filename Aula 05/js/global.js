/* JAVASCRIPT USADO EM TODO O SITE */
/*
    Neste documento estÃ£o os JavaScript que atendem Ã  todas ou a mais de uma seÃ§Ã£o.
    Aqui tambÃ©m estÃ£o funÃ§Ãµes que podem ser utilizadas em mais de uma seÃ§Ã£o do site.
*/

/* FUNÃ‡Ã•ES GLOBAIS USADAS EM QUALQUER PÃGINA QUANDO NECESSÃRIO */

/* A funÃ§Ã£o '$' Ã© um atalho para 'document.getElement*()' */
function $(objSelector, objListIndex = false){
    if(objListIndex) // Se selecionou um Ã­ndice de uma lista de objetos (o Ã­ndice Ã© um inteiro >= 0)
        return document.querySelectorAll(objSelector)[objListIndex];
    else if(objSelector.substr(0, 1) != '#') // VÃ¡rios objetos podem usar a mesma classe, mesmo nome, etc.
        return document.querySelectorAll(objSelector);
    else // Objetos referenciados pelo ID sÃ£o Ãºnicos
        return document.querySelector(objSelector);
}

// FunÃ§Ã£o padrÃ£o para 'sanitizar' os valores dos campos de formulÃ¡rio
function sanitiza(texto) { 
	// Limpa espaÃ§os antes e depois da string
	texto = texto.trim();

	// Limpa espaÃ§os duplicados dentro da string
	while(texto.indexOf('  ') != -1) // 'TRUE' enquanto ocorrerem espaÃ§os duplos
		texto = texto.replace('  ', ' '); // Troca espaÃ§os duplos por simples

	// Altera caracteres indesejados (usando expressÃ£o regular) pelo 'HTML entitie' equivalente
	texto = texto.replace(/&/g, '&amp;'); /* Caractere '&' */
	texto = texto.replace(/</g, '&lt;'); /* Caractere '<' */
	texto = texto.replace(/>/g, '&gt;'); /* Caractere '>' */
	texto = texto.replace(/"/g, '&quot;'); /* Caractere '"' */

	// Retorna string 'limpa'
	return texto;
}

// FunÃ§Ã£o para validar somente letras em campos de formulÃ¡rios (usando expressÃ£o regular e match())
function soLetras(texto) { 
    if(texto.match(/[^a-zÃ -Ãº ]/gi))
        return false;
    return true;
}

// FunÃ§Ã£o para validar um endereÃ§o de e-mail(usando expressÃ£o regular e match())
function isMail(texto) { 
    if(texto.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}$/))
        return true;
	return false;
}