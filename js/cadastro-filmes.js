import { Filme } from '../models/filme.js';

document.addEventListener('DOMContentLoaded', function() {
    const filmeForm = document.getElementById('filmeForm');
    const imagemInput = document.getElementById('imagem');
    const imagemPreview = document.getElementById('imagemPreview');
    
    // Adicionar preview de imagem
    if (imagemInput && imagemPreview) {
        imagemInput.addEventListener('input', function() {
            // Atualizar o preview quando o URL mudar
            const url = this.value.trim();
            
            if (url) {
                imagemPreview.src = url;
            } else {
                imagemPreview.src = '/assets/filme.jpg';
            }
        });
        
        // Lidar com erros de carregamento da imagem
        imagemPreview.addEventListener('error', function() {
            this.src = '/assets/filme.jpg';
            alert('Não foi possível carregar a imagem. Por favor, verifique o URL.');
        });
    }
    
    if (filmeForm) {
        filmeForm.addEventListener('submit', handleFilmeSubmit);
    }
});

function handleFilmeSubmit(event) {
    event.preventDefault();
    
    // Obter os valores do formulário
    const titulo = document.getElementById('titulo').value;
    const sinopse = document.getElementById('sinopse').value;
    const genero = document.getElementById('genero').value;
    const classificacao = document.getElementById('classificacao').value;
    const duracao = parseInt(document.getElementById('duracao').value);
    const dataEstreia = document.getElementById('estreia').value;
    const imagemUrl = document.getElementById('imagem').value.trim() || '/assets/filme.jpg';
    
    try {
        // Criar e salvar o filme
        const filme = new Filme(
            null, // ID será gerado automaticamente
            titulo,
            sinopse,
            genero,
            classificacao,
            duracao,
            dataEstreia,
            imagemUrl // Adicionando URL da imagem
        );
        
        filme.save();
        
        alert('Filme cadastrado com sucesso!');
        
        // Limpar o formulário
        event.target.reset();
        document.getElementById('imagemPreview').src = '/assets/filme.jpg';
        
    } catch (error) {
        console.error('Erro ao cadastrar filme:', error);
        alert('Erro ao cadastrar filme. Verifique o console para mais detalhes.');
    }
}


