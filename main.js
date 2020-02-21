const produtos = [
    {
        id: 'abc123',
        nome: 'JSRaiz para FW',
        preco: 300,
        descricao: 'o melhor curso de js',
        imagem: 'https://lorempixel.com/500/300'
    },
    {
        id: 'bbc123',
        nome: 'JSRaiz vanilla',
        preco: 1200,
        descricao: 'o melhor curso de js',
        imagem: 'https://lorempixel.com/500/300'
    },
    {
        id: 'ttc123',
        nome: 'JSRaiz para leigos',
        preco: 1700,
        descricao: 'o top curso de js',
        imagem: 'https://lorempixel.com/500/300'
    },
    {
        id: 'yui123',
        nome: 'JSRaiz para pro',
        preco: 999,
        descricao: 'o melhor curso de js',
        imagem: 'https://lorempixel.com/500/300'
    }
];

const carrinhoItens = {};


const renderizaProduto = (produto, index) => {
    return `
      <div class="col-sm-4 mb-3">
                    <div class="card">
                        <div class="card loja_item">
                            <img src="https://lorempixel.com/500/300" alt="" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${produto.nome}</h5>
                                <small>R$ ${produto.preco}</small>
                                <p class="card-text">${produto.descricao}</p>
                                <button data-index="${index}"class="btn btn-primary btn-add">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
    `
};
const renderizaCarrinhoItem = (item) => {
    return `<div class="card carrinho_item">
                        <div class="card-body">
                            <h5 class="card-title">${item.nome}</h5>
                            <p class="card-text">Preço unidade: R$ ${item.preco} | Quantidade: ${item.quantidade}</p>
                            <p class="card-text">Valor: R$ ${item.preco * item.quantidade}</p>
                            <button data-produto-id="${item.id}" class="btn btn-danger btn-sm btn-remove">Remover</button>
                        </div>
                    </div>`
};

const renderizaCarrinho = () => {
    let html = '';
    for (let produtoId in carrinhoItens) {
        html += renderizaCarrinhoItem(carrinhoItens[produtoId])
    }
    document.querySelector('.carrinho_itens').innerHTML = html;
};


const renderizaCarrinhoETotal = () => {
    renderizaCarrinho();
    renderizaCarrinhoTotal();
};



const renderizaCarrinhoTotal = () => {
    let total = 0;
    for (let produtoId in carrinhoItens) {
        total += carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade;
    }

    if (Object.keys(carrinhoItens).length === 0) {
        document.querySelector('.carrinho_total').innerHTML = '<h6>Carrinho Vazio</h6>';
    }else {
    document.querySelector('.carrinho_total').innerHTML = `<h6> Total : R$<strong>${total}</strong></h6>`;
    }
    };


const adicionaItemCarrinho = produto => {
    if (!carrinhoItens[produto.id]) {

        carrinhoItens[produto.id] = produto;
        carrinhoItens[produto.id].quantidade = 0;
    }


    ++carrinhoItens[produto.id].quantidade;

    renderizaCarrinhoETotal()
};


const removeItemCarrinho = produtoId => {
    carrinhoItens[produtoId].quantidade <= 1 ? delete carrinhoItens[produtoId] : --carrinhoItens[produtoId].quantidade

    renderizaCarrinhoETotal();
};


const renderizaProdutos = (produtos) => {
    let html = '';
    produtos.map(function (element, index) {
        html += renderizaProduto(produtos[index], index);
    });

    document.querySelector('.loja').innerHTML = html;
};


document.body
    .addEventListener('click', function (event) {
        const elemento = event.target;
        if (elemento.classList.contains('btn-add')) {
            const index = parseInt(elemento.getAttribute('data-index'), 10);
            const produto = produtos[index];

            adicionaItemCarrinho(produto);
        }
        if (elemento.classList.contains('btn-remove')) {
            const produtoId = elemento.getAttribute('data-produto-id');
            removeItemCarrinho(produtoId);



        }


    });


renderizaProdutos(produtos);

