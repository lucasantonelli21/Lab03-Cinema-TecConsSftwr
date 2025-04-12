export class Filme {
    constructor(id, titulo, sinopse, genero, classificacao, duracao, dataEstreia, imagemUrl) {
        this.id = id || this.generateId();
        this.titulo = titulo;
        this.sinopse = sinopse;
        this.genero = genero;
        this.classificacao = classificacao;
        this.duracao = duracao;
        this.dataEstreia = dataEstreia;
        this.imagemUrl = imagemUrl || '/assets/filme.jpg'; // Imagem padrão se não for fornecida
    }

    // Método para gerar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    // Método para salvar o filme no localStorage
    save() {
        // Obter filmes existentes
        const filmes = Filme.getAll();
        
        // Verificar se é atualização ou novo filme
        const index = filmes.findIndex(filme => filme.id === this.id);
        
        if (index !== -1) {
            // Atualizar filme existente
            filmes[index] = this;
        } else {
            // Adicionar novo filme
            filmes.push(this);
        }
        
        // Salvar no localStorage
        localStorage.setItem('filmes', JSON.stringify(filmes));
        
        return this;
    }

    // Método estático para buscar todos os filmes
    static getAll() {
        const filmesJSON = localStorage.getItem('filmes');
        return filmesJSON ? JSON.parse(filmesJSON) : [];
    }
    
    // Método para buscar filme por ID
    static getById(id) {
        const filmes = Filme.getAll();
        return filmes.find(filme => filme.id === id);
    }
    
    // Método para excluir filme
    static delete(id) {
        let filmes = Filme.getAll();
        filmes = filmes.filter(filme => filme.id !== id);
        localStorage.setItem('filmes', JSON.stringify(filmes));
    }
}