# Mentalista — Estúdio de Mapas Mentais

PWA desktop-first para criação de mapas mentais e redes de ideias, inspirado na navegação visual de mapas de conhecimento. Implementado em HTML, CSS e JavaScript nativos, sem dependências externas.

## Instalação no GitHub Pages

1. Crie um repositório GitHub e envie **o conteúdo da pasta `mentalista` para a raiz do repositório** (não envie apenas o ZIP).
2. Acesse **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Selecione a branch `main`, pasta `/ (root)` e salve.
4. Abra a URL HTTPS fornecida pelo GitHub Pages. A instalação como PWA pode ser oferecida pelo navegador.

## Recursos

- Criação, renomeação e exclusão de projetos independentes.
- Nós arrastáveis com título, descrição e cor.
- Conexões entre nós; seleção múltipla com Ctrl + clique.
- Inserção de nós filhos e irmãos; navegação por arrasto e zoom.
- Busca visual, desfazer e refazer, centralização e ajuste à tela.
- Armazenamento local automático, importação/exportação JSON, exportação SVG e impressão.
- Tema claro/escuro, layout desktop-first, suporte básico a telas pequenas e cache offline.

## Atalhos

| Tecla | Ação |
|---|---|
| Insert | Novo nó |
| Tab | Nó filho |
| Enter | Nó irmão |
| Delete | Excluir seleção |
| Ctrl+Z | Desfazer |
| Ctrl+Y ou Ctrl+Shift+Z | Refazer |
| Escape | Limpar seleção |

Os atalhos não são aplicados quando um campo de texto está ativo.

## Armazenamento e privacidade

Os projetos são armazenados no `localStorage` do navegador, por origem do site. Não há login, nuvem, telemetria ou sincronização. A limpeza dos dados do site, a navegação privada ou a troca de dispositivo podem causar perda de dados. **Exporte arquivos JSON regularmente**. A importação cria um novo projeto, sem sobrescrever os existentes.

## Limitações conhecidas

- Não é um clone do Obsidian: não abre cofres Markdown nem implementa plugins ou sincronização.
- O layout é otimizado para desktop. Em telas pequenas, as barras laterais ficam ocultas; recomenda-se desktop para edição completa.
- A impressão depende do navegador e pode exigir ajuste de orientação e escala. Para compartilhamento visual, prefira exportar SVG.
- O funcionamento offline começa após uma primeira visita HTTPS bem-sucedida e instalação do service worker.
- O cache do service worker é versionado em `sw.js`. Ao publicar atualizações, incremente `CACHE` para renovar recursos.

## Arquivos

- `index.html`: estrutura semântica da interface.
- `styles.css`: temas e layout.
- `app.js`: editor, persistência, eventos, histórico e exportação.
- `sw.js`: cache offline.
- `manifest.webmanifest`: metadados do PWA.
- `assets/logo.svg`: logotipo fornecido pelo usuário.
- `assets/icon-192.png` e `assets/icon-512.png`: ícones gerados a partir do SVG.

## Testes recomendados

Execute via GitHub Pages (HTTPS), crie projetos e nós, mova-os, conecte dois nós, use desfazer/refazer, recarregue a página, exporte e reimporte um JSON, teste o SVG em outro visualizador e desconecte a internet após a primeira visita. Confirme o armazenamento local antes de depender do aplicativo para dados importantes.
