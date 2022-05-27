# testeCSJ - Pontos de reciclagem
Este projeto tem como finalidade mostrar minhas capacidades com desenvolvimento em REACT e NODE JS

## Descrição do projeto
A secretaria de Meio-Ambiente da cidade de São José dos Campos precisa gerenciar todos os locais de reciclagem conhecidos na cidade, para prestação de contas ao estado de São Paulo.
Eles possuem uma listagem de todos os endereços já conhecidos em Excel com as respectivas capacidades de armazenamento em metros cúbicos, portanto, está listagem deve estar disponível em um sistema Web aos responsáveis da área, como também, a possibilidade desta base ser atualizada na própria ferramenta de gestão, possibilitando a inclusão de novos pontos de reciclagem, modificação de endereço, ou, até a remoção dos mesmos.

## Prototipação
A prototipação deste projeto foi feito no figma e através do link abaixo pode ser visualizada
https://www.figma.com/file/WMpftrnFtmNOkUH6ew2DMb/Teste-CSJ?node-id=0%3A1
## Tecnologias usadas

A partir da ideia do projeto decidi fazer uso do backend em node js com expres e sequelize usando o postgres sql como banco de dados principa onde construi a tabela de LocaisReciclagem utilizando o sequelize para facilitar o uso e também fiz uso do axios para me comunicar com a API do google a qual utilizei o geocoder para fazer as pesquisas dos endereços para pegar a longitude e latitude de cada um deles.
Já na parte do frontend foi utilizado o react js, com um pouco de styled-components a biblioteca de ícones react-icons, a biblioteca para usar mapas react-leaflet e a biblioteca de alertas estilizados sweetalert2.

## Resultado final
Tela inicial

<img src="https://raw.githubusercontent.com/nobertof/testeCSJ/main/gitImages/TelaInicial.png" width="600" title="hover text">

Estilo feito para quando ocorre o evento de clique em algum dos pontos 

<img src="https://github.com/nobertof/testeCSJ/blob/main/gitImages/estiloDosPontos.png?raw=true" width="600" title="hover text">

Tela para criação de um novo ponto no mapa

<img src="https://github.com/nobertof/testeCSJ/blob/main/gitImages/telaDeCriacao.png?raw=true" width="600" title="hover text">

Tela para edição de algum ponto do mapa

<img src="https://github.com/nobertof/testeCSJ/blob/main/gitImages/telaDeEdicao.png?raw=true" width="600" title="hover text">

Nas duas telas anteriores ocorre a validação de cada campo do formulario

<img src="https://github.com/nobertof/testeCSJ/blob/main/gitImages/tratamentoDeErrosNoFormulario.png?raw=true" width="600" title="hover text">

E o projeto também foi feito pensando na acessibilidade por meio de outros tipos de dispositivos além de computadores

<img src="https://github.com/nobertof/testeCSJ/blob/main/gitImages/responsividade1.png?raw=true" width="600" title="hover text">

<img src="https://github.com/nobertof/testeCSJ/blob/main/gitImages/responsividade2.png?raw=true" width="600" title="hover text">

<img src="https://github.com/nobertof/testeCSJ/blob/main/gitImages/responsividade3.png?raw=true" width="600" title="hover text">
