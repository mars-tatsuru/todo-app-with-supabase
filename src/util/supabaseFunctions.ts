import { supabase } from '../util/supabase'

export const getTodos = async () => {
  const todos = await supabase.from('todo').select('*');
  return todos.data;
}

export const addTodo = async (todo: string) => {
  const { data, error } = await supabase.from('todo').insert([
    { title: todo, isCompleted: false }
  ]);
  return data;
}

export const deleteTodo = async (id: number) => {
  const { data, error } = await supabase.from('todo').delete().match({ id: id });
  return data;
}

export const updateTodo = async (id: number, isCompleted: boolean) => {
  const { data, error } = await supabase.from('todo').update({ isCompleted: !isCompleted }).match({ id: id });
  return data;
}
