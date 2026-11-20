# Mentalista v49 — Manual completo do software

**Edição:** 19 de novembro de 2026  
**Aplicação:** Mentalista — Estúdio de mapas mentais  
**Plataforma:** Progressive Web App (PWA), HTML/CSS/JavaScript sem bibliotecas externas obrigatórias  
**Site:** https://magpe-stack.github.io/Mentalista/  
**Código-fonte:** https://github.com/magpe-stack/Mentalista  

> **Leia primeiro:** os projetos são guardados principalmente no navegador, e o histórico no IndexedDB. Faça backups JSON regularmente. Instalação, acesso direto a arquivos, notificações e compartilhamento dependem de permissões e compatibilidade. Este manual descreve os recursos presentes no código da versão 49; não substitui testes práticos em cada navegador.

## Apresentação

O Mentalista é uma ferramenta de organização visual do conhecimento. Seu espaço de trabalho é um Palco amplo, onde caixas representam ideias e conexões indicam relações. O aplicativo combina mapas mentais, listas, checklists, notas, imagens e textos formatados em projetos locais. É especialmente útil para escritores, estudantes, pesquisadores, profissionais que planejam atividades e qualquer pessoa que precise transformar informações dispersas em uma estrutura compreensível.

O programa foi concebido como PWA: pode ser aberto pelo navegador ou instalado como aplicativo em plataformas compatíveis. O trabalho principal não depende de login ou de um serviço de nuvem. O funcionamento offline depende de os arquivos estáticos terem sido armazenados corretamente. Os projetos podem ser exportados para JSON, e outros formatos oferecem maneiras diferentes de visualizar, compartilhar ou imprimir conteúdos.

Este documento apresenta os conceitos, o funcionamento dos menus, os procedimentos mais frequentes, os cuidados com dados e as limitações das APIs do navegador. Não confunda recursos de armazenamento local com sincronização em nuvem, nem notificações locais com Web Push. Ao longo do texto, os exemplos são procedimentos sugeridos; algumas opções podem não aparecer em todos os navegadores.

## Índice

1. [Primeiros passos e conceitos](#primeiros-passos-e-conceitos)
2. [Interface geral e menus](#interface-geral-e-menus)
3. [Projetos: Novo, Projetos, Modelos, Renomear e Excluir](#projetos-novo-projetos-modelos-renomear-e-excluir)
4. [Criação, edição e seleção de nós](#criacao-edicao-e-selecao-de-nos)
5. [Conexões, elos e relações](#conexoes-elos-e-relacoes)
6. [Movimentação, fixação e duplicação](#movimentacao-fixacao-e-duplicacao)
7. [Listas rápidas e checklists](#listas-rapidas-e-checklists)
8. [Editor flutuante e textos formatados](#editor-flutuante-e-textos-formatados)
9. [Lero-lero e extração de informações](#lero-lero-e-extracao-de-informacoes)
10. [Notas externas e anexos de imagem](#notas-externas-e-anexos-de-imagem)
11. [Prioridade, etiquetas e prazos](#prioridade-etiquetas-e-prazos)
12. [Modelos prontos](#modelos-prontos)
13. [Organização automática e ramificações](#organizacao-automatica-e-ramificacoes)
14. [Zoom, ponteiro, mãozinha e minimapa](#zoom-ponteiro-maozinha-e-minimapa)
15. [Busca e substituição](#busca-e-substituicao)
16. [Aparência e configurações](#aparencia-e-configuracoes)
17. [Calculadora flutuante](#calculadora-flutuante)
18. [Arquivo: JSON e operações seguras](#arquivo-json-e-operacoes-seguras)
19. [Importação, Markdown, SVG e impressão](#importacao-markdown-svg-e-impressao)
20. [Compartilhamento nativo](#compartilhamento-nativo)
21. [Abertura pelo explorador e salvamento direto](#abertura-pelo-explorador-e-salvamento-direto)
22. [Área de transferência e imagens PNG](#area-de-transferencia-e-imagens-png)
23. [Histórico de versões e recuperação](#historico-de-versoes-e-recuperacao)
24. [Notificações locais e lembretes](#notificacoes-locais-e-lembretes)
25. [Instalação, atalhos e janelas do sistema](#instalacao-atalhos-e-janelas-do-sistema)
26. [Offline, cache e atualização](#offline-cache-e-atualizacao)
27. [Armazenamento, integridade e backup](#armazenamento-integridade-e-backup)
28. [Manutenção e reparação](#manutencao-e-reparacao)
29. [Acessibilidade e teclado](#acessibilidade-e-teclado)
30. [Problemas frequentes e soluções](#problemas-frequentes-e-solucoes)
31. [Fluxos de trabalho recomendados](#fluxos-de-trabalho-recomendados)
32. [Privacidade, limites e boas práticas](#privacidade-limites-e-boas-praticas)
33. [Referência rápida de comandos e suporte](#referencia-rapida-de-comandos-e-suporte)

## 1. Primeiros passos e conceitos

### O que é e quando utilizar

Um projeto é um mapa independente, armazenado no navegador. Um nó é uma caixa de conteúdo; um elo é a conexão visual entre duas caixas. O Palco é a área onde os nós ficam posicionados. A seleção determina sobre qual caixa os comandos atuam.

### Como utilizar, passo a passo

Abra o Mentalista, escolha Arquivo → Projetos → Novo e dê um nome identificável. Clique em Novo nó ou use Insert para criar a primeira ideia. Dê nomes curtos às caixas, crie filhos para subdivisões e organize o mapa quando ele crescer. Salve uma cópia JSON ao terminar a sessão. O salvamento local é automático, mas não substitui uma cópia externa.

### Cuidados e observações

Evite abrir dois separadores do mesmo navegador para editar simultaneamente o mesmo projeto; alterações concorrentes podem produzir resultados inesperados. Não trate o fechamento do navegador como equivalente a um backup.

## 2. Interface geral e menus

### O que é e quando utilizar

A barra superior contém Arquivo, Editar, Exibir, Sistema e Ajuda. Os comandos são agrupados por finalidade para não misturar administração de projetos, criação de conteúdo, visualização e manutenção. A barra de ferramentas contém recursos contextuais; alguns só aparecem quando uma caixa está selecionada.

### Como utilizar, passo a passo

Em Arquivo administre projetos e arquivos. Em Editar crie, duplique, conecte ou exclua caixas e abra o Editor. Em Exibir controle zoom, organização, navegação e aparência. Em Sistema configure o aplicativo, consulte notificações e execute manutenção. Em Ajuda abra o manual, a referência de atalhos, o mapa de controles e as informações da versão.

### Cuidados e observações

Se um botão parecer ausente, confira se há uma seleção ativa, se um submenu está recolhido e se o tamanho da tela ocultou ferramentas contextuais. Os menus podem ser fechados clicando fora deles.

## 3. Projetos: Novo, Projetos, Modelos, Renomear e Excluir

### O que é e quando utilizar

Os projetos são independentes: cada um possui seu conjunto de nós, elos e informações. O seletor de projetos mostra os mapas guardados no navegador atual. Modelos criam mapas novos, em vez de modificar um projeto existente.

### Como utilizar, passo a passo

Use Novo para iniciar em branco; Projetos para alternar entre mapas; Modelos para partir de uma estrutura pronta; Renomear para atualizar a identificação; Excluir somente depois de verificar se existe uma cópia JSON recuperável. Escolha nomes descritivos, por exemplo “Livro — personagens” e “Livro — enredo”, para evitar confusão.

### Cuidados e observações

Excluir um projeto é diferente de remover uma caixa. Antes de exclusões importantes, use Guardar ou Backup. Os dados do navegador são específicos do perfil, do domínio e do dispositivo.

## 4. Criação, edição e seleção de nós

### O que é e quando utilizar

Cada nó representa uma ideia, assunto ou atividade. O nó inicial é a origem natural do mapa, mas o aplicativo permite conexões entre caixas existentes. Selecionar um nó habilita comandos de filho, irmão, propriedades, anexos e exclusão.

### Como utilizar, passo a passo

Use Insert para um novo nó, Tab para um filho e Enter para um irmão, desde que o foco esteja no Palco e não em um campo de texto. Dê duplo clique na caixa para editar propriedades quando o contexto permitir. Use Ctrl+clique para selecionar mais de uma caixa e Ctrl+A para selecionar todas. Arraste uma caixa selecionada para reposicioná-la.

### Cuidados e observações

A exclusão pode remover conexões associadas. Confira a seleção antes de usar Delete. Para recuperar alterações recentes, use Desfazer; para estados antigos ou após fechar o aplicativo, consulte Histórico de versões.

## 5. Conexões, elos e relações

### O que é e quando utilizar

Os elos tornam explícitas as relações entre conceitos. Podem ligar caixas comuns, listas e outros conteúdos. A aparência das linhas é personalizável nas configurações; o vínculo lógico é preservado no projeto JSON.

### Como utilizar, passo a passo

Para conectar, arraste a porta “+” de uma caixa até outra. Para selecionar um elo, clique na linha. Use o comando de remoção do elo selecionado para desfazer apenas a relação, sem apagar as caixas. Ajuste formato, espessura e cores das conexões nas preferências correspondentes.

### Cuidados e observações

Uma conexão não significa necessariamente uma relação hierárquica. Ao usar organização automática, revise o resultado e reposicione manualmente elementos cuja interpretação dependa de ligações cruzadas.

## 6. Movimentação, fixação e duplicação

### O que é e quando utilizar

O Mentalista permite reposicionar nós livremente e manter determinadas caixas fixas. Duplicar nó cria uma cópia independente; duplicar ramificação replica uma caixa e seus descendentes com as conexões internas pertinentes.

### Como utilizar, passo a passo

Selecione a caixa, arraste-a pelo Palco e observe a mudança de posição. Para evitar deslocamentos involuntários, utilize o comando de fixação quando disponível. Para repetir uma estrutura, escolha Duplicar nó ou Duplicar ramificação. Revise os títulos e metadados copiados para não confundir original e duplicata.

### Cuidados e observações

Duplicar não cria sincronização entre as cópias. Modificar uma caixa duplicada não atualiza automaticamente a original. Ao duplicar conjuntos grandes, verifique a posição e as conexões antes de continuar.

## 7. Listas rápidas e checklists

### O que é e quando utilizar

Uma lista é uma caixa com tópicos próprios. Os formatos incluem marcadores, numeração e itens marcáveis. É útil para planejamento, tarefas, roteiros de estudo e decomposição de assuntos.

### Como utilizar, passo a passo

Em Editar → Criar → Nova lista rápida, informe um título, escolha o formato e adicione os tópicos. Use o botão de adição para registrar cada item, edite ou remova entradas e marque tarefas concluídas diretamente na caixa quando o formato permitir. A opção Concluídos limpa itens marcados; use-a com cuidado.

### Cuidados e observações

O editor de listas possui limites de quantidade e tamanho. Para conteúdos longos, distribua tópicos em várias listas ou use o Editor flutuante. O ditado depende do reconhecimento de voz do navegador e pode não funcionar offline.

## 8. Editor flutuante e textos formatados

### O que é e quando utilizar

O Editor serve para conteúdos mais extensos que o título de um nó. Ele funciona em janela flutuante, pode ser movimentado e maximizado, e oferece formatação como negrito, itálico, fontes, tamanhos e realces.

### Como utilizar, passo a passo

Abra Editar → Edição → Editor flutuante ou Ctrl+Shift+E. Digite um título e o conteúdo, aplique formatação ao trecho selecionado e utilize Integrar para criar ou atualizar uma caixa de texto no mapa. Experimente copiar texto formatado e colar em outro editor, observando as limitações de compatibilidade.

### Cuidados e observações

O Editor possui um rascunho local, mas um texto integrado e o rascunho não são necessariamente a mesma cópia. Antes de descartar o rascunho, confira se o conteúdo desejado foi integrado e exportado.

## 9. Lero-lero e extração de informações

### O que é e quando utilizar

O Lero-lero auxilia na produção de texto fictício para testar layouts e volumes de escrita. O Editor também pode identificar padrões como endereços web, telefones e e-mails em conteúdos textuais.

### Como utilizar, passo a passo

Use os controles do Lero-lero para gerar quantidades de palavras, frases, títulos ou parágrafos de teste. Na extração, revise os itens identificados antes de copiar: um padrão reconhecido automaticamente não confirma que o dado esteja correto ou ativo.

### Cuidados e observações

Não utilize textos fictícios como fontes de pesquisa ou dados factuais. A extração é uma ajuda de edição, não uma ferramenta de validação de contatos.

## 10. Notas externas e anexos de imagem

### O que é e quando utilizar

Notas e imagens são anexos associados a nós. A lâmpada à esquerda indica uma nota em formato de post-it; a câmera, abaixo, indica imagem. Os anexos ficam fora da área principal da caixa, conectados visualmente ao nó.

### Como utilizar, passo a passo

Selecione um nó e use os comandos de imagem ou nota. Escolha uma imagem local compatível ou escreva uma nota; depois abra e recolha o anexo pelo ícone correspondente. O aplicativo ajusta imagens para reduzir o tamanho e procura preservar a proporção original.

### Cuidados e observações

Arquivos muito grandes podem aumentar o tamanho do projeto e de seus backups. Verifique se as imagens aparecem corretamente após reabrir o projeto e após exportar/importar um JSON de teste.

## 11. Prioridade, etiquetas e prazos

### O que é e quando utilizar

Os metadados enriquecem os nós com informações para planejamento. A prioridade pode ser baixa, média, alta ou urgente; etiquetas identificam categorias; prazos indicam datas relevantes.

### Como utilizar, passo a passo

Selecione a caixa e abra Editar → Edição → Prioridade, etiquetas e prazo. Escolha a prioridade, informe etiquetas concisas e selecione uma data de prazo. Use padrões consistentes, por exemplo “pesquisa”, “revisão” e “publicação”, para facilitar leitura e organização.

### Cuidados e observações

O registro de prazo não equivale a uma tarefa agendada no sistema operacional. O aplicativo não possui entrega garantida de notificações com a janela fechada, e a Badging API não foi implementada.

## 12. Modelos prontos

### O que é e quando utilizar

Os modelos são pontos de partida e não documentos obrigatórios. Existem estruturas para brainstorming, planejamento de projeto, planejamento de história e estudo ou pesquisa.

### Como utilizar, passo a passo

Abra Arquivo → Projetos → Modelos, selecione o modelo apropriado e confirme a criação. Depois renomeie os nós, adicione ou remova ramos e adapte as relações ao seu objetivo. Para uma narrativa, por exemplo, distribua personagens, conflitos, cenas e revisões em ramos distintos.

### Cuidados e observações

O modelo gera um projeto independente. Se já houver trabalho em outro mapa, abra-o pela biblioteca; não espere que a seleção de um modelo mescle conteúdos automaticamente.

## 13. Organização automática e ramificações

### O que é e quando utilizar

O Mentalista oferece organização em árvore horizontal, hierarquia vertical e arranjo radial. O recolhimento de ramificações permite esconder temporariamente descendentes sem apagar conteúdo.

### Como utilizar, passo a passo

Abra Exibir → Organizar mapa e escolha a disposição. Experimente cada arranjo em um projeto de teste e use Desfazer se o resultado não atender às suas necessidades. Para concentrar a atenção em uma área, recolha um ramo pelo indicador discreto de expansão e abra-o novamente quando necessário.

### Cuidados e observações

A organização automática é uma proposta geométrica. Mapas com muitas conexões cruzadas podem exigir ajustes manuais. Recolher não significa excluir: os nós continuam armazenados no projeto.

## 14. Zoom, ponteiro, mãozinha e minimapa

### O que é e quando utilizar

O Ponteiro seleciona e manipula caixas; a Mãozinha move a área de visualização. Zoom altera apenas a escala do Palco. O minimapa mostra a distribuição geral das caixas e facilita a navegação em mapas extensos.

### Como utilizar, passo a passo

Em Exibir → Navegação, ative o minimapa, ajuste à tela ou centralize a origem. Use os botões + e − de zoom, a roda do mouse quando aplicável, V para Ponteiro e H para Mãozinha. O espaço alterna as ferramentas fora de campos de texto; a barra superior também oferece botões rápidos.

### Cuidados e observações

Se o mapa parecer vazio, primeiro use Ajustar à tela ou Centralizar origem. É possível que a câmera esteja deslocada ou com zoom muito distante. Tela cheia é diferente de maximizar a janela instalada.

## 15. Busca e substituição

### O que é e quando utilizar

A busca ajuda a localizar nós pelo título, descrição e conteúdo de listas. A substituição modifica ocorrências textuais conforme as regras do comando e pode afetar várias caixas.

### Como utilizar, passo a passo

Pressione Ctrl+F ou Exibir → Navegação → Buscar nós, digite o termo e percorra os resultados com as setas e Enter. Antes de substituir, confira a quantidade de ocorrências e o texto exato. Execute a alteração somente após revisar o alcance.

### Cuidados e observações

A busca pode ignorar acentos e maiúsculas; a substituição não necessariamente segue as mesmas regras. Textos HTML formatados não são substituídos automaticamente como se fossem texto simples.

## 16. Aparência e configurações

### O que é e quando utilizar

O Mentalista oferece temas claro e escuro, personalização de cores e tipografia, configurações de grade, encaixe, conexões e animações. As preferências são armazenadas localmente.

### Como utilizar, passo a passo

Use Exibir → Aparência para alternar temas e acessar a personalização. Em Sistema → Preferências → Configurações, ajuste recursos do Palco e da interface. Experimente primeiro em um projeto pequeno; confira contraste, legibilidade e tamanho dos controles após mudanças visuais.

### Cuidados e observações

Restaurar configurações padrão altera preferências, não deveria remover projetos. Ainda assim, faça backup antes de qualquer operação de manutenção importante e verifique as confirmações exibidas.

## 17. Calculadora flutuante

### O que é e quando utilizar

A calculadora é uma ferramenta auxiliar para cálculos rápidos durante a elaboração do mapa. Ela não precisa substituir a área de trabalho e pode ser aberta enquanto o projeto permanece visível.

### Como utilizar, passo a passo

Abra pelo ícone da calculadora no cabeçalho. Execute as operações disponíveis, copie o resultado e cole-o no Editor, em uma nota ou em uma caixa. Feche a calculadora quando precisar de mais espaço no Palco.

### Cuidados e observações

Resultados numéricos dependem da expressão digitada e das regras de precisão do JavaScript. Para cálculos financeiros ou científicos críticos, confira os resultados com uma ferramenta apropriada.

## 18. Arquivo: JSON e operações seguras

### O que é e quando utilizar

JSON é o formato indicado para preservar a estrutura editável de um projeto. O menu Arquivo → JSON contém Guardar, Atualizar, Abrir, Salvar como, Backup, Restaurar e Histórico. Esses comandos têm consequências diferentes.

### Como utilizar, passo a passo

Guardar baixa uma cópia do projeto. Atualizar grava no arquivo previamente autorizado para o projeto atual quando o navegador permite. Abrir importa um projeto individual como novo. Salvar como escolhe um novo destino. Backup gera cópia de todos os projetos; Restaurar recupera um backup geral mediante confirmação. Histórico abre as versões locais.

### Cuidados e observações

Nunca confunda Guardar com Atualizar: download de uma nova cópia não sobrescreve necessariamente o arquivo antigo. Antes de Restaurar, guarde um backup atual. O navegador pode não suportar gravação direta em arquivos externos.

## 19. Importação, Markdown, SVG e impressão

### O que é e quando utilizar

Além de JSON, o Mentalista importa e exporta Markdown e exporta o mapa em SVG. A impressão prepara uma representação visual para papel ou PDF pelo diálogo do navegador.

### Como utilizar, passo a passo

Em Arquivo → Outros formatos → Markdown, escolha Importar ou Exportar. Use SVG para obter uma imagem vetorial do mapa e Imprimir para gerar uma saída impressa. Confira o enquadramento e a escala antes de confirmar a impressão; mapas muito largos podem exigir orientação paisagem.

### Cuidados e observações

Markdown descreve hierarquia textual e não é equivalente a um backup completo. Imagens, conexões livres e detalhes visuais podem não sobreviver a essa conversão. Para restauração integral, prefira JSON.

## 20. Compartilhamento nativo

### O que é e quando utilizar

A Web Share API permite encaminhar arquivos e textos ao painel nativo do dispositivo quando suportada. A interface oferece opções de JSON, Markdown, SVG, texto e link público do aplicativo.

### Como utilizar, passo a passo

Abra Arquivo → Outros formatos → Compartilhar, escolha o tipo de conteúdo e selecione o aplicativo de destino no painel do sistema. Se o compartilhamento não estiver disponível, utilize a alternativa de download ou cópia oferecida pela interface.

### Cuidados e observações

Compartilhar o link público do Mentalista não publica o mapa que está no seu navegador. Ao compartilhar um JSON, revise se ele contém notas ou imagens privadas antes de enviá-lo.

## 21. Abertura pelo explorador e salvamento direto

### O que é e quando utilizar

Em plataformas compatíveis, o manifesto associa extensões JSON e Markdown ao PWA instalado. A File Handling API pode entregar arquivos ao aplicativo; a File System Access API permite abrir e gravar arquivos autorizados pelo usuário.

### Como utilizar, passo a passo

Instale o Mentalista e procure a opção Abrir com no explorador do sistema. Confirme a importação quando solicitada. Para gravar diretamente, utilize Atualizar ou Salvar como, conforme a situação. Em navegadores incompatíveis, mantenha o fluxo convencional de importação e download.

### Cuidados e observações

O comportamento varia entre Windows, Android, Chrome e Edge. A associação não garante abertura por duplo clique em todos os ambientes. O aplicativo não deve substituir um arquivo externo sem o consentimento apropriado.

## 22. Área de transferência e imagens PNG

### O que é e quando utilizar

A área de transferência permite copiar texto, conteúdo formatado e conjuntos de caixas. O módulo avançado também tenta copiar e colar imagens PNG anexadas, conforme as permissões do navegador.

### Como utilizar, passo a passo

Em Editar → Área de transferência, selecione as caixas e use Copiar caixas; depois escolha Colar caixas para criar novas caixas com identificadores próprios. Para imagens, selecione a caixa correta e use Copiar imagem ou Colar imagem. Em outros aplicativos, o conteúdo estruturado pode ser reduzido a texto.

### Cuidados e observações

A cópia estruturada é específica da sessão atual. Permissões de leitura e gravação na área de transferência dependem de gesto do usuário, contexto seguro e suporte do navegador. Confira o destino antes de colar.

## 23. Histórico de versões e recuperação

### O que é e quando utilizar

O histórico usa IndexedDB e é separado do armazenamento principal de projetos. Há capturas manuais e automáticas; o limite previsto é de 25 versões por projeto, com até 15 automáticas. O mecanismo automático considera períodos de inatividade e espaçamento entre registros.

### Como utilizar, passo a passo

Abra Arquivo → JSON → Histórico, crie uma versão nomeada antes de uma grande reorganização e consulte as datas e contagens de nós. Para voltar a um estado anterior, escolha Restaurar e confirme. O sistema procura guardar uma versão de proteção do estado atual antes de substituir o mapa.

### Cuidados e observações

O histórico é local e pode desaparecer se os dados do site forem limpos. Não confunda histórico com backup externo. Uma versão antiga também pode conter erros ou anexos ausentes; confira o resultado após restaurar.

## 24. Notificações locais e lembretes

### O que é e quando utilizar

A Central de notificações permite cadastrar lembretes com texto, data e hora, testar a permissão e ativar alertas de backup. Não existe servidor de Web Push no Mentalista.

### Como utilizar, passo a passo

Abra Sistema → Notificações → Central de notificações, solicite permissão se desejar avisos do sistema e crie um lembrete de teste para um horário próximo. Ative ou desative alertas conforme sua preferência. Se o navegador não permitir notificações nativas, confira o aviso dentro do aplicativo.

### Cuidados e observações

Os lembretes são verificados enquanto o aplicativo está aberto ou quando você retorna a ele. Não há garantia de disparo com o PWA completamente fechado. Não utilize esses lembretes como único mecanismo para compromissos críticos.

## 25. Instalação, atalhos e janelas do sistema

### O que é e quando utilizar

O Mentalista possui manifesto PWA, ícones próprios, service worker e convite de instalação personalizado em ambientes compatíveis. Os App Shortcuts incluem Novo Projeto, Meus Projetos e Buscar Nós. Em desktop compatível, o Window Controls Overlay aproveita a região superior da janela instalada.

### Como utilizar, passo a passo

Abra Sistema → Manutenção → Instalar ou utilize o menu do navegador. Depois de instalado, procure os atalhos no menu de contexto do ícone. Em desktop, experimente maximizar e restaurar a janela para verificar o cabeçalho adaptativo.

### Cuidados e observações

A instalação e a disponibilidade de atalhos variam conforme o navegador. A desinstalação deve ser realizada pelo sistema operacional ou navegador; o botão do aplicativo apresenta instruções, não remove a instalação diretamente.

## 26. Offline, cache e atualização

### O que é e quando utilizar

O service worker armazena recursos essenciais como HTML, CSS, JavaScript, manifesto e ícones. O aplicativo pode abrir offline após a instalação adequada dos recursos. Projetos e histórico são guardados separadamente do cache estático.

### Como utilizar, passo a passo

Abra o Mentalista conectado, aguarde o carregamento e consulte Sistema → Manutenção → Verificar disponibilidade offline. Desative a conexão e teste a abertura em uma nova sessão. Quando houver atualização, use Verificar atualizações e recarregue conforme orientação. Reparar aplicativo tenta recuperar arquivos essenciais.

### Cuidados e observações

Estar offline não impede editar projetos locais, mas APIs como compartilhamento, ditado e acesso externo podem exigir suporte adicional. Uma atualização de cache não é um backup dos projetos. Evite limpar dados do site.

## 27. Armazenamento, integridade e backup

### O que é e quando utilizar

A manutenção consulta espaço usado, solicita persistência de armazenamento quando suportada e verifica estruturas de projetos e backups JSON. Essas verificações são predominantemente de leitura e não representam auditoria criptográfica completa.

### Como utilizar, passo a passo

Em Sistema → Manutenção, consulte Armazenamento, Proteção do armazenamento, Solicitar persistência, Verificar projetos e Verificar backup JSON. Para verificar um backup, selecione o arquivo sem importá-lo e leia o diagnóstico. Guarde cópias em mais de um local físico ou serviço de confiança.

### Cuidados e observações

Persistência não impede exclusão voluntária de dados nem perda do aparelho. Verificação estrutural não garante que todos os textos e imagens estejam semanticamente corretos. Faça testes periódicos de importação em um ambiente seguro.

## 28. Manutenção e reparação

### O que é e quando utilizar

A central inclui Instalar, Desinstalar, Verificar atualizações, Diagnóstico, Armazenamento, Limpar cache, Reparar aplicativo, Restaurar configurações e ferramentas de resiliência e persistência.

### Como utilizar, passo a passo

Execute Diagnóstico quando houver comportamento inesperado. Use Reparar aplicativo quando faltarem recursos estáticos e houver conexão disponível. Limpar cache exige confirmação e não deveria excluir projetos. Restaure configurações somente quando quiser recuperar preferências padrão.

### Cuidados e observações

Não utilize limpeza dos dados do site como primeira medida de solução de problemas. Esse procedimento pode apagar localStorage e IndexedDB, incluindo projetos e histórico. Faça backup antes de intervenções no navegador.

## 29. Acessibilidade e teclado

### O que é e quando utilizar

O aplicativo inclui controles identificados, suporte parcial a navegação por teclado, atalhos e opções de redução de animações. Os comandos de edição do Palco são suspensos durante digitação para evitar alterações acidentais.

### Como utilizar, passo a passo

Consulte Ajuda → Referência de controles → Atalhos. Use Ctrl+F para buscar, Ctrl+Z para desfazer, Ctrl+Y para refazer, Ctrl+Shift+L para lista, Ctrl+Shift+E para Editor, V para Ponteiro e H para Mãozinha. Use Escape para sair de buscas ou limpar seleções conforme o contexto.

### Cuidados e observações

Atalhos podem variar em teclados e sistemas operacionais. O foco em um campo de texto pode impedir a execução de atalhos do Palco. Ajuste o contraste e reduza animações se necessário.

## 30. Problemas frequentes e soluções

### O que é e quando utilizar

Falhas aparentes podem ter causas diferentes: câmera deslocada, cache incompleto, permissão negada, arquivo incompatível ou dados indisponíveis no perfil atual. Diagnosticar antes de excluir dados reduz o risco de perda.

### Como utilizar, passo a passo

Se o mapa sumir, use Ajustar à tela. Se um comando não responder, feche diálogos, confirme a seleção e recarregue. Se o aplicativo não abrir offline, verifique a disponibilidade dos arquivos. Se não conseguir salvar diretamente, use Guardar para baixar JSON. Se a importação falhar, confirme o formato e o tamanho do arquivo.

### Cuidados e observações

Se o navegador solicitar limpar dados, interrompa a operação e faça backup. Em caso de comportamento persistente, registre versão, navegador, sistema operacional, passos para reproduzir e mensagens exibidas; essas informações ajudam a corrigir bugs.

## 31. Fluxos de trabalho recomendados

### O que é e quando utilizar

O Mentalista pode ser usado para pesquisa, planejamento de histórias, estudo, brainstorming e organização de projetos. A qualidade do mapa depende mais da clareza da estrutura que da quantidade de nós.

### Como utilizar, passo a passo

Para estudar: crie um mapa de estudo, separe conceitos em ramos, adicione notas e listas e use busca na revisão. Para escrever: parta do modelo de história, organize personagens e conflitos, integre textos do Editor e exporte Markdown para uma visão linear. Para planejar: utilize prioridades, prazos, checklists e versões manuais antes de mudanças extensas.

### Cuidados e observações

Evite concentrar toda a documentação em um único mapa gigantesco. Divida assuntos em projetos independentes, faça backups gerais e exporte cópias individuais dos projetos mais importantes.

## 32. Privacidade, limites e boas práticas

### O que é e quando utilizar

O Mentalista não exige conta nem servidor para o trabalho local. Os projetos permanecem no armazenamento da origem web, salvo quando você decide exportar ou compartilhar um arquivo. O software não implementa sincronização automática entre dispositivos.

### Como utilizar, passo a passo

Mantenha um backup geral após alterações significativas, uma cópia individual de projetos críticos e uma versão manual antes de reorganizações grandes. Verifique os arquivos exportados, preserve seus nomes e datas e não dependa apenas do histórico interno.

### Cuidados e observações

Não há Background Sync, Periodic Background Sync, Web Push com servidor ou Badging API. A ausência desses recursos é uma decisão de escopo atual, não um defeito do armazenamento local. Não espere sincronização automática ao trocar de aparelho.

## 33. Referência rápida de comandos e suporte

### O que é e quando utilizar

Ajuda reúne o Manual, Sobre, GitHub, Atalhos e Mapa de Ícones e botões. O Manual completo é um arquivo Markdown no repositório e uma página HTML navegável incluída no pacote para leitura offline.

### Como utilizar, passo a passo

Use o índice no início deste manual para saltar ao assunto desejado. O mapa de controles do próprio aplicativo permite pesquisar o nome de um botão; o quadro de atalhos resume ações de teclado. Para reportar problemas, consulte o repositório oficial e descreva o comportamento observado.

### Cuidados e observações

As telas e recursos dependentes de APIs do sistema precisam ser testados no navegador utilizado. A documentação descreve a implementação presente no código v49 e não certifica que todos os fluxos foram testados em cada dispositivo.

## Apêndice A — Tabela de atalhos

| Ação | Atalho ou gesto |
|---|---|
| Novo nó | Insert |
| Nó filho | Tab |
| Nó irmão | Enter |
| Excluir seleção | Delete ou Backspace |
| Desfazer | Ctrl+Z |
| Refazer | Ctrl+Y ou Ctrl+Shift+Z |
| Buscar nós | Ctrl+F |
| Selecionar todas as caixas | Ctrl+A |
| Seleção múltipla | Ctrl+clique |
| Lista rápida | Ctrl+Shift+L |
| Editor flutuante | Ctrl+Shift+E |
| Ponteiro | V |
| Mãozinha | H |
| Alternar ferramenta | Espaço, fora de campos de edição |
| Zoom | Roda do mouse ou botões +/− |
| Conectar caixas | Arrastar o + de uma caixa até outra |
| Editar propriedades | Duplo clique na caixa |
| Fechar busca ou limpar seleção | Escape, conforme contexto |

## Apêndice B — Glossário

**Palco:** área visual onde o mapa é desenhado. **Nó:** caixa que representa uma ideia ou conteúdo. **Elo:** ligação entre nós. **Ramificação:** conjunto de descendentes relacionados. **Projeto:** mapa independente salvo no navegador. **Backup geral:** arquivo JSON contendo vários projetos. **Versão:** registro histórico local de um projeto. **Service worker:** processo web que gerencia recursos em cache. **Cache API:** armazenamento de arquivos estáticos do aplicativo. **IndexedDB:** banco local usado pelo histórico. **localStorage:** armazenamento local dos projetos e de preferências. **PWA:** aplicativo web instalável. **Markdown:** formato textual estruturado. **SVG:** formato de imagem vetorial. **Web Share API:** compartilhamento com o sistema operacional. **File System Access API:** acesso autorizado a arquivos locais. **File Handling API:** associação de tipos de arquivo ao aplicativo instalado.

## Apêndice C — Checklist antes de publicar uma atualização

1. Faça backup geral e exporte um projeto de teste.
2. Confira se a versão exibida em Ajuda → Sobre corresponde ao pacote publicado.
3. Teste Novo, Projetos, Renomear, Excluir, Guardar, Abrir e Restaurar em dados de teste.
4. Teste criação, edição, arraste, conexões, duplicação, listas e desfazer/refazer.
5. Confira Editor, anexos, Markdown, SVG, compartilhamento e impressão.
6. Teste o funcionamento offline depois de visitar o aplicativo conectado.
7. Verifique instalação, atalhos, janelas e APIs opcionais nos sistemas compatíveis.
8. Verifique a integridade do ZIP e a sintaxe JavaScript antes da publicação.
9. Preserve uma cópia anterior do pacote e dos backups para eventual recuperação.

## Apêndice D — Histórico de alterações

O histórico cronológico detalhado das versões anteriores foi preservado em [`HISTORICO-DE-VERSOES.md`](HISTORICO-DE-VERSOES.md). Esse registro é histórico; para nomes de menus e procedimentos atuais, utilize este manual.

## Apêndice E — Catálogo dos comandos de menu na versão 49

A relação abaixo foi obtida dos botões e submenus presentes na interface da versão 49. Um mesmo comando pode aparecer em mais de um lugar; algumas ações exigem projeto ou caixa selecionada.

### Menu Arquivo

**Projetos:** Novo, Projetos, Modelos, Renomear, Excluir.

**JSON:** Guardar, Atualizar, Abrir, Salvar como, Backup, Restaurar, Histórico, Importar JSON (interno).

**Outros formatos:** Importar, Exportar, SVG, Compartilhar, Imprimir.

**Markdown:** Importar, Exportar.

### Menu Editar

**Criar:** Novo nó, Nova lista rápida, Nó filho, Nó irmão.

**Conexões:** Conectar/desconectar nós, Desfazer elo selecionado.

**Área de transferência:** Copiar caixas, Colar caixas, Copiar imagem, Colar imagem.

**Edição:** Editor flutuante, Duplicar nó, Duplicar ramificação, Prioridade, etiquetas e prazo, Imagem local na caixa, Nota recolhível, Excluir seleção, Desfazer, Refazer.

### Menu Exibir

**Visualização:** Aumentar zoom, Diminuir zoom, Tela cheia.

**Organizar mapa:** Em árvore (horizontal), Hierárquico (vertical), Radial.

**Navegação:** Buscar nós, Mostrar/ocultar minimapa, Ajustar à tela, Centralizar origem.

**Aparência:** Alternar claro/escuro, Modo claro, Modo escuro, Personalizar aparência….

**Ferramentas de navegação:** Ponteiro, Mãozinha.

### Menu Sistema

**Preferências:** Configurações….

**Notificações:** Central de notificações….

**Manutenção:** Abrir Manutenção….

### Menu Ajuda

**Documentação:** GitHub, Manual, Sobre.

**Referência de controles:** Atalhos, Mapa de Ícones e botões.



## Correção v49.1 — contraste dos nós

A alternância claro/escuro agora atualiza a cor do conteúdo das caixas neutras, incluindo títulos, descrições, checklists e textos integrados. Não modifica os dados ou as cores escolhidas dos projetos.


## Compatibilidade de tela — v49.3

A interface completa do Mentalista requer uma área útil da janela de pelo menos **625 × 500 pixels CSS**. Se a largura for inferior a 625 px **ou** a altura for inferior a 500 px, o aplicativo apresenta uma tela informativa com a mensagem “Grandes ideias precisam de espaço.” e as dimensões mínimas recomendadas.

A verificação usa media queries CSS, sem depender do modelo do aparelho ou do user agent. Ao redimensionar a janela ou girar o dispositivo, a interface se adapta automaticamente. Enquanto a tela de compatibilidade estiver ativa, os controles do aplicativo são ocultados e não recebem foco. A tela funciona offline por usar apenas recursos locais do próprio PWA.

**Privacidade:** a tela não afirma que projetos são sincronizados ou armazenados em outros dispositivos. Os projetos continuam sendo armazenados localmente pelo navegador, conforme a política geral do Mentalista.

**Observação:** 625 px de largura foi informado como limite utilizável em teste no Chrome; 500 px de altura é o limite adotado para esta implementação.


## Compatibilidade de tela — v49.4

A tela informativa de dimensões mínimas **625 × 500 px CSS** aparece apenas em plataformas móveis reconhecidas pelo identificador de navegador (Android, iPhone, iPod e iPad), quando a área útil for menor do que uma dessas dimensões. Em Windows, macOS, Linux e plataformas não identificadas, o aviso não é acionado, mesmo com a janela pequena ou com o DevTools aberto.

A identificação por *user agent* não é infalível: alguns tablets podem anunciar uma plataforma desktop. Em caso de dúvida, a interface é liberada. Não usamos `pointer: coarse`, detecção de mouse ou detecção genérica de tela sensível ao toque.

A versão v49.4 substitui a regra indiscriminada da v49.3; as demais funcionalidades são preservadas.
