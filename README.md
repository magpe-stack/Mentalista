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
