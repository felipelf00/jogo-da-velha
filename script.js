const tabuleiro = (() => {
  let grid = [];

  const limpar = () => {
    for (var i = 0; i < 3; i++) {
      grid[i] = [];
      for (var j = 0; j < 3; j++) {
        grid[i].push("-");
      }
    }
    mostrarTabuleiro();
  };

  const mostrarTabuleiro = () => {
    console.log(tabuleiro.grid);
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const celula = document.getElementById(`${i}${j}`);
        switch (grid[i][j]) {
          case "1":
            celula.textContent = "X";
            break;
          case "2":
            celula.textContent = "O";
            break;
          default:
            celula.textContent = "";
            break;
        }
      }
    }
  };

  const atribuirCelulas = (() => {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const celula = document.getElementById(`${i}${j}`);
        const linha = i;
        const coluna = j;
        celula.onclick = () => meuJogo.jogar(linha, coluna);
      }
    }
  })();

  return { grid, limpar, mostrarTabuleiro };
})();

const jogo = (nome1, nome2) => {
  const jogadores = [
    {
      nome: nome1,
      marcador: "1",
      pontuacao: 0,
    },
    {
      nome: nome2,
      marcador: "2",
      pontuacao: 0,
    },
  ];

  let jogadorAtivo = "";

  const mostrarJogadorAtivo = () => {
    const ativo = document.querySelector("#jogador-ativo");
    ativo.textContent = `Agora é a vez de ${jogadorAtivo.nome}`;
  };

  const sorteio = () => {
    jogadorAtivo = jogadores[Math.floor(Math.random() * 2)];
    mostrarJogadorAtivo();
  };

  sorteio();

  const alternarJogador = () => {
    jogadorAtivo === jogadores[0]
      ? (jogadorAtivo = jogadores[1])
      : (jogadorAtivo = jogadores[0]);
    mostrarJogadorAtivo();
  };

  const jogar = (linha, coluna) => {
    //verificar se a jogada é válida, se sim, alterar célula do grid e alternar jogador - ok
    //se não, retornar erro e jogar novamente.
    //verificar fim de jogo.
    if (tabuleiro.grid[linha][coluna] === "-") {
      tabuleiro.grid[linha][coluna] = jogadorAtivo.marcador;
      alternarJogador();
      tabuleiro.mostrarTabuleiro();
      if (fimDeJogo()) declararVencedor(fimDeJogo());
    }
  };

  const fimDeJogo = () => {
    if (!tabuleiro.grid.flat().includes("-")) {
      return "empate";
    }

    const lin1 = tabuleiro.grid[0].join("");
    const lin2 = tabuleiro.grid[1].join("");
    const lin3 = tabuleiro.grid[2].join("");
    const col1 = tabuleiro.grid.map((linha) => linha[0]).join("");
    const col2 = tabuleiro.grid.map((linha) => linha[1]).join("");
    const col3 = tabuleiro.grid.map((linha) => linha[2]).join("");
    const diag1 =
      tabuleiro.grid[0][0] + tabuleiro.grid[1][1] + tabuleiro.grid[2][2];
    const diag2 =
      tabuleiro.grid[0][2] + tabuleiro.grid[1][1] + tabuleiro.grid[2][0];

    switch (true) {
      case lin1 === "111":
      case lin2 === "111":
      case lin3 === "111":
      case col1 === "111":
      case col2 === "111":
      case col3 === "111":
      case diag1 === "111":
      case diag2 === "111":
        return jogadores[0].nome;

      case lin1 === "222":
      case lin2 === "222":
      case lin3 === "222":
      case col1 === "222":
      case col2 === "222":
      case col3 === "222":
      case diag1 === "222":
      case diag2 === "222":
        return jogadores[1].nome;

      default:
        return false;
    }
  };

  const fim = document.getElementById("fim-de-jogo");
  const resultado = document.getElementById("resultado");

  const declararVencedor = (vencedor) => {
    console.log(vencedor);

    const para = document.createElement("p");

    switch (vencedor) {
      case "empate":
        para.textContent = "Empate";
        break;
      default:
        para.textContent = `Vencedor: ${vencedor}`;
        break;
    }

    resultado.appendChild(para);
    fim.style.display = "grid";
  };

  const botaoReplay = document.getElementById("replay");
  botaoReplay.onclick = () => {
    tabuleiro.limpar();
    resultado.innerHTML = "";
    fim.style.display = "none";
    sorteio();
  };

  return { jogar, fimDeJogo };
};

tabuleiro.limpar();
tabuleiro.mostrarTabuleiro();

const meuJogo = jogo("clifton", "macnamara");
