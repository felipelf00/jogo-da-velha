const tabuleiro = (() => {
  let grid = [];

  const limpar = () => {
    for (var i = 0; i < 3; i++) {
      grid[i] = [];
      for (var j = 0; j < 3; j++) {
        grid[i].push("-");
      }
    }
  };

  const mostrarTabuleiro = () => {};

  return { grid, limpar, mostrarTabuleiro };
})();

const controlador = (nome1, nome2) => {
  const jogadores = [
    {
      nome: nome1,
      marcador: "X",
      pontuacao: 0,
    },
    {
      nome: nome2,
      marcador: "O",
      pontuacao: 0,
    },
  ];

  let jogadorAtivo = jogadores[0];

  const sorteio = () => {
    jogadorAtivo = jogadores[Math.floor(Math.random() * 2)];
  };

  const alternarJogador = () => {
    jogadorAtivo === jogadores[0]
      ? (jogadorAtivo = jogadores[1])
      : (jogadorAtivo = jogadores[0]);
  };

  const jogar = (linha, coluna) => {
    //verificar se a jogada é válida, se sim, alterar célula do grid e alternar jogador - ok
    //se não, retornar erro e jogar novamente.
    //verificar fim de jogo.
    if (tabuleiro.grid[linha][coluna] === "-") {
      tabuleiro.grid[linha][coluna] = jogadorAtivo.marcador;
      alternarJogador();
    }
  };

  const fimDeJogo = () => {
    const col1 = tabuleiro.grid.map((linha) => linha[0]).join("");
    const col2 = tabuleiro.grid.map((linha) => linha[1]).join("");
    const col3 = tabuleiro.grid.map((linha) => linha[2]).join("");
  };
};
