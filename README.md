# testeCSJ - Pontos de reciclagem
Este projeto tem como finalidade mostrar minhas capacidades com desenvolvimento em REACT e NODE JS

## Descrição do projeto
A secretaria de Meio-Ambiente da cidade de São José dos Campos precisa gerenciar todos os locais de reciclagem conhecidos na cidade, para prestação de contas ao estado de São Paulo.
Eles possuem uma listagem de todos os endereços já conhecidos em Excel com as respectivas capacidades de armazenamento em metros cúbicos, portanto, está listagem deve estar disponível em um sistema Web aos responsáveis da área, como também, a possibilidade desta base ser atualizada na própria ferramenta de gestão, possibilitando a inclusão de novos pontos de reciclagem, modificação de endereço, ou, até a remoção dos mesmos.

## Tecnologias usadas

A partir da ideia do projeto decidi fazer uso do backend em node js com expres e sequelize usando o postgres sql como banco de dados principa onde construi a tabela de LocaisReciclagem utilizando o sequelize para facilitar o uso e também fiz uso do axios para me comunicar com a API do google a qual utilizei o geocoder para fazer as pesquisas dos endereços para pegar a longitude e latitude de cada um deles.
Já na parte do frontend foi utilizado o react js, com um pouco de styled-components a biblioteca de ícones react-icons, a biblioteca para usar mapas react-leaflet e a biblioteca de alertas estilizados sweetalert2.

## Resultado final
<img src="https://raw.githubusercontent.com/nobertof/testeCSJ/main/gitImages/TelaInicial.png" width="300" title="hover text">
