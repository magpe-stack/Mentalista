# Mentalista v2 — Estúdio de mapas mentais

PWA desktop-first, offline-first, sem bibliotecas externas.

## Interface

Palco livre de painéis laterais, com menus **Arquivo**, **Editar**, **Propriedades**, **Configurações** e **Ajuda**. A barra inferior mostra **Nó / Desfazer / Refazer** e, ao selecionar um nó, apresenta **Filho / Irmão / Editar / Cores / Excluir**.

## Uso

- Clique num nó para selecioná-lo e exibir as ações contextuais.
- Arraste nós para mover, arraste o fundo para navegar, use a roda do mouse para zoom.
- Para editar o texto, dê duplo clique no nó ou use **Editar** na barra contextual.
- Para criar conexões arbitrárias, selecione dois nós com Ctrl+clique e use **Editar → Conectar/desconectar nós**.
- O projeto novo começa com um único nó. A exclusão do último nó é bloqueada.
- Insert: novo nó; Tab: filho; Enter: irmão; Delete: excluir; Ctrl+Z: desfazer; Ctrl+Y: refazer; Escape: limpar seleção.

## Arquivos e dados

Os projetos ficam em `localStorage` do navegador. **Arquivo → Exportar JSON** cria um backup portátil; **Importar JSON** restaura uma cópia sem sobrescrever o projeto existente. Também há exportação SVG e impressão.

## Instalação

Publique o conteúdo desta pasta na raiz do repositório GitHub Pages. O service worker funciona em HTTPS e armazena os recursos estáticos para uso offline após a primeira visita online.

## Atualização

Mantém compatibilidade com os projetos salvos pela v1 (`mentalista.projects.v1`). Um projeto já existente não é apagado ou substituído pela atualização. Para começar com um nó, crie um novo projeto em **Arquivo → Novo projeto**.


## Versão 3
Cada nó possui uma porta +: arraste até outro nó para conectar, ou solte no palco para criar um filho conectado. Somente cliques sobre caixas selecionam nós. O editor de propriedades fica na barra contextual, após as cores; o menu superior Propriedades foi removido.


## Mentalista v4 — Busca rápida e atalhos

Pressione **Ctrl+F** (ou **Cmd+F** no macOS) para abrir a busca de nós. Digite parte do título ou descrição; a busca ignora diferenças de acentos e letras maiúsculas. Clique em um resultado ou navegue com as setas e Enter para selecionar o nó e centralizar o Palco. Pressione Esc para fechar a busca. A busca é local e não envia dados a servidores.

No menu **Ajuda → Atalhos**, consulte a lista de comandos do editor e dos controles de navegação. Também é possível abrir a busca em **Editar → Buscar nós** ou **Configurações → Busca rápida**.


## v5 — Listas rápidas

Clique em **Lista** na barra inferior para criar uma caixa de lista. Digite um tópico e pressione Enter para adicioná-lo; Shift+Enter permite escrever várias linhas e o botão Adicionar inclui todos os tópicos. Edite ou remova itens diretamente na janela da lista. Um duplo clique na caixa abre o editor. Cada lista suporta até 30 tópicos e pode ser conectada a nós comuns ou outras listas usando o botão +. É possível construir mapas só com listas.

**Voz:** o botão Ditar tópico usa a API nativa SpeechRecognition apenas quando disponível. O reconhecimento pode depender de serviços externos, permissão do microfone e conexão à internet. O aplicativo permanece utilizável offline por texto.

**Atalho:** Ctrl+Shift+L cria uma nova lista. A busca Ctrl+F também encontra o conteúdo dos tópicos. Backups JSON preservam as listas e seus elos.


## Listas — v6
Cada caixa Lista apresenta um rodapé com ações: copiar, alternar entre marcadores, numeração e checklist, fixar/desafixar posição e editar. O editor permite escolher o formato, marcar itens concluídos e limpar os concluídos. O formato e o estado das marcações são armazenados no projeto e exportados no JSON. O botão de copiar utiliza a área de transferência do navegador (com alternativa quando disponível).


## Novidades v7 — Elos e Editor

- Clique diretamente na linha de uma conexão para selecioná-la; o botão **Desfazer elo** remove somente a linha, mantendo ambas as caixas. `Delete` também remove o elo selecionado. `Ctrl+Z` restaura a conexão.
- **Editor** ao lado de **Lista** abre uma janela flutuante e arrastável com título, negrito, itálico, fontes, tamanhos, realce, limpar formatação e copiar. `Ctrl+Shift+E` também abre o editor.
- A extração de telefones, e-mails e URLs mostra resultados separados, com cópia individual, sem alterar o texto original. Reconhecimento por expressões regulares: alguns formatos incomuns podem não ser identificados.
- Texto do editor salvo separadamente no armazenamento local do navegador. Não integra os backups JSON de mapas; copie textos importantes para um arquivo externo.
- A colagem no editor utiliza texto simples para evitar formatação indesejada de sites externos. A cópia tenta preservar a formatação criada no editor quando o navegador permite.


## Novidades da versão 8

- **Integrar:** no editor flutuante, transforma o texto formatado em uma caixa de texto do mapa, com porta `+` para criar elos. Para atualizar uma caixa integrada, dê duplo clique nela, edite e clique em Integrar novamente. O botão Rascunho inicia um texto independente.
- **Centralização contextual:** o botão ⤢ centraliza a caixa selecionada e ajusta o zoom para suas dimensões; sem seleção, enquadra todo o mapa.
- **Lero-lero:** painel no editor com controles de palavras, frases, títulos e parágrafos. Gera texto fictício localmente, sem internet.
- **Backup:** caixas de texto e seu HTML fazem parte da exportação JSON do mapa. O rascunho independente continua no armazenamento local.

**Observação:** o gerador prioriza a contagem de palavras quando preenchida, portanto o número final de frases pode variar. As caixas longas têm rolagem interna.

## Versão 9 — Editor

- O gerador intercala títulos entre os parágrafos em vez de agrupá-los no início. Se houver mais títulos que parágrafos, alguns títulos ainda aparecerão consecutivamente.
- O botão **Excluir seleção** remove apenas o trecho selecionado no editor, sem apagar o restante do texto.
- **Integrar** cria ou atualiza a caixa de texto, centraliza-a no Palco e fecha a janela do Editor.


## Novidades da v10 — Fixar e copiar caixas

Todas as caixas (nós, listas e textos integrados) possuem ações no rodapé para copiar, fixar/desafixar e editar. As listas também permitem alternar o formato. Uma caixa fixada não se move ao arrastar, mas continua editável, conectável e selecionável. O estado de fixação é preservado no projeto e no JSON exportado.


## Atualização v11
- Botão **Del** no editor: remove somente a seleção de texto, com preservação do intervalo ao acionar o botão.
- Textos integrados não permitem seleção acidental no Palco; para selecionar/copiar trechos, abra a caixa no Editor.
- Nós comuns e listas são desenhados acima das caixas de texto grandes, facilitando sua movimentação.
- Ação redundante **Limpar texto** removida; **Novo** substitui o rascunho mediante confirmação quando houver texto.


## Atualização v12 — Editor maximizado e Meus Projetos

- Na barra de título do Editor, use **□** para maximizar sobre todo o Palco e **❐** para restaurar. O botão **−** minimiza o Editor, preservando o conteúdo. Um duplo clique na barra de título também alterna o tamanho.
- Em **Arquivo → Meus Projetos**, uma janela apresenta os projetos salvos neste navegador, com quantidade de caixas e elos. Clique em um projeto para abri-lo.
- Maximizar ocupa a janela/área de visualização do navegador. Para ocupar a tela inteira do laptop, use o modo de tela cheia do navegador (normalmente F11 no Windows) ou o controle de tela cheia do Mentalista.
- Os projetos continuam armazenados localmente. Exporte JSON regularmente.


## v13 — Calculadora flutuante

O botão ▦ ao lado do zoom abre uma calculadora independente com operações aritméticas, porcentagem, raiz, quadrado, inverso, mudança de sinal, copiar resultado e teclado numérico. A calculadora pode ser arrastada e fica acima do Editor, inclusive maximizado. O tema claro/escuro é herdado automaticamente do Mentalista. O botão ✕ fecha a calculadora. Não é necessário acesso à internet.


## Mentalista v14 — Aparência e Temas

Em **Sistema → Configurações**, abra o módulo **Aparência e Temas**. Escolha uma das cinco paletas (Mentalista Original, Menta, Retrô, Safira ou Linho e Lavanda) e o modo Claro ou Escuro. São dez combinações. As cinco cores originais de cada paleta são mantidas nas variáveis CSS `--color-1` a `--color-5`. Os tons de superfície e texto são derivados para contraste e legibilidade.

A escolha é aplicada imediatamente aos menus, Palco, Editor e Calculadora e persistida no navegador. As cores individuais dos nós não são alteradas. O módulo foi preparado para a inclusão de novas categorias de configurações em versões futuras.


## Atualização v15
- Lista rápida compacta, sem parágrafos tutoriais, com botão X e ações agrupadas no rodapé.
- Calculadora em botão circular independente à esquerda do Palco, fora dos controles de zoom.
- Botão de calculadora no início da barra de ferramentas do Editor.
- Ambos os acessos abrem a mesma calculadora flutuante, com cores derivadas do tema.
