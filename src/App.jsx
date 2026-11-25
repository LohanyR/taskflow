
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  // Salva as tarefas no navegador sempre que houver alteração
  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Cadastra uma nova tarefa ou salva uma edição
  function addTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    if (editingId !== null) {
      // Atualiza a tarefa existente
      setTasks(tasks.map(task =>
        task.id === editingId
          ? {
              ...task,
              title: title.trim(),
              description: description.trim(),
              date
            }
          : task
      ));

      setEditingId(null);
    } else {
      // Cadastra uma nova tarefa
      const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        date,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    // Limpa o formulário
    setTitle('');
    setDescription('');
    setDate('');
  }

  // Altera o status da tarefa
  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  }

  // Exclui uma tarefa
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));

    if (editingId === id) {
      cancelEdit();
    }
  }

  // Preenche o formulário com os dados da tarefa selecionada
  function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    setEditingId(id);
    setTitle(task.title);
    setDescription(task.description || '');
    setDate(task.date || '');
  }

  // Cancela a edição
  function cancelEdit() {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDate('');
  }

  // Calcula as estatísticas
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  // Filtra as tarefas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">✓</span>
          <span>TaskFlow</span>
        </div>
        <span className="header-label">Organize sua rotina</span>
      </header>

      <main className="main-content">
        <section className="welcome">
          <p className="welcome-label">
            SEU ESPAÇO DE ORGANIZAÇÃO
          </p>
          <h1>Olá! Vamos organizar seu dia?</h1>
          <p>Pequenos passos levam a grandes conquistas.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total de tarefas</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="stat-card">
            <span>Pendentes</span>
            <strong>{pendingTasks}</strong>
          </div>

          <div className="stat-card">
            <span>Concluídas</span>
            <strong>{completedTasks}</strong>
          </div>
        </section>

        <section className="task-form-section">
          <h2>
            {editingId !== null
              ? 'Editar tarefa'
              : 'Adicionar nova tarefa'}
          </h2>

          <form onSubmit={addTask} className="task-form">
            <label htmlFor="title">Título da tarefa</label>
            <input
              id="title"
              type="text"
              placeholder="Ex.: Estudar programação"
              value={title}
              onChange={event => setTitle(event.target.value)}
              required
            />

            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder="Descreva sua tarefa..."
              value={description}
              onChange={event => setDescription(event.target.value)}
              rows="3"
            />

            <label htmlFor="date">Prazo</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={event => setDate(event.target.value)}
            />

            <button type="submit" className="add-button">
              {editingId !== null
                ? 'Salvar alterações'
                : '+ Adicionar tarefa'}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-button"
                onClick={cancelEdit}
              >
                Cancelar edição
              </button>
            )}
          </form>
        </section>

        <section className="tasks-section">
          <div className="tasks-heading">
            <h2>Minhas tarefas</h2>

            <div className="filters">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                Todas
              </button>

              <button
                className={filter === 'pending' ? 'active' : ''}
                onClick={() => setFilter('pending')}
              >
                Pendentes
              </button>

              <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Concluídas
              </button>
            </div>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <span>📝</span>
                <p>Nenhuma tarefa encontrada.</p>
                <small>
                  Adicione uma nova tarefa para começar!
                </small>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  className={`task-card ${task.completed ? 'completed' : ''}`}
                  key={task.id}
                >
                  <div className="task-info">
                    <h3>{task.title}</h3>

                    {task.description && (
                      <p>{task.description}</p>
                    )}

                    {task.date && (
                      <small>Prazo: {task.date}</small>
                    )}
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="complete-button"
                    >
                      {task.completed ? 'Reabrir' : 'Concluir'}
                    </button>

                    <button
                      onClick={() => editTask(task.id)}
                      className="edit-button"
                      aria-label={`Editar ${task.title}`}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-button"
                      aria-label={`Excluir ${task.title}`}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>
          TaskFlow © 2026 — Organização que transforma resultados.
        </p>
      </footer>
    </div>
  );
}

export default App;
