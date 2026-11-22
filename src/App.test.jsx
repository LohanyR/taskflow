import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Testes do TaskFlow', () => {

beforeEach(() => {
localStorage.clear();

vi.stubGlobal('crypto', {
randomUUID: () => 'task-1',
});
});

it('deve cadastrar uma nova tarefa', () => {
render(<App />);

const titleInput = screen.getByLabelText('Título da tarefa');

fireEvent.change(titleInput, {
target: { value: 'Estudar Node.js' },
});

fireEvent.click(
screen.getByRole('button', { name: /adicionar tarefa/i })
);

expect(
screen.getByText('Estudar Node.js')
).toBeInTheDocument();

expect(screen.getByText('Total de tarefas').parentElement).toHaveTextContent('1');
});

it('deve concluir uma tarefa', () => {
render(<App />);

fireEvent.change(
screen.getByLabelText('Título da tarefa'),
{ target: { value: 'Estudar React' } }
);

fireEvent.click(
screen.getByRole('button', { name: /adicionar tarefa/i })
);

fireEvent.click(
screen.getByRole('button', { name: 'Concluir' })
);

expect(
screen.getByRole('button', { name: 'Reabrir' })
).toBeInTheDocument();
});

it('deve excluir uma tarefa', () => {
render(<App />);

fireEvent.change(
screen.getByLabelText('Título da tarefa'),
{ target: { value: 'Estudar JavaScript' } }
);

fireEvent.click(
screen.getByRole('button', { name: /adicionar tarefa/i })
);

fireEvent.click(
screen.getByRole('button', { name: 'Excluir Estudar JavaScript' })
);

expect(
screen.queryByText('Estudar JavaScript')
).not.toBeInTheDocument();
});

it('deve filtrar as tarefas concluídas', () => {
render(<App />);

fireEvent.change(
screen.getByLabelText('Título da tarefa'),
{ target: { value: 'Minha tarefa' } }
);

fireEvent.click(
screen.getByRole('button', { name: /adicionar tarefa/i })
);

fireEvent.click(
screen.getByRole('button', { name: 'Concluir' })
);

fireEvent.click(
screen.getByRole('button', { name: 'Pendentes' })
);

expect(
screen.queryByText('Minha tarefa')
).not.toBeInTheDocument();

fireEvent.click(
screen.getByRole('button', { name: 'Concluídas' })
);

expect(
screen.getByText('Minha tarefa')
).toBeInTheDocument();
});

});