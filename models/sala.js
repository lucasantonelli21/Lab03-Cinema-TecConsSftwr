export class Sala {
  constructor(id, numero, capacidade, tipo) {
    this.id = id || this.generateId();
    this.numero = numero;
    this.capacidade = capacidade;
    this.tipo = tipo;
  }

  // Gera um ID único
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Método para salvar a sala no localStorage
  save() {
    // Obter salas existentes
    const salas = Sala.getAll();
    
    // Verificar se é atualização ou nova sala
    const index = salas.findIndex(sala => sala.id === this.id);
    
    if (index !== -1) {
      // Atualizar sala existente
      salas[index] = this;
    } else {
      // Adicionar nova sala
      salas.push(this);
    }
    
    // Salvar no localStorage
    localStorage.setItem('salas', JSON.stringify(salas));
    
    return this;
  }

  // Método estático para buscar todas as salas
  static getAll() {
    const salasJSON = localStorage.getItem('salas');
    return salasJSON ? JSON.parse(salasJSON) : [];
  }
  
  // Método para buscar sala por ID
  static getById(id) {
    const salas = Sala.getAll();
    return salas.find(sala => sala.id === id);
  }
  
  // Método para excluir sala
  static delete(id) {
    let salas = Sala.getAll();
    salas = salas.filter(sala => sala.id !== id);
    localStorage.setItem('salas', JSON.stringify(salas));
  }
}