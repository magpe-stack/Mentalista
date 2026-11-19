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


## Mentalista v16 — Temas e calculadora

Cinco novas paletas (Terracota, Neon, Ferrugem, Café com Avelã e Índigo), cada uma nos modos claro e escuro, somadas às cinco existentes: 20 combinações. Os códigos hexadecimais são preservados. O botão Calculadora do Editor abre a mesma janela flutuante que o botão no Palco, inclusive acima do Editor maximizado.


## Mentalista v17 — Ferramentas do Palco

- **Ponteiro (V):** seleciona caixas individualmente. Arrastar uma área vazia desenha um retângulo de seleção.
- **Mãozinha (H):** arrasta o Palco sem selecionar caixas. Pressione **Espaço** uma vez para alternar entre Ponteiro e Mãozinha. O botão ativo é atualizado imediatamente; soltar a tecla não altera a ferramenta.
- **Ctrl + clique:** adiciona ou remove caixas da seleção. **Ctrl + A:** seleciona todas as caixas (fora de campos de edição).
- Arrastar uma caixa selecionada movimenta o grupo; caixas fixadas não se movem.
- A busca **Ctrl + F** aparece abaixo da barra de ferramentas à esquerda, sem sobreposição.


## v18 — controles do Palco
- Ponteiro e Mãozinha em botões circulares com ícones, agrupados em moldura, seguindo o tema ativo.
- Busca rápida reposicionada abaixo dos controles superiores.
- Botão X da Lista rápida ligado ao fechamento do diálogo, sem excluir a lista.


## Atualização v19
- Editor: Integrar, Novo e Copiar agora usam apenas ícones, com título e nome acessível.
- Lista rápida: X e Esc cancelam a criação sem deixar caixa no Palco; Concluir confirma. Ao cancelar a edição de uma lista existente, os dados anteriores são restaurados.


## Mentalista v21
- Botão Propriedades redundante removido da barra; Editar continua abrindo a edição dos nós.
- Splash cinematográfico de 4 segundos com o logotipo SVG e o nome Mentalista, animado via CSS, com respeito a movimento reduzido.
- Rolagem interna das caixas de texto integradas: roda do mouse sobre a caixa rola o conteúdo; a barra de rolagem também pode ser arrastada. A roda fora das caixas continua controlando o zoom.


## Mentalista v23 — Ajuda e informações do projeto

O menu Ajuda inclui GitHub (repositório e Licença MIT), Manual (orientações rápidas e link para o README completo), Sobre (descrição do app, versão 23 e link do aplicativo) e Atalhos. As janelas podem ser fechadas sem sair do mapa.

- Projeto: https://github.com/magpe-stack/Mentalista
- Manual completo: https://github.com/magpe-stack/Mentalista/blob/main/README.md
- Aplicativo: https://magpe-stack.github.io/Mentalista/


## Mapa de Ícones e botões (v24)

Acesse **Ajuda → Mapa de Ícones e botões** para consultar as funções dos controles por categoria. A janela possui busca textual. **Regra de manutenção:** sempre que um botão/ícone for adicionado, alterado ou removido, atualizar o catálogo em `index.html` e esta documentação na mesma versão.


## Novidades v25 — Cores e checklists no Palco

- **Círculo cromático:** no menu contextual, ao lado das amostras existentes, permite escolher qualquer cor hexadecimal com o seletor nativo do navegador. A cor fica registrada no mapa e no backup JSON.
- **Checklists interativos:** em uma caixa Lista configurada como *caixas de marcação*, clique diretamente no quadradinho de cada tópico no Palco para marcar ou desmarcar. Também aceita Enter/Espaço com o quadradinho focado. Cada mudança pode ser desfeita com Ctrl+Z.
- **Mapa de Ícones e botões:** atualizado com os dois controles.


## v26 — Menus hierárquicos

Os menus Arquivo, Editar, Sistema e Ajuda foram organizados em grupos expansíveis com espaçamento compacto. A busca rápida foi removida do menu Sistema e permanece em Editar. O Mapa de Ícones e botões permanece acessível em Ajuda → Referência de controles.


## v27 — Nomes limpos nos menus

Em **Editar → Localizar e visualizar**, o comando aparece como **Buscar nós**, sem indicação de teclas. Os atalhos continuam documentados em **Ajuda → Atalhos**.


## Mentalista v28 — Preferências de grade e encaixe

Em **Sistema → Preferências / Configurações → Palco e Grade**, é possível:

- Mostrar ou ocultar a grade pontilhada do Palco.
- Ajustar a intensidade da grade de 0% a 100%.
- Ativar o encaixe de nós à grade de 30 unidades durante o arraste com o Ponteiro.
- Restaurar os padrões do Palco (grade visível, intensidade 25%, encaixe desativado).

As preferências são armazenadas localmente e aplicadas a todos os projetos no navegador. O encaixe só atua nos nós arrastados, sem reposicionar automaticamente os demais. O Mapa de Ícones e botões inclui os novos controles.


## Mentalista v29 — Personalização das conexões

Em **Sistema → Configurações → Conexões**, escolha o traçado **Curvas**, **Retas** ou **Ortogonais** e a espessura de **1 a 6 px**. As mudanças aparecem imediatamente no Palco e ficam salvas neste navegador, aplicando-se a todos os projetos. O comando **Restaurar padrões das conexões** volta ao traçado curvo de 2 px. A seleção de elos, exclusão de conexões e exportação SVG respeitam a geometria e a espessura selecionadas. O **Ajuda → Mapa de Ícones e botões** inclui os novos controles.


## Versão 30 — Caixas, tipografia e barra superior

- Em Sistema → Configurações, ajuste a largura padrão dos nós comuns (160–360 px), fonte, tamanho e espaçamento entre letras. As preferências são armazenadas localmente e podem ser restauradas.
- A barra superior reúne calculadora, Ponteiro, Mãozinha, zoom, ajuste de tela, modo claro/escuro e tela cheia, com botões circulares.
- O nome do projeto e o indicador de salvamento aparecem discretamente no rodapé direito do Palco.
- O Mapa de Ícones e botões inclui os novos controles.


### Manutenção v30.1
- Restaurados os acionadores da calculadora (barra superior e Editor).
- Ícone da calculadora centralizado no botão circular.
- Preferências de caixas e tipografia reposicionadas dentro do contêiner de Configurações, sem extrapolar a largura.
- Cache offline atualizado para `mentalista-v30-1`.


### Correção v30.2 — Calculadora flutuante
A janela da calculadora é posicionada diretamente no documento, acima dos contêineres do Palco, para evitar recortes ou ocultação. Ambos os acionadores (barra superior e Editor) abrem a mesma calculadora; o botão de fechar a oculta.


### Correção v30.3 — Calculadora
O acionamento da calculadora passou a contar com inicialização independente do restante do aplicativo. Os botões do Palco e do Editor acionam a mesma janela flutuante.


### Correção v30.4 — Calculadora flutuante

A calculadora possui módulo independente (`calculator.js`), abertura pelos botões do Palco e Editor, movimentação por arraste do cabeçalho, posição preservada ao fechar e reabrir e teclas funcionais para operações aritméticas. A documentação dos controles em Ajuda → Mapa de Ícones e botões continua aplicável.


### Mentalista v31 — Navegação e acessibilidade

Em **Sistema → Configurações → Navegação e acessibilidade**, é possível ajustar a sensibilidade do zoom (25–200%), a sensibilidade do deslocamento pela Mãozinha (25–200%), ampliar os controles principais e reduzir as animações. As preferências são armazenadas no navegador e valem para todos os projetos; o botão **Restaurar padrões de navegação e acessibilidade** retorna a 100% e desativa as duas opções. O **Mapa de Ícones e botões** foi atualizado para documentar os cinco controles. O ajuste automático à tela e o arraste de nós não são afetados pelas sensibilidades de navegação.


### v31.1 — Controles discretos e impressão limpa

Os botões de ação das caixas (Copiar, Fixar e Editar) são revelados ao passar o mouse ou ao focar a caixa pelo teclado. Em telas de toque, aparecem quando a caixa está selecionada. Na impressão e na exportação SVG, os botões de edição, os pontos de conexão e os divisores decorativos são omitidos, preservando o conteúdo e os elos. **Mapa de Ícones e botões:** as funções dos controles permanecem inalteradas; apenas sua visibilidade foi modificada.


## Mentalista v32 — Exportação e restauração completas

- **Exportar projeto (JSON)**: gera `mentalista-map` versão 2 com o projeto selecionado e preferências gerais (tema, grade, conexões, tipografia, navegação e acessibilidade).
- **Importar projeto (JSON)**: aceita versões antigas (`mentalista-map` versão 1) e versão 2. Acrescenta o projeto sem sobrescrever os existentes; se houver preferências no arquivo, pergunta antes de aplicá-las ao navegador.
- **Backup geral (JSON)**: gera `mentalista-backup` versão 1 com todos os projetos, o projeto ativo, as preferências gerais e o rascunho do Editor.
- **Restaurar backup geral**: valida o arquivo e solicita confirmação antes de **substituir todos os projetos e configurações locais**. Faça um backup atual antes de restaurar.

Os arquivos JSON são locais, não dependem de servidor. O backup não inclui o estado temporário de janelas abertas ou a posição da calculadora.


### Correção v32.1 — Textos dentro das caixas

Títulos, descrições e itens de listas são ajustados ao espaço disponível usando a largura real do texto SVG, respeitando a tipografia escolhida. Textos extensos são abreviados visualmente com reticências, sem perda de conteúdo no projeto ou na edição.


### Mentalista v32.2 — Sistema e segurança

Em **Sistema → Configurações → Sistema e segurança**, escolha entre animações normais, reduzidas, desativadas ou conforme o dispositivo. O indicador de salvamento no rodapé pode ser ocultado sem interromper o salvamento automático. Os lembretes de backup podem ser desativados ou configurados para 1, 7, 15 ou 30 dias; são exibidos apenas com o aplicativo aberto, sem notificações externas. O botão **Fazer backup geral agora** exporta projetos e preferências. A data do último backup é registrada localmente após iniciar o download. As preferências de sistema e segurança também fazem parte dos novos arquivos JSON; backups anteriores continuam compatíveis.


### v32.3 — Leitura integral dentro das caixas

Nós comuns, listas e caixas de texto possuem rolagem interna para leitura sem abrir o editor. Barras de rolagem extremamente discretas surgem ao passar o mouse (ou permanecem sutis em telas sensíveis ao toque). As listas preservam os checkboxes clicáveis no Palco; todo o texto permanece no projeto e no JSON.


### v32.4 — Botão de conexão discreto

O botão circular **+** de cada nó aparece ao passar o mouse sobre a caixa. Em telas sensíveis ao toque, aparece ao selecionar o nó. Permanece oculto em impressão e exportação SVG; a conexão continua disponível normalmente quando o controle é exibido.


### v32.5 — Correção do arraste de caixas

O Ponteiro voltou a movimentar nós e listas mesmo quando o arraste começa sobre o texto. A rolagem interna, as caixas de marcação e os botões de conexão permanecem operacionais. Para selecionar texto, use o editor da caixa.


### v33 — Organização automática do mapa

Em **Editar → Organizar mapa**, escolha **Em árvore (horizontal)**, **Hierárquico (vertical)** ou **Radial**. A disposição usa as conexões para identificar níveis e componentes. Nós fixados permanecem em suas posições; os outros são distribuídos sem alterar textos, listas, cores ou elos. O comando cria uma única etapa de histórico, permitindo **Ctrl+Z**. A organização radial distribui os nós conectados ao redor da raiz de cada componente. O Mapa de Ícones e botões passa a incluir os três novos comandos de organização.


## v34 — Recolher e expandir ramificações

- Passe o mouse sobre um nó que tenha descendentes e clique no pequeno **−** para recolher sua ramificação. O botão muda para **+** para expandi-la novamente. No celular, selecione a caixa.
- Nós e conexões ficam apenas ocultos no Palco, sem exclusão. O estado `collapsed` é salvo junto com o projeto, inclusive na exportação JSON e backup geral.
- O comando aceita **Desfazer/Refazer**. O ajuste à tela considera apenas os nós visíveis.
- Em ciclos e mapas com ligações cruzadas, nós acessíveis por outra ramificação expandida podem permanecer visíveis.
- Os controles de recolhimento não aparecem na impressão nem no SVG exportado.


## v34.1 — Indicador de ramificações

O controle de recolher/expandir é um **ponto discreto** no canto superior direito das caixas com descendentes. Quando o ramo está recolhido, exibe uma pequena **seta (›)** dentro do ponto — nunca um símbolo +, reservado para conectar nós. O indicador permanece visível, não aparece em impressões ou SVG, e o comando preserva os dados.


### v34.2 — Contador de ramificações
O contador de nós ocultos foi reduzido e movido para a faixa superior da caixa, evitando sobreposição ao título. O ponto/seta de recolhimento continua no canto superior direito e os indicadores não são impressos.


### v34.3 — Indicador de ramificações sem sobreposição

O contador textual de nós ocultos foi retirado do interior da caixa para não interferir no título. A seta discreta permanece no canto superior direito; ao passar o mouse sobre ela, uma dica informa quantos nós estão ocultos. O botão também tem descrição acessível para leitores de tela.


### v34.4 — Contador mínimo de ramificações

Ao recolher uma ramificação, um número de apenas 7 px aparece acima do ponto/seta no canto superior direito da caixa, indicando quantos nós foram ocultados. Não há texto «ocultos» dentro da caixa. A informação completa permanece disponível na dica de acessibilidade do botão. O indicador é excluído de impressão e exportação SVG.


### v34.5 — Contador dentro do indicador

Quando uma ramificação está recolhida, o círculo no canto superior direito mostra apenas a quantidade de nós ocultos, centralizada e com tamanho de fonte adaptável para um, dois ou mais algarismos. A seta foi removida. A quantidade completa continua acessível pelo título e rótulo do controle. O indicador não é impresso nem exportado para SVG.


### v34.6 — Contador sutil

O número dentro do círculo de ramificação recolhida usa tipografia fina (peso 400) e dimensões reduzidas, adaptadas à quantidade de algarismos. Continua centralizado e legível, sem ultrapassar as bordas do indicador.


### v34.7 — Contador legível dentro do círculo

O contador usa fonte sem serifa fina, compacta e reduzida, com regras de CSS específicas que prevalecem sobre a tipografia dos nós. O círculo dos nós recolhidos foi ampliado discretamente para acomodar números de dois ou mais algarismos.


### v34.8 — Indicadores alinhados no rodapé das caixas

Os indicadores de ramificação recolhida (contador dentro de um círculo) e de nó fixado foram movidos do canto superior direito para a extremidade direita da barra inferior de ações. Os controles de copiar, fixar e editar ficam alinhados à esquerda, com espaçamento mais compacto, evitando sobreposição com os indicadores. O conteúdo e a área de leitura das caixas permanecem livres. Os indicadores continuam ausentes de impressões e SVG exportados.


### v34.9 — Correção real dos indicadores

A posição dos controles foi corrigida no próprio código SVG: os botões de ação permanecem à esquerda da barra inferior, o contador de ramificações fica à direita e a indicação de fixação duplicada no topo foi removida (o botão de fixar já informa seu estado). O título e a área de leitura não recebem indicadores.


## Novidades v35 — Duplicação e detalhes

Em **Editar → Edição**, selecione uma caixa e escolha **Duplicar nó** para copiar somente aquela caixa, ou **Duplicar ramificação** para copiar a caixa e seus descendentes com suas conexões internas. As cópias recebem IDs próprios, são deslocadas no Palco e não ficam fixadas. As operações podem ser desfeitas com Ctrl+Z.

O comando **Prioridade, etiquetas e prazo** permite atribuir prioridade (baixa, média, alta ou urgente), até oito etiquetas e uma data. Os metadados são armazenados no nó e preservados nas exportações JSON e backups; podem ser consultados no título acessível da caixa. O Mapa de Ícones e botões inclui os novos comandos.


## Mentalista v36 — Minimapa e pesquisar/substituir

- **Minimapa:** mostra a distribuição dos nós e a região visível do Palco. Clique ou arraste no minimapa para navegar. O botão × oculta o minimapa; o botão circular ▣ o reabre. A preferência de exibição é salva no navegador.
- **Pesquisar e substituir:** abra **Editar → Buscar nós** (ou Ctrl+F), expanda **Pesquisar e substituir**, digite a expressão pesquisada e o texto substituto. Use **Prévia** para conferir a quantidade de ocorrências e **Substituir ocorrências** para confirmar a operação. A substituição é literal, sensível a maiúsculas e acentos, e altera títulos, descrições e itens de listas. Uma substituição pode ser desfeita com Ctrl+Z. O HTML formatado dos nós de texto não é modificado automaticamente, evitando perda de formatação.
- O minimapa e seus controles não são incluídos na impressão.


## Mentalista v37 — Imagens locais e notas recolhíveis

Em **Editar → Edição**, selecione uma caixa e use **Imagem local na caixa** para anexar PNG, JPEG ou WebP. A imagem é reduzida no próprio navegador (lado máximo de 960 px), incorporada ao JSON e apresentada na área rolável do nó. Imagens muito grandes são rejeitadas para proteger o armazenamento local. Para remover, abra novamente a opção e escolha **Remover imagem**.

Use **Nota recolhível** para escrever até 12.000 caracteres de informação complementar. A nota aparece na área rolável da caixa, com cabeçalho **Nota** para expandir ou recolher sem apagar seu conteúdo. O texto e o estado de recolhimento acompanham o projeto e os backups JSON. A alteração pode ser desfeita.

**Atenção:** imagens incorporadas aumentam o tamanho dos arquivos JSON e o espaço utilizado no navegador. Faça backups regulares.


### v37.1 — Anexos externos: lâmpada e câmera

As notas e imagens deixam de ocupar o interior dos nós. Um ícone de lâmpada à esquerda indica uma nota; abaixo dele, uma câmera indica uma imagem. Ao clicar, o respectivo conteúdo aparece num cartão externo ligado ao ícone por uma linha. A nota tem aparência de post-it. Clique novamente para recolher. O estado aberto/fechado é guardado no projeto e no JSON. As caixas mantêm a rolagem e o arraste originais.


### v37.2 — Fotografias sem moldura

A imagem anexa é exibida sem cartão, título ou moldura, com largura de referência de 380 px e altura calculada pela proporção original (por exemplo, 380 × 214 em 16:9 e 380 × 676 em 9:16). A imagem permanece ligada ao ícone da câmera por uma linha e pode ser recolhida clicando novamente no ícone. Fotografias anteriormente salvas têm a proporção identificada ao serem carregadas.


### v37.3 — Margem da lâmpada

O ícone da lâmpada foi deslocado 12 px à esquerda para afastá-lo da borda da caixa. A linha de ligação do post-it acompanha o novo posicionamento. A câmera e os demais controles não foram alterados.


### v37.4 — Respiro interno do ícone da lâmpada

O desenho da lâmpada foi reduzido a 72% em relação ao anterior, permanecendo centralizado, enquanto o círculo externo foi aumentado de raio 13 para 16 unidades SVG. Isso cria margem interna real entre a lâmpada e a borda do botão. O ícone de câmera e as funções dos anexos foram preservados.
