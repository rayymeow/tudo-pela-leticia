# for my saturn ♡ — GitHub Pages

Um site de aniversário em formato de colagem vertical, com estética Y2K/webcore, cores saturadas, adesivos PNG transparentes, fotos em composições irregulares e dedicatórias pessoais.

## Publicar no GitHub Pages

1. Extraia o arquivo ZIP.
2. Envie `index.html`, `style.css` e `script.js` para a raiz do seu repositório.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`.
5. Salve. O GitHub Pages publicará o site no endereço do repositório.

## Arquivos

- `index.html` — estrutura, textos, imagens e dedicatórias.
- `style.css` — cores, layouts, tipografia, responsividade e animações.
- `script.js` — contador, lightbox, carta interativa, botão de surpresas e brilhos.

## Personalizar datas

No `script.js`, a amizade começa em `new Date(2022, 4, 5)` (mês `4` significa maio em JavaScript). A data de aniversário está configurada como 26 de novembro, com o próximo aniversário calculado automaticamente.

## Imagens

As imagens dos gatinhos e alguns memes são carregados diretamente dos arquivos públicos do Carrd de referência (`formyviolett.carrd.co`). As demais imagens usam URLs de fontes externas. Por isso, o site precisa de internet e a disponibilidade pode mudar caso os sites de origem removam ou bloqueiem os arquivos.

Os PNGs dos gatinhos usam `height: auto` e `object-fit: contain`; eles não ficam presos a molduras com `overflow: hidden`, para preservar a transparência e evitar que as patinhas/orelhas sejam cortadas. Imagens de personagens em áreas de foto usam enquadramentos próprios. Quando uma imagem falha, o espaço não colapsa nem deixa o ícone quebrado.

Para deixar tudo independente de terceiros, salve imagens que você tenha autorização para usar dentro de uma pasta `assets/` e substitua os endereços externos no HTML por caminhos locais, por exemplo `assets/gato.png`.

## Interações

- Navegação por âncoras entre seções.
- Contador de dias desde 05/05/2022 e contagem para o próximo 26/11.
- Fotos e artes clicáveis para abrir em tela ampliada.
- Botão para sortear pequenas mensagens pessoais.
- Envelope com carta que abre e fecha.
- Brilhos sutis no cursor em computadores.
- Layout adaptado para celular e respeito à preferência `prefers-reduced-motion`.
