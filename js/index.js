import { Sessao } from '../models/sessao.js';
import { Filme } from '../models/filme.js';
import { Sala } from '../models/sala.js';

document.addEventListener('DOMContentLoaded', function() {
    carregarSessoes();
});

function carregarSessoes() {
    const wrapper = document.querySelector('.wrapper');
    const sessoes = Sessao.getAll();
    
    // Limpar o wrapper antes de adicionar novas sessões
    wrapper.innerHTML = '';
    
    if (sessoes.length === 0) {
        // Se não houver sessões, exibir mensagem
        wrapper.innerHTML = '<div class="alert alert-info">Não há sessões disponíveis no momento.</div>';
        return;
    }
    
    // Filtrar apenas sessões futuras
    const agora = new Date();
    const sessoesValidas = sessoes.filter(sessao => {
        if (!sessao || !sessao.dataHora) return false;
        const dataHoraSessao = new Date(sessao.dataHora);
        return dataHoraSessao > agora;
    });
    
    if (sessoesValidas.length === 0) {
        // Se não houver sessões válidas, exibir mensagem
        wrapper.innerHTML = '<div class="alert alert-info">Não há sessões disponíveis no momento.</div>';
        return;
    }
    
    // Ordenar sessões por data/hora (mais próximas primeiro)
    sessoesValidas.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));
    
    console.log(`Encontradas ${sessoesValidas.length} sessões válidas de um total de ${sessoes.length}`);
    
    // Processar cada sessão para exibição
    sessoesValidas.forEach(sessao => {
        const filme = Filme.getById(sessao.idFilme);
        const sala = Sala.getById(sessao.idSala);
        
        if (!filme || !sala) return; // Ignora sessões com filme ou sala inexistentes
        
        // Formatar data e hora
        const dataHora = new Date(sessao.dataHora);
        const dataFormatada = dataHora.toLocaleDateString('pt-BR');
        const horaFormatada = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        // Formatar preço
        const precoFormatado = `R$ ${sessao.preco.toString().replace('.', ',')}0`;
        
        // URL da imagem - usa a imagem específica do filme ou a padrão
        const imagemUrl = filme.imagemUrl || '/assets/filme.jpg';
        
        // Criar card da sessão
        const card = document.createElement('div');
        card.className = 'session-card card mb-3';
        card.innerHTML = `
            <div class="card-header"> <h3 class="text-center">${filme.titulo}</h3></div>
            <div class="card-body text-center">
                <img src="${imagemUrl}" class="img-fluid mb-3" alt="${filme.titulo}" 
                     onerror="this.src='/assets/filme.jpg'">
                <h5 class="card-title">Data: ${dataFormatada}</h5>
                <p class="card-text">Horário: ${horaFormatada}</p>
                <p class="card-text">Sala: ${sala.numero}</p>
                <p class="card-text">Tipo de Sessão: ${sessao.formato}</p>
                <p class="card-text">Idioma: ${sessao.idioma === 'dublado' ? 'Dublado' : 'Legendado'}</p>
                <p class="card-text">Preço: ${precoFormatado}</p>
            </div>
            <div class="card-footer text-center">
                <a href="/venda-ingressos.html?sessao=${sessao.id}" class="btn btn-success">Comprar Ingresso</a>
            </div>
        `;
        
        wrapper.appendChild(card);
    });
}