# 26.11 — A Birthday Special

Um site de aniversário em formato de colagem editorial, com fotografias reais de cenários, molduras tipo selo/recorte, uma parede de referências e dedicatórias pessoais.

## Arquivos

- `index.html` — estrutura e conteúdo.
- `style.css` — cores, composições, layouts responsivos e animações.
- `script.js` — contador de amizade, contagem regressiva, lightbox, carta interativa, botão de desejo, embaralhar colagem e brilhos.
- `REFERENCIAS.md` — origens das imagens, transcrições e observações.

## Publicar no GitHub Pages

1. Extraia o ZIP.
2. Envie `index.html`, `style.css` e `script.js` para a raiz do repositório.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**, escolha `main` e `/ (root)` e salve.

## Personalização rápida

- Para trocar uma imagem, altere o `src` correspondente no `index.html`.
- O contador de amizade usa **05/05/2022** como data inicial.
- O aniversário é **26 de novembro** e a contagem regressiva atualiza automaticamente a cada minuto.
- As imagens são carregadas de fontes externas; o visitante precisa estar conectado à internet. Quando uma imagem externa falha, a composição permanece no lugar e mostra um fallback.

## Observação de uso

O projeto foi pensado como presente pessoal e não comercial. Imagens de séries, animações, mangás e artistas pertencem aos respectivos titulares; as páginas de origem estão listadas em `REFERENCIAS.md`.
