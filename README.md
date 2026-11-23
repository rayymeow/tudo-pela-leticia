# Little Universe Club — site de aniversário

Um scrapbook digital responsivo feito com HTML, CSS e JavaScript puro, pronto para GitHub Pages.

## Arquivos

- `index.html` — estrutura do site (é a página inicial do GitHub Pages).
- `style.css` — identidade visual, layout responsivo e animações.
- `script.js` — contadores, abas interativas, cartões, modais, brilho e embaralhamento da colagem.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Extraia o ZIP e envie `index.html`, `style.css`, `script.js` e este README para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione `main` e `/ (root)` e salve.
5. Aguarde o GitHub publicar o endereço do site.

## Personalizar

- A data de início da amizade está em `script.js`, na constante `friendshipStart` (atualmente 05/05/2022).
- O aniversário está definido para 26 de novembro, com a contagem apontando automaticamente para a próxima ocorrência.
- Os textos da cartinha estão no final de `index.html`, dentro de `#surprise-dialog`.
- Para trocar uma imagem, substitua o endereço do atributo `src` do `<img>` correspondente em `index.html`.
- As cinco cores principais estão no início de `style.css` como variáveis CSS: `--light-yellow`, `--tea-green`, `--willow`, `--berry` e `--midnight`.

## Sobre as imagens

As fotografias/ilustrações são carregadas de endereços externos e precisam de conexão à internet. Alguns servidores podem bloquear incorporação externa ou alterar os endereços com o tempo. Nesses casos, o site mostra uma arte substituta com emoji e identificação da dupla. Os créditos e links das páginas de referência ficam no rodapé do próprio site.

## Compatibilidade

Não usa frameworks nem bibliotecas JavaScript externas. Funciona como site estático em navegadores modernos. A fonte é carregada pelo Google Fonts; se não houver conexão, entram fontes alternativas locais.
