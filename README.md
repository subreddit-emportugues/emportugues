# Site

## Descrição

Site que mostra informações sobre subreddits lusófonos linkados em postagens do subreddit [r/EmPortugues](https://www.reddit.com/r/EmPortugues/).

O site extrai dados serializados em JSON armazenado em servidor usando [jQuery](https://jquery.com/) para exibir os resultados paginados numa tabela com funcionalidades de [DataTables](https://datatables.net/) numa página responsiva estilizada com auxílio de [Bootstrap](https://getbootstrap.com/).

A página principal do site carrega o arquivo JSON com `$.getJSON()`, extrai os dados em tabela com `$().DataTable()` e propicia a filtragem dos dados com `search`, a reordenação das colunas da tabela com `colReorder` e a paginação com `page` além de dispor de um `footer` com links para o [subreddit](https://www.reddit.com/r/EmPortugues/), o [aplicativo](https://play.google.com/store/apps/details?id=org.emportugues.aplicativo) e este repositório.

As informações apresentadas no site são: `"icon"`, `"name"`, `"description"`, `"recent_submissions"` e `"recent_comments"`, `"members"`, `"age"`, `"moderators"`, `"nsfw"` e o link de cada subreddit listado.

## Sumário
* [Instalação](#Instalação)
* [Instruções](#Instruções)
* [Dependências](#Dependências)
* [Colaboração](#Colaboração)
* [Página Inicial](#Página_Inicial)
* [Referências](#Referências)

## Instalação
1. Clone o repositório;
2. navegue até a pasta;
3. selecione o arquivo "index.html";
4. e edite com um editor de texto.

## Instruções
Para alterar o endereço do arquivo JSON, em [app.js](https://github.com/subreddit-emportugues/site/blob/master/assets/js/app.js), edite:
```
$.getJSON("../../../data/subreddits.json", function (data) {
```

Para alterar as chaves do objeto JSON, em [app.js](https://github.com/subreddit-emportugues/site/blob/master/assets/js/app.js), edite:
```
id: data.subreddits[i].id,
icon: data.subreddits[i].icon,
name: data.subreddits[i].name,
description: data.subreddits[i].description,
recent_submissions: data.subreddits[i].recent_submissions,
recent_comments: data.subreddits[i].recent_comments,
members: data.subreddits[i].members,
age: data.subreddits[i].age,
moderators: data.subreddits[i].moderators,
nsfw: data.subreddits[i].nsfw
```

Para alterar os cabeçalhos das colunas, em [index.html](https://github.com/subreddit-emportugues/site/blob/master/index.html), edite:
```
<th scope="col"></th>
<th class="hidden-column" scope="col">Ícone</th>
<th scope="col">Subreddit</th>
<th scope="col">Descrição</th>
<th scope="col">Atividade</th>
<th class="hidden-column" scope="col">Comentários</th>
<th scope="col">Membros</th>
<th scope="col">Início</th>
<th scope="col">Mods</th>
<th scope="col">NSFW</th>
```

Para alterar as propriedades da tabela, em [app.js](https://github.com/subreddit-emportugues/site/blob/master/assets/js/app.js), edite:
```
data: table,
colReorder: true,
fixedHeader: true,
responsive: true,
mark: true,
"processing": true,
"lengthMenu": [
    [5, 25, 100, -1],
    [5, 25, 100, "Todos"]
],
"order": [],
"pageLength": 100,
"pagingType": "full_numbers",
"language": {
    "url": "https://emportugues.org/assets/lang/pt-BR.json"
},
"columnDefs": [{
        "visible": false,
        "targets": [1, 5]
    },
    {
        "searchable": false,
        "orderable": false,
        "targets": 0
    }
],
columns: [{
        data: 'id'
    },
    {
        data: 'icon'
    },
    {
        data: 'name',
        render: $.fn.dataTable.render.name()
    },
    {
        data: 'description',
        render: $.fn.dataTable.render.description()
    },
    {
        data: 'recent_submissions',
        render: $.fn.dataTable.render.activity()
    },
    {
        data: 'recent_comments'
    },
    {
        data: 'members',
        render: $.fn.dataTable.render.members()
    },
    {
        data: 'age',
        render: $.fn.dataTable.render.age()
    },
    {
        data: 'moderators',
        render: $.fn.dataTable.render.moderators()
    },
    {
        data: 'nsfw',
        render: $.fn.dataTable.render.nsfw()
    }
],
colReorder: {
    fixedColumnsLeft: 1
},
"initComplete": function (settings, json) {
    tlite(el => el.classList.contains('data-tooltip'));
    $("#loading-screen").css("visibility", "hidden");
    $("#loading-screen").css("opacity", 0);
}
```

## Dependências
> Bootstrap
```
<link rel="stylesheet" type="text/css" href="assets/vendor/Bootstrap-4-4.1.1/css/bootstrap.min.css"/>
```
> DataTables
```
<link rel="stylesheet" type="text/css" href="assets/vendor/datatables.css"/>
```
```
<script type="text/javascript" src="assets/vendor/datatables.min.js"></script>
```
> Tlite
```
<link rel="stylesheet" type="text/css" href="assets/vendor/Tlite/tlite.css"/>
```
```
<script type="text/javascript" src="assets/vendor/Tlite/tlite.min.js"></script>
```
>Spinner
```
<link rel="stylesheet" type="text/css" href="assets/vendor/Spinner/spinner.css"/>
```
> FontAwesome
```
<link rel="stylesheet" href="assets/vendor/font-awesome-4.7.0/css/font-awesome.min.css">
```
> Mark
```
<script type="text/javascript" src="assets/vendor/Mark/jquery.mark.min.js"></script>
```
```
<script type="text/javascript" src="assets/vendor/Mark/datatables.mark.es6.min.js"></script>
```
> Marked
```
<script type="text/javascript" src="assets/vendor/Marked/marked.min.js"></script>
```

## Colaboração

Você pode colaborar com o desenvolvimento deste repositório!

[Confira os kanbans deste projeto](https://github.com/orgs/subreddit-emportugues/projects/7), [entre em contato com a equipe de moderação](https://reddit.com/message/compose?to=/r/EmPortugues) e [participe da equipe de desenvolvimento](https://github.com/orgs/subreddit-emportugues/teams/desenvolvedores) para saber a respeito do progresso deste repositório caso queira colaborar antes de [reportar um novo problema](https://github.com/subreddit-emportugues/site/issues) ou [solicitar o recebimento de uma modificação](https://github.com/subreddit-emportugues/site/pulls).

## Página Inicial

### https://emportugues.org

## Referências

* Site: https://emportugues.org
* Comunidade: https://www.reddit.com/r/EmPortugues
* Organização: https://github.com/subreddit-emportugues
* Repositório: https://github.com/subreddit-emportugues/site
* Projeto: https://github.com/orgs/subreddit-emportugues/projects/7
* Equipe: https://github.com/orgs/subreddit-emportugues/teams/desenvolvedores
* Licença: 
