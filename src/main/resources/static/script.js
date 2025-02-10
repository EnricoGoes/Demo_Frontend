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
    try {
        const [livros, generos] = await Promise.all([
            fetchData(`${API_URL}/listall`),
            fetchData(`${API_URL2}/listall`)
        ]);

        renderizarTabela(livros, "livros");
        renderizarTabela(generos, "generos");

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        alert("Falha ao carregar livros e gêneros!");
    }
}