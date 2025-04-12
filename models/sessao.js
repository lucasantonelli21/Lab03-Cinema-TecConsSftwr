export class Sessao {
    constructor(id, idFilme, idSala, dataHora, idioma, preco, formato) {
        this.id = id || this.generateId();
        this.idFilme = idFilme;
        this.idSala = idSala;
        this.dataHora = dataHora;
        this.idioma = idioma;
        this.preco = preco;
        this.formato = formato;
    }

    // Gera um ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    // Método para salvar a sessão no localStorage
    save() {
        // Obter sessões existentes
        const sessoes = Sessao.getAll();
        
        // Verificar se é atualização ou nova sessão
        const index = sessoes.findIndex(sessao => sessao.id === this.id);
        
        if (index !== -1) {
            // Atualizar sessão existente
            sessoes[index] = this;
        } else {
            // Adicionar nova sessão
            sessoes.push(this);
        }
        
        // Salvar no localStorage
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        
        return this;
    }

    // Método estático para buscar todas as sessões
    static getAll() {
        const sessoesJSON = localStorage.getItem('sessoes');
        return sessoesJSON ? JSON.parse(sessoesJSON) : [];
    }
    
    // Método para buscar sessão por ID
    static getById(id) {
        const sessoes = Sessao.getAll();
        return sessoes.find(sessao => sessao.id === id);
    }

    // Método para excluir sessão
    static delete(id) {
        let sessoes = Sessao.getAll();
        sessoes = sessoes.filter(sessao => sessao.id !== id);
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
    }
}