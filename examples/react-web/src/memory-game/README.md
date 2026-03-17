# Memory Game 🎮

Um jogo de memória divertido construído usando o framework boardgame.io.

## Sobre o Jogo

Memory Game é um jogo clássico de correspondência de pares onde você precisa encontrar todas as cartas correspondentes. O jogo apresenta:

- 🎯 8 pares de cartas (16 cartas no total)
- 🎨 Design visual atraente com animações suaves
- 📊 Rastreamento de tentativas e correspondências
- ✨ Efeitos visuais ao encontrar pares
- 📱 Design responsivo para todos os dispositivos

## Como Jogar

1. Clique em uma carta para virá-la
2. Clique em outra carta para tentar encontrar o par
3. Se as cartas combinarem, elas permanecerão viradas
4. Se não combinarem, elas voltarão após 1 segundo
5. Continue até encontrar todos os pares!

## Tecnologias Utilizadas

- **boardgame.io** - Framework de jogo para jogos baseados em turnos
- **React** - Biblioteca JavaScript para construção de interfaces
- **HTML5/CSS3** - Para a versão standalone
- **JavaScript** - Lógica do jogo

## Estrutura do Projeto

O jogo está implementado de duas formas:

### 1. Versão boardgame.io (React)
- `examples/react-web/src/memory-game/game.js` - Lógica do jogo
- `examples/react-web/src/memory-game/board.js` - Componente React do tabuleiro
- `examples/react-web/src/memory-game/board.css` - Estilos do jogo
- `examples/react-web/src/memory-game/singleplayer.js` - Configuração para um jogador
- `examples/react-web/src/memory-game/index.js` - Configuração de rotas

### 2. Versão Standalone (HTML Puro)
- `docs/memory-game.html` - Jogo completo em um único arquivo HTML

## Executando Localmente

### Versão React (com todos os exemplos)

```bash
# Instalar dependências
npm install

# Executar o servidor de desenvolvimento
npm start
```

O jogo estará disponível em `http://localhost:3000`

### Versão Standalone

Basta abrir o arquivo `docs/memory-game.html` em um navegador web.

## Deploy

O jogo é automaticamente implantado no GitHub Pages sempre que há um push para a branch `main`.

Acesse o jogo em: [https://italokbb.github.io/boardgame.io/memory-game.html](https://italokbb.github.io/boardgame.io/memory-game.html)

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novos recursos
- Melhorar o código
- Adicionar mais temas ou modos de jogo

## Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Créditos

Desenvolvido como exemplo de uso do framework [boardgame.io](https://boardgame.io)
