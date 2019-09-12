<?php
/* PROCESSADOR DO FORMULÁRIO NO BACKEND - SÓ UM EXEMPLO TOSCO */
// Serviço que recebe os dados do formulário de contatos

// Seta fuso horário para UTC (Brasilia = UTC -3)
date_default_timezone_set('Etc/UTC');

// O trecho abaixo recebe os dados do formulário e os sanitiza
$fields['nome'] = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
$fields['email'] = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$fields['assunto'] = filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_SPECIAL_CHARS);
$fields['mensagem'] = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_SPECIAL_CHARS);

// O trecho abaixo armazena os dados do contato em um banco de dados sequêncial

// Formata os dados para o banco de dados
$formData = "~~~~~~~~~~ Contato enviado em " . date('d/m/Y H:i') . " UTC ~~~~~~~~~~\n";
foreach($fields as $campo => $valor)
    $formData .= "\t{$campo}: {$valor}\n"; 

// Tenta gravar no banco de dados sequencial
if(file_put_contents('contatos.txt', $formData."\n", FILE_APPEND | FILE_TEXT)) // Sucesso
    $out = 'sucesso';
else // Falha
    $out = 'falhou';

// Retorna uma resposta simples para a página ('sucesso' ou 'falha')
echo $out;
?>