#VTEX - Google Remarketing tag
>*Extensões da plataforma VTEX são plugins criados por desenvolvedores de interface ou pelo VTEX Lab (Laboratório de Inovações da VTEX) que podem ser inseridas em sua loja. Existem extensões gratuitas com código aberto -  Open Source - e extensões pagas.  Indicamos que a instalação seja realizada pelos profissionais e empresas certificados pela VTEX. Vale ressaltar que qualquer profissional de CSS, JavaScript e HTML pode também executar esta tarefa.*

----------

Este script tem a finalidade de auxiliar a implantação da tag de Remarketing do Google.

Todas as dicas necessárias para customização do script e seus valores estão ao decorrer do código na forma de comentários.

##Instalação
Faça o upload para o "Gerenciador do portal" no "Vtex Admin" dos seguintes arquivos:
* TAGs.js

O script pode se chamado de duas formas, através de tag HTML ou AJAX.
```html
<!-- Em HTML -->
<script type="text/javascript" src="/arquivos/TAGs.js"></script>
```
```javascript
// Em JavaScript com AJAX
$(function(){
	$.getScript("/arquivos/TAGs.js");
});
```