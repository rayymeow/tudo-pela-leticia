# THE BESTIE ISSUE — GitHub Pages

Uma revistinha/flipbook digital de aniversário feita com HTML, CSS e JavaScript puros.

## Publicar

1. Extraia o ZIP.
2. Envie `index.html`, `style.css` e `script.js` para a raiz do repositório.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`.
5. Salve e aguarde a publicação do GitHub Pages.

## Personalizar

- Data de início da amizade: `friendshipStart` no `script.js` (05/05/2022).
- Aniversário: mês/dia configurados em `updateCounters()` no `script.js` (26 de novembro).
- Textos, imagens, quotes e páginas: `index.html`.
- Paleta: variáveis CSS no início de `style.css`.

## Interações

- Navegação por botões, bolinhas, índice, teclado (← →) e gesto de arrastar no celular.
- Carta final abre ao clicar no envelope.
- Adesivos clicáveis, brilhos discretos no cursor e transições entre páginas.
- O layout se adapta a telas menores e respeita a opção de reduzir animações do sistema.

## Imagens

As imagens são carregadas de endereços externos. É necessário estar conectado à internet; um site de origem pode bloquear a incorporação ou mudar o arquivo. Caso isso aconteça, a página mostra um fundo de reserva com a legenda da imagem. Para tornar tudo totalmente independente, você pode salvar as imagens que tiver autorização para usar em uma pasta `images/` e trocar os `src` do HTML por caminhos locais.
