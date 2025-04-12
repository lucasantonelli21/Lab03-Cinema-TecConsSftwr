export class Ingresso {
    constructor(id, sessaoId, cpf, assento, formaPagamento) {
        this.id = id || this.generateId();
        this.sessaoId = sessaoId;
        this.cpf = cpf;
        this.assento = assento;
        this.formaPagamento = formaPagamento;
        this.dataCompra = new Date().toISOString();
    }

    // Gera um ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    // Método para salvar o ingresso no localStorage
    save() {
        // Obter ingressos existentes
        const ingressos = Ingresso.getAll();
        
        // Verificar se é atualização ou novo ingresso
        const index = ingressos.findIndex(ingresso => ingresso.id === this.id);
        
        if (index !== -1) {
            // Atualizar ingresso existente
            ingressos[index] = this;
        } else {
            // Adicionar novo ingresso
            ingressos.push(this);
        }
        
        // Salvar no localStorage
        localStorage.setItem('ingressos', JSON.stringify(ingressos));
        
        return this;
    }

    // Método estático para buscar todos os ingressos
    static getAll() {
        const ingressosJSON = localStorage.getItem('ingressos');
        return ingressosJSON ? JSON.parse(ingressosJSON) : [];
    }
    
    // Método para buscar ingresso por ID
    static getById(id) {
        const ingressos = Ingresso.getAll();
        return ingressos.find(ingresso => ingresso.id === id);
    }
    
    // Método para excluir ingresso
    static delete(id) {
        let ingressos = Ingresso.getAll();
        ingressos = ingressos.filter(ingresso => ingresso.id !== id);
        localStorage.setItem('ingressos', JSON.stringify(ingressos));
    }
    
    // Verificar se um assento já está ocupado para uma determinada sessão
    static assentoOcupado(sessaoId, assento) {
        const ingressos = Ingresso.getAll();
        return ingressos.some(
            ingresso => ingresso.sessaoId === sessaoId && 
                        ingresso.assento.toLowerCase() === assento.toLowerCase()
        );
    }
}