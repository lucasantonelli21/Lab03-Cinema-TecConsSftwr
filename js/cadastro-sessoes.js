import { Sessao } from '../models/sessao.js';
import { Filme } from '../models/filme.js';
import { Sala } from '../models/sala.js';

document.addEventListener('DOMContentLoaded', function() {
    const sessaoForm = document.getElementById('SalasForm');
    const filmeSelect = document.getElementById('filme');
    const salaSelect = document.getElementById('sala');
    const precoInput = document.getElementById('preco');
    
    // Carregar filmes disponíveis
    carregarFilmes();
    
    // Carregar salas disponíveis
    carregarSalas();
    
    // Adicionar máscara de preço
    if (precoInput) {
        precoInput.addEventListener('input', formatarPreco);
        precoInput.addEventListener('focus', function(e) {
            // Remove o prefixo R$ ao focar para facilitar a edição
            const valor = e.target.value.replace(/[^\d,]/g, '');
            e.target.value = valor;
        });
        
        precoInput.addEventListener('blur', function(e) {
            formatarPreco(e);
        });
    }
    
    if (sessaoForm) {
        sessaoForm.addEventListener('submit', handleSessaoSubmit);
    }
});

// Função para formatar o preço com R$
function formatarPreco(e) {
    let valor = e.target.value;
    
    // Remove todos os caracteres não numéricos, exceto vírgula
    valor = valor.replace(/[^\d,]/g, '');
    
    // Garante que só existe uma vírgula
    const partes = valor.split(',');
    if (partes.length > 1) {
        valor = partes[0] + ',' + partes[1];
    }
    
    // Limita a 2 casas decimais
    if (partes.length > 1 && partes[1].length > 2) {
        valor = partes[0] + ',' + partes[1].substring(0, 2);
    }
    
    // Adiciona o prefixo R$ se tiver algum valor
    if (valor) {
        valor = 'R$ ' + valor;
    }
    
    e.target.value = valor;
}

function carregarFilmes() {
    const filmeSelect = document.getElementById('filme');
    const filmes = Filme.getAll();
    
    // Limpar opções existentes
    filmeSelect.innerHTML = '<option value="">Selecione o Filme</option>';
    
    // Adicionar filmes ao select
    filmes.forEach(filme => {
        const option = document.createElement('option');
        option.value = filme.id;
        option.textContent = filme.titulo;
        filmeSelect.appendChild(option);
    });
}

function carregarSalas() {
    const salaSelect = document.getElementById('sala');
    const salas = Sala.getAll();
    
    // Limpar opções existentes
    salaSelect.innerHTML = '<option value="">Selecione a Sala</option>';
    
    // Adicionar salas ao select
    salas.forEach(sala => {
        const option = document.createElement('option');
        option.value = sala.id;
        option.textContent = `Sala ${sala.numero} (${sala.tipo.toUpperCase()}) - ${sala.capacidade} lugares`;
        salaSelect.appendChild(option);
    });
}

function handleSessaoSubmit(event) {
    event.preventDefault();
    
    // Obter os valores do formulário
    const idFilme = document.getElementById('filme').value;
    const idSala = document.getElementById('sala').value;
    const dataHora = document.getElementById('horario').value;
    const idioma = document.getElementById('idioma').value;
    let preco = document.getElementById('preco').value;
    const formato = document.getElementById('formato').value;
    
    // Converte o preço para número
    preco = parseFloat(preco.replace('R$', '').replace(',', '.').trim());
    
    // Validações básicas
    if (!idFilme || !idSala || !dataHora || !idioma || isNaN(preco) || !formato) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    try {
        // Criar a nova sessão com os IDs corretos
        const sessao = new Sessao(
            null, // ID será gerado automaticamente
            idFilme,
            idSala,
            dataHora,
            idioma,
            preco,
            formato
        );
        
        // Usar o método save do objeto sessao (não o método estático)
        sessao.save();
        
        alert('Sessão cadastrada com sucesso!');
        event.target.reset();
    } catch (error) {
        console.error('Erro ao cadastrar sessão:', error);
        alert('Erro ao cadastrar sessão. Tente novamente.');
    }
}