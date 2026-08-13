// ======================
// ELEMENTOS
// ======================

const telaCapa = document.getElementById("capa");
const btnContinuarCapa = document.getElementById("btnContinuarCapa");

const telaInicio = document.getElementById("inicio");
const telaJogo = document.getElementById("jogo");
const telaFinal = document.getElementById("final");

const btnComecar = document.getElementById("btnComecar");
const btnProxima = document.getElementById("btnProxima");
const btnReiniciar = document.getElementById("btnReiniciar");

const textoSituacao = document.getElementById("textoSituacao");
const alternativas = document.getElementById("alternativas");

const feedback = document.getElementById("feedback");
const tituloFeedback = document.getElementById("tituloFeedback");
const textoFeedback = document.getElementById("textoFeedback");

const pontuacaoEl = document.getElementById("pontuacao");
const atualEl = document.getElementById("atual");
const totalEl = document.getElementById("total");

const barraProgresso = document.getElementById("barraProgresso");
const barraProgressoContainer = document.getElementById("barraProgressoContainer");

const pontuacaoFinal = document.getElementById("pontuacaoFinal");
const mensagemFinal = document.getElementById("mensagemFinal");


let cenaAtualId = "S2";
let pontuacao = 0;

const TODAS_CONSEQUENCIAS = ["S2A", "S3A", "S4A", "S8A", "S9A"];

// Guarda quais cenas de consequência o jogador realmente visitou
let consequenciasVisitadas = new Set();


const cenas = {

    // ---------- S2 ----------
    S2: {
        tipo: "pergunta",
        ordem: 2,
        texto: "Estou pensando em começar minha vida sexual. Quero me cuidar, mas não sei bem o que usar.",
        opcoes: [
            {
                texto: "Camisinha",
                correta: true,
                proxima: "S3",
                mensagem: "Isso mesmo! A camisinha (masculina ou feminina) é o único método que também protege contra ISTs."
            },
            {
                texto: "Só a pílula",
                correta: false,
                proxima: "S2A"
            },
            {
                texto: "Não usar nada",
                correta: false,
                proxima: "S2A"
            }
        ]
    },

    S2A: {
        tipo: "consequencia",
        texto: "Algumas semanas depois, Renata percebe que precisa ir ao posto de saúde — ela pode ter se exposto a uma IST, porque a pílula (ou nenhum método) não protege contra infecções, só a camisinha faz isso.\n\n\"Nossa, eu não sabia que só a camisinha protege contra as duas coisas...\"",
        botao: "Entendi, vou usar camisinha da próxima vez",
        proxima: "S3"
    },

    // ---------- S3 ----------
    S3: {
        tipo: "pergunta",
        ordem: 3,
        texto: "Meu parceiro disse que não precisa de camisinha, que ele confia em mim.",
        opcoes: [
            {
                texto: "Conversar sobre a importância da proteção",
                correta: true,
                proxima: "S4",
                mensagem: "Show! Conversar sobre proteção é sempre a escolha mais segura, mesmo quando existe confiança entre o casal."
            },
            {
                texto: "Aceitar sem discutir",
                correta: false,
                proxima: "S3A"
            }
        ]
    },

    S3A: {
        tipo: "consequencia",
        texto: "Renata cedeu à pressão. Depois, ficou preocupada e foi conversar com uma amiga, que explicou: confiança é importante, mas não impede gravidez nem IST.",
        botao: "Da próxima vez vou conversar sobre isso",
        proxima: "S4"
    },

    // ---------- S4 ----------
    S4: {
        tipo: "pergunta",
        ordem: 4,
        texto: "Tomo pílula, mas esqueci um dia. E agora?",
        opcoes: [
            {
                texto: "Buscar orientação (farmácia ou posto de saúde)",
                correta: true,
                proxima: "S5",
                mensagem: "Boa! Buscar orientação rapidamente é sempre a atitude mais segura quando isso acontece."
            },
            {
                texto: "Ignorar e continuar normal",
                correta: false,
                proxima: "S4A"
            }
        ]
    },

    S4A: {
        tipo: "consequencia",
        texto: "Renata ignorou o esquecimento. Semanas depois, ficou com medo de estar grávida e precisou fazer um teste. Aprendeu que, ao esquecer a pílula, o ideal é buscar orientação o quanto antes.",
        botao: "Vou lembrar disso",
        proxima: "S5"
    },

    // ---------- S5 (sem ramificação) ----------
    S5: {
        tipo: "pergunta",
        ordem: 5,
        texto: "Queria um método que eu não precise lembrar todo dia.",
        opcoes: [
            {
                texto: "Anel vaginal",
                correta: true,
                proxima: "S6",
                mensagem: "Isso mesmo! O anel vaginal não precisa ser lembrado todos os dias, diferente da pílula."
            },
            {
                texto: "Pílula",
                correta: false,
                proxima: "S6",
                feedback: "A pílula precisa ser tomada todo dia — o anel vaginal, não."
            }
        ]
    },


    S6: {
        tipo: "pergunta",
        ordem: 6,
        texto: "Quais desses métodos usam hormônio?",
        opcoes: [
            {
                texto: "Implante, anel vaginal e adesivo",
                correta: true,
                proxima: "S7",
                mensagem: "Isso mesmo! Implante, anel vaginal e adesivo são métodos hormonais."
            },
            {
                texto: "DIU de cobre",
                correta: false,
                proxima: "S7",
                feedback: "O DIU de cobre não tem hormônio — é diferente dos outros três."
            }
        ]
    },


    S7: {
        tipo: "pergunta",
        ordem: 7,
        texto: "E os métodos que não usam hormônio nem aparelho, como funcionam?",
        opcoes: [
            {
                texto: "Tabelinha, muco cervical e temperatura do corpo",
                correta: true,
                proxima: "S8",
                mensagem: "Isso mesmo! Esses três métodos naturais funcionam melhor quando usados juntos."
            },
            {
                texto: "Só a tabelinha",
                correta: false,
                proxima: "S8",
                feedback: "Esses três métodos juntos funcionam melhor — sozinha, a tabelinha é menos confiável."
            }
        ]
    },

    S8: {
        tipo: "pergunta",
        ordem: 8,
        texto: "Ouvi dizer que é só o parceiro sair antes de terminar. Isso resolve?",
        opcoes: [
            {
                texto: "Não",
                correta: true,
                proxima: "S9",
                mensagem: "Isso mesmo! O coito interrompido não é um método confiável sozinho."
            },
            {
                texto: "Sim",
                correta: false,
                proxima: "S8A"
            }
        ]
    },

    S8A: {
        tipo: "consequencia",
        texto: "Renata confiou nesse método. Meses depois, o susto de um atraso menstrual mostrou que esse método falha bastante — não é confiável sozinho.",
        botao: "Vou usar um método mais seguro",
        proxima: "S9"
    },

    S9: {
        tipo: "pergunta",
        ordem: 9,
        texto: "A camisinha rasgou durante a relação. O que eu faço?",
        opcoes: [
            {
                texto: "Buscar orientação sobre a pílula do dia seguinte o quanto antes",
                correta: true,
                proxima: "S10",
                mensagem: "Isso mesmo! Agir rápido é essencial nesse tipo de situação."
            },
            {
                texto: "Esperar e ver o que acontece",
                correta: false,
                proxima: "S9A"
            }
        ]
    },

    S9A: {
        tipo: "consequencia",
        texto: "Renata esperou demais. Depois descobriu que, se tivesse buscado a pílula do dia seguinte logo, teria evitado a preocupação com uma gravidez não planejada.",
        botao: "Da próxima vez vou agir rápido",
        proxima: "S10"
    },

    S10: {
        tipo: "pergunta",
        ordem: 10,
        texto: "Tenho certeza que não quero ter filhos no futuro. Existe algo definitivo?",
        opcoes: [
            {
                texto: "Vasectomia (para homens) e laqueadura (para mulheres)",
                correta: true,
                proxima: "S11",
                mensagem: "Isso mesmo! Vasectomia e laqueadura são métodos definitivos."
            },
            {
                texto: "Pílula e DIU",
                correta: false,
                proxima: "S11",
                feedback: "Esses dois são reversíveis — não impedem a fertilidade para sempre."
            }
        ]
    },

    S11: {
        tipo: "pergunta",
        ordem: 11,
        texto: "Depois de tudo isso, o que eu preciso lembrar sempre que puder proteger contra ISTs também?",
        opcoes: [
            {
                texto: "Camisinha (masculina ou feminina)",
                correta: true,
                proxima: "S12",
                mensagem: "Isso mesmo! Só a camisinha evita gravidez e protege contra ISTs ao mesmo tempo."
            },
            {
                texto: "Qualquer método hormonal",
                correta: false,
                proxima: "S12",
                feedback: "Métodos hormonais evitam gravidez, mas não protegem contra IST. Só a camisinha faz as duas coisas."
            }
        ]
    },

    // ---------- S12 (final) ----------
    S12: {
        tipo: "final"
    }

};


totalEl.textContent = "12";


btnContinuarCapa.addEventListener("click", () => {

    telaCapa.classList.remove("ativa");
    telaInicio.classList.add("ativa");

});

btnComecar.addEventListener("click", () => {

    telaInicio.classList.remove("ativa");
    telaJogo.classList.add("ativa");

    carregarCena("S2");

});


function carregarCena(id){

    cenaAtualId = id;

    const cena = cenas[id];

    if(cena.tipo === "final"){

        finalizar();
        return;

    }

    if(cena.tipo === "consequencia"){

        carregarConsequencia(cena, id);
        return;

    }

    carregarPergunta(cena);

}
function embaralhar(array){

    for(let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    return array;

}

function carregarPergunta(cena){

    embaralhar(cena.opcoes);

    textoSituacao.textContent = cena.texto;

    atualEl.textContent = cena.ordem;

    feedback.style.display = "none";
    btnProxima.style.display = "none";

    alternativas.innerHTML = "";

    const progresso =
        ((cena.ordem - 1) / 12) * 100;

    barraProgresso.style.width =
        progresso + "%";

    barraProgressoContainer.setAttribute(
        "aria-valuenow",
        Math.round(progresso)
    );

    cena.opcoes.forEach((opcao, i) => {

        const btn = document.createElement("button");

        btn.textContent = opcao.texto;

        btn.addEventListener("click", () => {

            responder(i);

        });

        alternativas.appendChild(btn);

    });

}


function responder(escolha){

    const cena = cenas[cenaAtualId];

    const opcao = cena.opcoes[escolha];

    const indiceCorreta =
        cena.opcoes.findIndex(o => o.correta);

    const botoes =
        alternativas.querySelectorAll("button");

    botoes.forEach(btn => {

        btn.disabled = true;

    });

    if(opcao.correta){

        botoes[escolha].classList.add("correta");

        pontuacao += 10;

        pontuacaoEl.textContent = pontuacao;

        tituloFeedback.textContent =
            "Boa escolha!";

        textoFeedback.textContent =
            opcao.mensagem || "";

    }else{

        botoes[escolha].classList.add("errada");

        botoes[indiceCorreta].classList.add("correta");

        if(opcao.feedback){

            tituloFeedback.textContent =
                "Vamos revisar";

            textoFeedback.textContent =
                opcao.feedback;

        }else{

            tituloFeedback.textContent =
                "Vamos ver o que aconteceu...";

            textoFeedback.textContent =
                "Toque em continuar para acompanhar a Renata.";

        }

    }

    feedback.style.display = "block";
    btnProxima.style.display = "block";

    btnProxima.dataset.proxima = opcao.proxima;

}

btnProxima.addEventListener("click", () => {

    const proxima = btnProxima.dataset.proxima;

    carregarCena(proxima);

});

function carregarConsequencia(cena, id){

    consequenciasVisitadas.add(id);

    textoSituacao.textContent = cena.texto;

    feedback.style.display = "none";
    btnProxima.style.display = "none";

    alternativas.innerHTML = "";

    const btn = document.createElement("button");

    btn.textContent = cena.botao;
    btn.classList.add("btn-continuar");

    btn.addEventListener("click", () => {

        carregarCena(cena.proxima);

    });

    alternativas.appendChild(btn);

}



function finalizar(){

    telaJogo.classList.remove("ativa");
    telaFinal.classList.add("ativa");

    barraProgresso.style.width = "100%";
    barraProgressoContainer.setAttribute("aria-valuenow", "100");

    pontuacaoFinal.textContent =
        pontuacao + " pontos";

    const total = TODAS_CONSEQUENCIAS.length;
    const visitadas = consequenciasVisitadas.size;

    let mensagemBase = "";

    if(visitadas === 0){

        mensagemBase =
            "Você não passou por nenhuma cena de consequência — seguiu direto pelo caminho mais seguro em todas as escolhas!";

    }else{

        mensagemBase =
            `Você passou por ${visitadas} de ${total} cenas de consequência ao longo da jornada.`;

    }

    mensagemFinal.textContent =
        "Obrigada por me ajudar nessa jornada! Agora eu sei escolher com mais segurança. " +
        mensagemBase +
        " Errar faz parte de aprender — o importante é entender o motivo de cada escolha.";

}


btnReiniciar.addEventListener("click", () => {

    pontuacao = 0;
    consequenciasVisitadas = new Set();

    pontuacaoEl.textContent = "0";

    barraProgresso.style.width = "0%";
    barraProgressoContainer.setAttribute("aria-valuenow", "0");

    telaFinal.classList.remove("ativa");
    telaJogo.classList.add("ativa");

    carregarCena("S2");

});



if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("service-worker.js")
            .catch(() => {
                
            });

    });

}
