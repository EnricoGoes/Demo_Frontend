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

// Função para criar botões para livros
function BotoesLivro(livro) {
    return `
        <button class="btn-visualizar" onclick="verDetalhesLivro(${livro.idLivro})">Ver Detalhes</button>
        <button class="btn-editar" onclick="verEditarLivro(${livro.idLivro})">Editar</button>
        <button class="btn-deletar" onclick="deletarLivro(${livro.idLivro})">Deletar</button>
    `;
}

// Função para criar botões para gêneros
function BotoesGenero(genero) {
    return `
        <button class="btn-visualizar" onclick="verDetalhesGenero(${genero.id})">Ver Detalhes</button>
        <button class="btn-editar" onclick="verEditarGenero(${genero.id})">Editar</button>
        <button class="btn-deletar" onclick="deletarGenero(${genero.id})">Deletar</button>
    `;
}

// Renderiza apenas os livros
function renderizarTabelaLivros(livros) {
    const corpoTabelaLivros = document.getElementById("livrosCorpo");
    corpoTabelaLivros.innerHTML = "";

    livros.forEach((livro) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.anoPublicacao}</td>
            <td>${livro.numPaginas}</td>
            <td>${livro.preco}</td>
            <td>${BotoesLivro(livro)}</td>
        `;
        corpoTabelaLivros.appendChild(row);
    });
}

// Renderiza apenas os gêneros
function renderizarTabelaGeneros(generos) {
    const corpoTabelaGeneros = document.getElementById("generosCorpo");
    corpoTabelaGeneros.innerHTML = "";

    generos.forEach((genero) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${genero.nome}</td>
            <td>${BotoesGenero(genero)}</td>
        `;
        corpoTabelaGeneros.appendChild(row);
    });
}

// Busca e exibe livros e gêneros
async function getLivros() {
    console.log("getLivros() foi chamada!");
    try {
        const respostaLivros = await fetch(`${API_URL}/listall`);
        console.log("Resposta Livros:", respostaLivros);

        if (!respostaLivros.ok) {
            throw new Error("Erro ao buscar livros do servidor");
        }

        const livros = await respostaLivros.json();
        console.log("Dados dos Livros:", livros);

        renderizarTabelaLivros(livros);

    } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
    }
}

async function getGeneros() {
    console.log("getGeneros() foi chamada!");
    try {
        const respostaGeneros = await fetch(`${API_URL2}/listall`);
        console.log("Resposta Gêneros:", respostaGeneros);

        if (!respostaGeneros.ok) {
            throw new Error("Erro ao buscar gêneros do servidor");
        }

        const generos = await respostaGeneros.json();
        console.log("Dados dos Gêneros:", generos);

        renderizarTabelaGeneros(generos);

    } catch (erro) {
        console.error("Erro ao carregar gêneros:", erro);
    }
}

// Função para deletar livro com confirmação
async function deletarLivro(id) {
    if (!confirm("Tem certeza que deseja deletar este livro?")) {
        return; // Se o usuário cancelar, a função para aqui
    }

    console.log("Deletar livro com id:", id);
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!resposta.ok) {
            throw new Error("Erro ao deletar livro");
        }
        alert("Livro deletado com sucesso!");
        getLivros(); // Atualiza a tabela após deletar
    } catch (erro) {
        console.error("Erro ao deletar livro:", erro);
        alert("Erro ao deletar livro. Tente novamente.");
    }
}

// Função para deletar gênero com confirmação
async function deletarGenero(id) {
    if (!confirm("Tem certeza que deseja deletar este gênero?")) {
        return; // Se o usuário cancelar, a função para aqui
    }

    console.log("Deletar gênero com id:", id);
    try {
        const resposta = await fetch(`${API_URL2}/${id}`, {
            method: "DELETE",
        });
        if (!resposta.ok) {
            throw new Error("Erro ao deletar gênero");
        }
        alert("Gênero deletado com sucesso!");
        getGeneros(); // Atualiza a tabela após deletar
    } catch (erro) {
        console.error("Erro ao deletar gênero:", erro);
        alert("Erro ao deletar gênero. Tente novamente.");
    }
}



// Carrega os dados quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado! Chamando getLivros e getGeneros...");
    getLivros();
    getGeneros();
});
