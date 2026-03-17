# Memory Game - Guia de Deploy 🎮

## ✅ O que foi criado

1. **Jogo de Memória completo** - Um jogo divertido de combinação de cartas com:
   - 8 pares de cartas coloridas
   - Design visual atraente
   - Animações suaves
   - Sistema de pontuação
   - Interface responsiva

2. **Duas versões do jogo**:
   - **Versão React** (integrada com boardgame.io): `examples/react-web/src/memory-game/`
   - **Versão HTML Standalone**: `docs/memory-game.html` (pronta para deploy)

3. **GitHub Actions Workflow** configurado para deploy automático

## 🚀 Como Ativar o GitHub Pages

Para que o jogo fique disponível online, você precisa ativar o GitHub Pages:

1. Vá para o repositório no GitHub: https://github.com/ItaloKbb/boardgame.io
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/docs`
5. Clique em **Save**

Após alguns minutos, o jogo estará disponível em:
**https://italokbb.github.io/boardgame.io/memory-game.html**

## 📝 Alternativa: Usar o Deploy Workflow

Há também um workflow de deploy automatizado em `.github/workflows/deploy-game.yml` que pode ser usado para fazer build e deploy da versão completa dos exemplos React.

Para usar este workflow:
1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione: **GitHub Actions**
3. O workflow irá fazer deploy automaticamente quando houver push na branch `main`

## 🎮 Como Jogar

1. Acesse o link do jogo (após ativar GitHub Pages)
2. Clique em uma carta para virá-la
3. Clique em outra carta para tentar encontrar o par
4. Continue até encontrar todos os 8 pares!

## 🔧 Desenvolvimento Local

### Versão Standalone HTML
Basta abrir o arquivo `docs/memory-game.html` em qualquer navegador.

### Versão React (com todos os exemplos)
```bash
# Na raiz do projeto
npm install
npm start
```

Acesse: http://localhost:3000 e selecione "Memory Game" no menu.

## 📦 Arquivos Criados

```
.github/workflows/
  └── deploy-game.yml          # Workflow para deploy automático

docs/
  └── memory-game.html         # Jogo standalone (versão para deploy)
  └── index.html               # Atualizado com link para o jogo

examples/react-web/src/
  └── memory-game/
      ├── game.js              # Lógica do jogo (boardgame.io)
      ├── board.js             # Componente React do tabuleiro
      ├── board.css            # Estilos do jogo
      ├── singleplayer.js      # Configuração singleplayer
      ├── index.js             # Rotas
      └── README.md            # Documentação do jogo

README.md                      # Atualizado com link do jogo
```

## 🎨 Recursos do Jogo

- ✨ Animações de flip 3D nas cartas
- 🎯 8 pares únicos com emojis coloridos
- 📊 Contador de tentativas e pares encontrados
- 🏆 Tela de vitória com estatísticas
- 🔄 Botão para jogar novamente
- 📱 Design responsivo (funciona em celular e desktop)
- 🎨 Gradientes coloridos e efeitos visuais

## 🤝 Próximos Passos

Após ativar o GitHub Pages, você pode:

1. **Compartilhar o link do jogo** com amigos
2. **Criar mais níveis** (fácil, médio, difícil)
3. **Adicionar temas diferentes** (animais, frutas, etc.)
4. **Implementar modo multiplayer** usando o boardgame.io
5. **Adicionar sons e música**
6. **Criar um leaderboard** (ranking de melhores pontuações)

## 📚 Recursos

- [boardgame.io Documentation](https://boardgame.io/documentation/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [React Documentation](https://react.dev/)

---

**Divirta-se jogando! 🎉**
