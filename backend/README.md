# Backend do projeto

## Para conseguir rodar este projeto é necessário rodar os seguintes comandos
Para instalar todas as dependencias rode o comando.
```bash
    npm install

    npx sequelize-cli db:create

    npx sequelize-cli db:migrate

    npx sequelize-cli db:seed:all
```

Na pasta config no arquivo config.json configure o username e password do seu postgres para poder rodar os próximos comandos.

```bash
    npx sequelize-cli db:create

    npx sequelize-cli db:migrate
```

Estes comandos acima são responsaveis por criar o banco e a tabela do banco no seu postgres.

O comando abaixo é responsavel por rodar o arquivo com as localizações que o projeto deu no arquivo de excel que estava no .rar
```bash
    npx sequelize-cli db:seed:all
```

E por ultimo para que a api fique em funcionamento digite o seguinte comando
```bash
    npm start
```