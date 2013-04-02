/**
*	Script para auxiliar a implantação do Google Remarketing
*	@author Carlos Vinicius
*	@version 1.0
*	@date 2012-11-07
*/

$(function(){
	// A partir deste momento a árvore DOM já carregada, use-a a vontade

	// Iniciando variáveis do plugin
	var v={},_ET,tmp,exec=true,fn,debug;
		
	// Definindo valor padrão para o tipo de página
	_ET=$("body").attr("class").split(" ").shift();
	
	
	/*
	* CUSTOMIZAÇÃO DA TAG DE ACORDO COM O BODY CLASS
	*/
	// Neste ponto são criadas as variáveis/objetos com os valores dinâmicos de acordo com cada página.
	// Os valores serão transmitidos para as variáveis customizadas do Google na seção de "Informações da Tag" que se encontra mais abaixo
	// Para os valores que não forem defindos serão aplicados os valores padrão de cada variável/objeto
	
	// Exemplo: Definindo o tipo de página para a home do site
	if($("body").hasClass("home"))
		v.et="home";
	// Exemplo: Definindo o tipo de página e a categoria do produto para departamento, categoria e busca
	else if($("body.departamento,body.categoria,body.resultado-busca").length)
	{
		v.et="categoria";
		v.pcat=[];
		$(".bread-crumb li:not(:first)").each(function(){
			v.pcat.unshift($(this).text().trim());
		});
	}
	// Exemplo: Definindo valores para as variáveis customizadas na tela de produto
	else if($("body.produto").length)
	{
		v.et="Produto";
		v.prodId=[$("[currentproductid]:first").attr("currentproductid")];
		v.pname=[$(".productName:first").text()];
		v.pcat=[$(".bread-crumb li:eq(1)").text()];
		v.pvalues=[$(".skuBestPrice").text().replace(/R\$ */,"").replace(".","").replace(",",".")];
	}
	// Exemplo: Definindo valores na página de carrinho
	else if($("body.carrinho").length)
	{
		v.pname=[]; 
		$("td.produto h4 a").each(function(){v.pname.push($(this).text());});
		
		v.pvalues=[]; 
		$("td.preco-unitario span:first-child").each(function(){v.pvalues.push($(this).text().replace(/R\$ */,"").replace(".","").replace(",","."));});

		v.et="Carrinho";
	}
	// Exemplo: tela de confirmação de compra
	else if($("body.checkout.finaliza-compra").length)
	{
		v.et="purchase";
		v.orderId=$(".order-number strong").text();
	}	


	/*
	* INFORMAÇÕES DA TAG
	*/
	// Variáveis de configuração. (essas informações são obtidas ao criar a tag no Google)
	// Não altere os nomes dessas variáveis
	window.google_conversion_id = 123456789; // Altere para o id da sua tag
	window.google_conversion_label = "xxxxxxxx-XXXXX"; // Altere para o "label" da sua tag
	window.google_remarketing_only = true;
	// Variáveis customizadas. Configure as chaves de acordo com suas configurações ao criar a tag
	window.google_custom_params =
	{
		// - Dentro desse osbjeto as chaves e os valores podem ser alterados conforme a necessidade.
		// - Entendendo a estrutura das chaves:
		// 	- "prodId" é uma chave do objeto "google_custom_params"
		// 	- "v.prodId" é uma chave do objeto "v" que possui o valor que será associado a chave do "google_custom_params",
		// 	  ou seja é esse valor que será enviado ao Google como tag customizada.
		// 	  Caso "v.prodId" não tenha sido criado será enviado o valor padrão (também fornecido ao criar a tag) da variável que pode ser um Array, String e etc.
		
		prodId:(typeof v.prodId!=="undefined")?v.prodId:[''],
		pname:(typeof v.pname!=="undefined")?v.pname:[''],
		pcat:(typeof v.pcat!=="undefined")?v.pcat:[''],
		pvalues:(typeof v.pvalues!=="undefined")?v.pvalues:[''],
		et:(typeof v.et!=="undefined")?v.et:_ET,
		orderId:(typeof v.orderId!=="undefined")?v.orderId:'',
		g:(typeof v.g!=="undefined")?v.g:'',
		age:(typeof v.age!=="undefined")?v.age:''
	};

	
	/*
	* ### NÃO ALTERAR NADA A PARTIR DAQUI ###
	*/
	
	// Ferramenta de Debug
	debug=function(a,b){"object"==typeof console&&-1<document.location.href.toLowerCase().indexOf("debugtag")&&("string"===typeof a?console.log("[debug]["+extTitle+" - "+(b||"Erro")+"] "+a):console.log(a))};

	// Esta função é responsável pela requisição assíncrona do código do Google
	fn=function()
	{
		if("function"===typeof google_trackConversion)
			google_trackConversion();
		else
			$.ajax({
				url: document.location.protocol+"//www.googleadservices.com/pagead/conversion_async.js",
				dataType: "script",
				success: function(){ if("function"===typeof google_trackConversion) google_trackConversion();}
			});
	};
	
	// Debug: imprimindo as variáveis customizadas
	debug(google_custom_params);
	
	// Chamando a função que executa o código do Google
	if(exec) fn();
});