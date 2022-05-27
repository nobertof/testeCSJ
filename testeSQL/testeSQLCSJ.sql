--- Criando as tabelas do banco de dados ---
CREATE TABLE tbProdutos(
	ID SERIAL,
	Codigo varchar(20) UNIQUE,
	Descricao varchar(100),
	Grupo varchar(10),
	Preco money,
    primary key(ID)
);

CREATE TABLE tbClientes(
	CPF varchar(20) not null,
	Nome varchar(10),
	Cidade varchar(30),
	Bairro varchar(30),
	primary key(CPF)
);

CREATE TABLE tbPedidos(
	ID SERIAL PRIMARY KEY,
	Pedido varchar(20) unique,
	Data Date,
	ClienteCPF varchar(20),
	foreign key(ClienteCPF) REFERENCES tbClientes(CPF) ON DELETE SET NULL
);

CREATE TABLE tbPedidosItens(
	PedidoID int,
	ProdutoID int,
	Qtde int,
	Unitario money,
	Desconto money,
	primary key(PedidoID, ProdutoID),
	foreign key(PedidoID) references tbPedidos(ID),
	foreign key(ProdutoID) references tbProdutos(ID)
);

--- inserindo os dados ---

--- questão 1 ---
INSERT INTO tbProdutos(Codigo, Descricao, Grupo, Preco) 
VALUES ('0001','Produto Teste 01','CELULARES',30.00);

INSERT INTO tbProdutos( Codigo, Descricao, Grupo, Preco) 
VALUES ('0002','Produto Teste 02','CELULARES',35.00);

INSERT INTO tbProdutos( Codigo, Descricao, Grupo, Preco) 
VALUES ('0003','Produto Teste 03','CAPAS',40.00);

INSERT INTO tbProdutos( Codigo, Descricao, Grupo, Preco) 
VALUES ('0004','Produto Teste 04','CAPAS',45.00);

INSERT INTO tbProdutos( Codigo, Descricao, Grupo, Preco) 
VALUES ('0005','Produto Teste 05','CELULARES',50.00);

--- questão 2 ---

INSERT INTO tbClientes(CPF, Nome,Cidade,Bairro) 
VALUES ('0000001','Cliente 01', 'Cidade 01', 'Bairro 01');

INSERT INTO tbPedidos(Pedido,Data, ClienteCPF) 
VALUES ('0001','2022-05-25 20:32:20','0000001');

INSERT INTO tbPedidosItens(PedidoID,ProdutoID,Qtde, Unitario, Desconto) 
VALUES (1,1,10,30.00,0);

INSERT INTO tbPedidosItens(PedidoID,ProdutoID,Qtde, Unitario, Desconto) 
VALUES (1,2,5,35.00,0);

--- questão 3 ---

INSERT INTO tbClientes(CPF, Nome,Cidade,Bairro) 
VALUES ('0000002','Cliente 02', 'Cidade 02', 'Bairro 02');

INSERT INTO tbPedidos(Pedido,Data, ClienteCPF) 
VALUES ('0002','2021-11-12 20:43:23','0000002');

INSERT INTO tbPedidosItens(PedidoID,ProdutoID,Qtde, Unitario, Desconto) 
VALUES (2,2,10,35.00,0);

INSERT INTO tbPedidosItens(PedidoID,ProdutoID,Qtde, Unitario, Desconto) 
VALUES (2,3,10,40.00,10);

--- questão 4 --- 
SELECT cliente.CPF Cliente, cliente.Nome, cliente.Bairro, cliente.Cidade, pedido.Pedido, pedido.Data, produto.Codigo, produto.Descricao, item.Qtde, item.Unitario, (CAST(item.Qtde*item.Unitario as numeric)*(1-CAST((item.desconto/100) as numeric)) )  as totalItem
FROM tbPedidos pedido
INNER JOIN tbClientes cliente
ON pedido.ClienteCPF = cliente.CPF
INNER JOIN tbPedidosItens item
ON item.PedidoID = pedido.id
INNER JOIN tbProdutos produto
ON item.ProdutoID = produto.id
WHERE pedido.Data >= '2021-12-12 23:59:59' AND pedido.Data <= '2022-7-12 23:59:59';

--- questão 5 ---
SELECT pedido.Data, pedido.Pedido, cliente.cpf Cliente,cliente.Nome, cliente.Bairro,cliente.Cidade,sum(item.Qtde) qtdePedidos, sum(item.Unitario*item.Qtde) TotalBruto,sum((item.Unitario*(CAST(item.Desconto/100 as numeric)))*item.Qtde) totalDescontos, sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido
FROM tbPedidos pedido
INNER JOIN tbClientes cliente
ON pedido.ClienteCPF = cliente.CPF
INNER JOIN tbPedidosItens item
ON item.PedidoID = pedido.id
INNER JOIN tbProdutos produto
ON item.ProdutoID = produto.id
WHERE pedido.Data >= '2021-10-12 23:59:59' AND pedido.Data <= '2022-2-12 23:59:59'
GROUP BY pedido.Data, pedido.Pedido, cliente.cpf,cliente.Nome,cliente.Bairro,cliente.Cidade;

--- questão 6 ---
SELECT pedido.Data, pedido.clienteCPF Cliente, cliente.Cidade,sum(item.Qtde) qtdePedidos, sum(item.Unitario*item.Qtde) TotalBruto,sum((item.Unitario*(CAST(item.Desconto/100 as numeric)))*item.qtde) totalDescontos, sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido
FROM tbPedidos pedido
INNER JOIN tbClientes cliente
ON pedido.ClienteCPF = cliente.CPF
INNER JOIN tbPedidosItens item
ON item.PedidoID = pedido.id
INNER JOIN tbProdutos produto
ON item.ProdutoID = produto.id
WHERE pedido.Data >= '2021-12-12 23:59:59' AND pedido.Data <= '2022-9-12 23:59:59'
GROUP BY pedido.Data, pedido.clienteCPF, cliente.Cidade;

--- questão 7 ---
SELECT  cliente.CPF Cliente, cliente.Cidade,sum(item.Qtde) qtdePedidos, sum(item.Unitario*item.Qtde) TotalBruto,sum((item.Unitario*(CAST(item.Desconto/100 as numeric)))*item.qtde) totalDescontos, sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido
FROM tbPedidos pedido
INNER JOIN tbClientes cliente
ON pedido.ClienteCPF = cliente.CPF
INNER JOIN tbPedidosItens item
ON item.PedidoID = pedido.id
INNER JOIN tbProdutos produto
ON item.ProdutoID = produto.id
WHERE pedido.Data >= '2021-10-12 23:59:59' AND pedido.Data <= '2022-9-12 23:59:59'
GROUP BY cliente;

--- questão 8 ---
SELECT cliente.Cidade,cliente.Bairro ,sum(item.Qtde) qtdePedidos, sum(item.Unitario*item.Qtde) TotalBruto,sum((item.Unitario*(CAST(item.Desconto/100 as numeric)))*item.qtde) totalDescontos, sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido
FROM tbPedidos pedido
INNER JOIN tbClientes cliente
ON pedido.ClienteCPF = cliente.CPF
INNER JOIN tbPedidosItens item
ON item.PedidoID = pedido.id
INNER JOIN tbProdutos produto
ON item.ProdutoID = produto.id
GROUP BY cliente.cidade,cliente.Bairro;

--- questão 9 ---
SELECT produto.Descricao produto, produto.Grupo ,sum(item.Qtde) qtdeVendido, sum(item.Unitario*item.Qtde) TotalBruto,sum((item.Unitario*(CAST(item.Desconto/100 as numeric)))*item.qtde) Descontos,sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido, sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde )/sum(item.Qtde) valorMedioVendas
FROM tbPedidos pedido
INNER JOIN tbClientes cliente
ON pedido.ClienteCPF = cliente.CPF
INNER JOIN tbPedidosItens item
ON item.PedidoID = pedido.id
INNER JOIN tbProdutos produto
ON item.ProdutoID = produto.id
GROUP BY produto.Descricao, produto.Grupo;

--- questão 10 ---
DELETE FROM tbClientes WHERE CPF = '0000001';

--- questão 11 ---
DELETE FROM tbPedidosItens item
USING tbProdutos produto
WHERE produto.Codigo = '0001' AND item.produtoID = produto.ID;
