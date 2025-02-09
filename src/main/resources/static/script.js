const API_URL = "http://localhost:8081/livros";
const API_URL2 = "http://localhost:8081/generos";


async function addLivro() {
  const livro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    isbn: document.getElementById("isbn").value,
    ano_publicacao: document.getElementById("ano_publicacao").value,
    editora: document.getElementById("editora").value,
    sinopse: document.getElementById("sinopse").value,
    idioma: document.getElementById("idioma").value,
    preco: document.getElementById("preco").value,
    genero: document.getElementById("genero").value,
    num_paginas: document.getElementById("num_paginas").value,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livro),
  });

  if (response.ok) {
    alert("Livro cadastrado com sucesso!");
    listarLivros();
  } else {
    alert("Erro ao cadastrar o livro.");
  }
}

async function listarLivros() {
  const response = await fetch(`${API_URL}/listall`);
  const response2 = await fetch(`${API_URL2}/listall`);
  
  const generos = await response2.json(); // Corrigido: Adicionar ()
  const livros = await response.json();

  const livrosCorpo = document.getElementById("livrosCorpo");
  livrosCorpo.innerHTML = ""; // Limpa a tabela de livros

 
  
  // Adicionar os livros
  livros.forEach((livro) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${livro.titulo}</td>
      <td>${livro.autor}</td>
      <td>${livro.anoPublicacao}</td>
      <td>${livro.numPaginas}</td>
      <td>${livro.preco}</td>
      <td>
        <button class="btn-visualizar" onclick="mostrarDetalhes(${livro.idLivro})">
          Ver Detalhes
        </button>
        <button class="btn-editar" onclick="mostrarEditar(${livro.idLivro})">
          Atualizar
        </button>
        <button class="btn-deletar" onclick="deletarLivro(${livro.idLivro})">
          Deletar
        </button>
      </td>
    `;
    livrosCorpo.appendChild(row);
  });

  const generosCorpo = document.getElementById("generosCorpo");
  generosCorpo.innerHTML = ""; // Limpa a tabela de gêneros

  // Adicionar os gêneros
  generos.forEach((genero) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${genero.nome}</td>
      <td>
        <button class="btn-visualizar" onclick="mostrarDetalhes2(${genero.id})">
          Ver Detalhes
        </button>
        <button class="btn-editar" onclick="mostrarEditar2(${genero.id})">
          Atualizar
        </button>
        <button class="btn-deletar" onclick="deletarGenero(${genero.id})">
          Deletar
        </button>
      </td>
    `;
    generosCorpo.appendChild(row);
  });
}
async function deletarGenero(id) {
  const response = await fetch(`${API_URL2}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Gênero deletado com sucesso!");
    listarLivros(); // Atualiza a lista de livros, já que os gêneros também estão na mesma página
  } else {
    alert("Erro ao deletar o gênero.");
  }
}
async function preencherFormularioAtualizacao(id) {
  const response = await fetch(`${API_URL}/${id}`);

  const livro = await response.json();
  console.log(livro);
  document.getElementById("idLivroAtualizar").value = id;
  document.getElementById("tituloAtualizar").value = livro.titulo;
  document.getElementById("autorAtualizar").value = livro.autor;
  document.getElementById("generoAtualizar").value = livro.genero;
  document.getElementById("idiomaAtualizar").value = livro.idioma;
  document.getElementById("precoAtualizar").value = livro.preco;
  document.getElementById("num_paginasAtualizar").value = livro.num_paginas;
  document.getElementById("editoraAtualizar").value = livro.editora;
  document.getElementById("ano_publicacaoAtualizar").value =
    livro.ano_publicacao;
  document.getElementById("isbnAtualizar").value = livro.isbn;
  document.getElementById("sinopseAtualizar").value = livro.sinopse;
}

async function atualizarLivro() {
  const livroAtualizado = {
    id_livro: document.getElementById("idLivroAtualizar").value,
    titulo: document.getElementById("tituloAtualizar").value,
    autor: document.getElementById("autorAtualizar").value,
    genero: document.getElementById("generoAtualizar").value,
    idioma: document.getElementById("idiomaAtualizar").value,
    preco: document.getElementById("precoAtualizar").value,
    num_paginas: document.getElementById("num_paginasAtualizar").value,
    editora: document.getElementById("editoraAtualizar").value,
    ano_publicacao: document.getElementById("ano_publicacaoAtualizar").value,
    isbn: document.getElementById("isbnAtualizar").value,
    sinopse: document.getElementById("sinopseAtualizar").value,
  };

  const idLivro = document.getElementById("idLivroAtualizar").value;

  const response = await fetch(`${API_URL}/${idLivro}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livroAtualizado),
  });

  if (response.ok) {
    alert("Livro atualizado com sucesso!");
    listarLivros();
  } else {
    alert("Erro ao atualizar o livro.");
  }
}

async function deletarLivro(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Livro deletado com sucesso!");
    listarLivros();
  } else {
    alert("Erro ao deletar o livro.");
  }
}




function mostrarDetalhes(id) {
  window.location.href = `/Cadastro?id=${id}&modo=visualizar`;
}
function mostrarDetalhes2(id) {
  window.location.href = `/CadastroGenero?id=${id}&modo=visualizar`;
}

function mostrarEditar(id) {
  window.location.href = `/Cadastro?id=${id}&modo=editar`;
}

function mostrarEditar2(id) {
  window.location.href = `/CadastroGenero?id=${id}&modo=editar`;
}

const tabelaCorpo = document.getElementById("tabelaCorpo");

window.onload = listarLivros;
