let listaDeNumerosSorteados = [];
let numeroLimite10 = 10;
let numeroLimite100 = 100;
let numeroLimite1000 = 1000;
let numeroLimite = numeroLimite10;
let numeroSecreto = gerarNumeroAleatorio(numeroLimite);
let tentativas = 1;
let nivelSelecionado = '';

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function atualizarMensagemNivel() {
    nivelSelecionado = document.getElementById('nivelSelecao').value;
    let mensagemNivel = document.getElementById('mensagemNivel');

    if (nivelSelecionado === '') {
        mensagemNivel.innerHTML = 'Selecione o nível de dificuldade';
    } else {
        mensagemNivel.innerHTML = `Selecione o nível de 1 a ${nivelSelecionado}`;
        numeroSecreto = gerarNumeroAleatorio(parseInt(nivelSelecionado));
    }
}

atualizarMensagemNivel();

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Selecione o nível de dificuldade');
}

exibirMensagemInicial();

function verificarChute() {
    let campoChute = document.getElementById('campoChute');
    let mensagem;
    let mensagemTentativas;

    if (nivelSelecionado === '') {
        exibirTextoNaTela('p', 'Selecione o nível de dificuldade antes de chutar');
        return;
    }

    let chute = parseInt(campoChute.value);

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        switch (nivelSelecionado) {
            case '10':
            case '100':
            case '1000':
                mensagem = chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior';
                break;
            default:
                mensagem = 'Nível de dificuldade inválido';
                break;
        }

        exibirTextoNaTela('p', mensagem);
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(nivelSelecionado) {
    const limites = {
        '10': 10,
        '100': 100,
        '1000': 1000
    };

    const limite = limites[nivelSelecionado];

    const numeroEscolhido = Math.floor(Math.random() * limite) + 1;

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(nivelSelecionado);
    }

    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
}

function limparCampo() {
    let campoChute = document.getElementById('campoChute');
    campoChute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(nivelSelecionado);
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}