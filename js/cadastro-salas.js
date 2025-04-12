import { Sala } from '../models/sala.js';

document.addEventListener('DOMContentLoaded', function() {
    const salasForm = document.getElementById('SalasForm');
    
    if (salasForm) {
        salasForm.addEventListener('submit', handleSalaSubmit);
    }
});

function handleSalaSubmit(event) {
    event.preventDefault();
    
    // Obter os valores do formulário
    const numero = parseInt(document.getElementById('numero').value);
    const capacidade = parseInt(document.getElementById('capacidade').value);
    const tipo = document.getElementById('tipo').value;
    
    try {
        // Verificar se já existe uma sala com este número
        const salas = Sala.getAll();
        const salaExistente = salas.find(sala => sala.numero === numero);
        
        if (salaExistente) {
            alert('Já existe uma sala com este número!');
            return;
        }
        
        // Criar e salvar a sala
        const sala = new Sala(
            null, // ID será gerado automaticamente
            numero,
            capacidade,
            tipo
        );
        
        sala.save();
        
        alert('Sala cadastrada com sucesso!');
        
        // Limpar o formulário
        event.target.reset();
        
    } catch (error) {
        console.error('Erro ao cadastrar sala:', error);
        alert('Erro ao cadastrar sala. Verifique o console para mais detalhes.');
    }
}