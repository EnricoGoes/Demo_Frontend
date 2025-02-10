console.log("Script carregado!");

const API_URL = "http://localhost:8081/livro";
const API_URL2 = "http://localhost:8081/genero";

async function fetchData(url) {
    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error("Erro ao buscar dados do servidor");
    }
    return resposta.json();
}

function criarBotoes(id, tipo) {
    return `
        <button class="btn-visualizar" onclick="verDetalhes${tipo}(${id})">Ver Detalhes</button>
        <button class="btn-editar" onclick="verEditar${tipo}(${id})">Editar</button>
        <button class="btn-deletar" onclick="deletar${tipo}(${id})">Deletar</button>
    `;
}

function renderizarTabela(dados, tipo) {
    const corpoTabela = document.getElementById(`${tipo}Corpo`);
    corpoTabela.innerHTML = "";

    dados.forEach((item) => {
        const row = document.createElement("tr");
        if (tipo === "livros") {
            row.innerHTML = `
                <td>${item.titulo}</td>
                <td>${item.autor}</td>
                <td>${item.anoPublicacao}</td>
                <td>${item.numPaginas}</td>
                <td>${item.preco}</td>
                <td>${criarBotoes(item.idLivro, tipo)}</td>
            `;
        } else if (tipo === "generos") {
            row.innerHTML = `
                <td>${item.nome}</td>
                <td>${criarBotoes(item.id, tipo)}</td>
            `;
        }
        corpoTabela.appendChild(row);
    });
}

async function getLivros() {
    console.log("getLivros() foi chamada!");
    try {
        const respostaLivros = await fetch(`${API_URL}/listall`);
        console.log("Resposta Livros:", respostaLivros);

        const respostaGeneros = await fetch(`${API_URL2}/listall`);
        console.log("Resposta Gêneros:", respostaGeneros);

        if (!respostaLivros.ok || !respostaGeneros.ok) {
            throw new Error("Erro ao buscar dados do servidor");
        }

        const livros = await respostaLivros.json();
        console.log("Dados dos Livros:", livros);

        const generos = await respostaGeneros.json();
        console.log("Dados dos Gêneros:", generos);

        renderizarTabela(livros, "livros");
        renderizarTabela(generos, "generos");

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado! Chamando getLivros...");
    getLivros();
});
