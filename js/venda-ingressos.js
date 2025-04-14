import { Ingresso } from '../models/ingresso.js';
import { Sessao } from '../models/sessao.js';
import { Filme } from '../models/filme.js';
import { Sala } from '../models/sala.js';

document.addEventListener('DOMContentLoaded', function() {
    const ingressoForm = document.getElementById('ingressoForm');
    const sessaoSelect = document.getElementById('sessao');
    const cpfInput = document.getElementById('cpf');
    
    // Carregar sessões disponíveis
    carregarSessoes();
    
    // Adicionar máscara de CPF
    if (cpfInput) {
        cpfInput.addEventListener('input', formatarCPF);
    }
    
    // Verificar se há um parâmetro de sessão na URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessaoId = urlParams.get('sessao');
    
    if (sessaoId) {
        // Pré-selecionar a sessão se foi passada por parâmetro
        setTimeout(() => {
            if (sessaoSelect) sessaoSelect.value = sessaoId;
        }, 500); // Pequeno delay para garantir que as opções foram carregadas
    }
    
    if (ingressoForm) {
        ingressoForm.addEventListener('submit', handleIngressoSubmit);
    }
});

// Função para formatar o CPF
function formatarCPF(e) {
    let cpf = e.target.value;
    
    // Remove tudo que não é dígito
    cpf = cpf.replace(/\D/g, '');
    
    // Coloca a pontuação conforme digita
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    // Limita o tamanho
    if (cpf.length > 14) {
        cpf = cpf.substring(0, 14);
    }
    
    // Atualiza o campo
    e.target.value = cpf;
}

// Carrega todas as sessões disponíveis para o select
function carregarSessoes() {
    const sessaoSelect = document.getElementById('sessao');
    
    if (!sessaoSelect) {
        console.error('Elemento select de sessões não encontrado');
        return;
    }
    
    try {
        // Obter todas as sessões do localStorage
        const sessoes = Sessao.getAll();
        
        console.log('Total de sessões encontradas:', sessoes.length);
        
        // Filtrar apenas sessões futuras
        const agora = new Date();
        const sessoesValidas = sessoes.filter(sessao => {
            if (!sessao || !sessao.dataHora) return false;
            
            const dataHoraSessao = new Date(sessao.dataHora);
            return dataHoraSessao > agora;
        });
        
        console.log('Sessões futuras válidas:', sessoesValidas.length);
        
        // Ordenar por data/hora (mais próximas primeiro)
        sessoesValidas.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));
        
        // Limpar opções existentes
        sessaoSelect.innerHTML = '<option value="">Selecione a sua Sessão</option>';
        
        // Adicionar sessões ao select
        sessoesValidas.forEach(sessao => {
            try {
                const filme = Filme.getById(sessao.idFilme);
                const sala = Sala.getById(sessao.idSala);
                
                if (!filme) {
                    console.warn(`Filme não encontrado para a sessão ${sessao.id}`);
                    return;
                }
                
                if (!sala) {
                    console.warn(`Sala não encontrada para a sessão ${sessao.id}`);
                    return;
                }
                
                // Formatar data e hora para exibição
                const dataHora = new Date(sessao.dataHora);
                const dataFormatada = dataHora.toLocaleDateString('pt-BR');
                const horaFormatada = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                
                const option = document.createElement('option');
                option.value = sessao.id;
                option.textContent = `${filme.titulo} - Sala ${sala.numero} - ${dataFormatada} ${horaFormatada} - ${sessao.formato} (${sessao.idioma})`;
                sessaoSelect.appendChild(option);
            } catch (err) {
                console.error(`Erro ao processar sessão ${sessao?.id}:`, err);
            }
        });
        
        console.log('Opções de sessões adicionadas:', sessaoSelect.options.length - 1);
    } catch (error) {
        console.error('Erro ao carregar sessões:', error);
    }
}

function handleIngressoSubmit(event) {
    event.preventDefault();
    
    // Obter os valores do formulário
    const sessaoId = document.getElementById('sessao').value;
    const cpf = document.getElementById('cpf').value;
    const assento = document.getElementById('assento').value;
    const formaPagamento = document.getElementById('pagamento').value;
    
    // Validações básicas
    if (!sessaoId || !cpf || !assento || !formaPagamento) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Validar formato do CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        alert('CPF inválido. Use o formato 000.000.000-00');
        return;
    }
    
    // Validar formato do assento (ex: A10, B5)
    const assentoRegex = /^[A-Z][0-9]{1,2}$/i;
    if (!assentoRegex.test(assento)) {
        alert('Assento inválido. Use o formato letra+número (ex: A10, B5)');
        return;
    }
    
    try {
        // Verificar se o assento já está ocupado
        if (Ingresso.assentoOcupado(sessaoId, assento)) {
            alert('Este assento já está ocupado. Por favor, escolha outro.');
            return;
        }
        
        // Criar e salvar o ingresso
        const ingresso = new Ingresso(
            null, // ID será gerado automaticamente
            sessaoId,
            cpf,
            assento.toUpperCase(), // Padronizar para maiúsculas
            formaPagamento
        );
        
        ingresso.save();
        
        alert('Ingresso comprado com sucesso!');
        
        // Limpar o formulário
        event.target.reset();
        
    } catch (error) {
        console.error('Erro ao comprar ingresso:', error);
        alert('Erro ao comprar ingresso. Por favor, tente novamente.');
    }
}