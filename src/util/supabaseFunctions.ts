import { supabase } from '../util/supabase'

type List = {
  id: number
  title: string
  who: string
  work: boolean
  order: number
}

export const getTodosForPrivate = async () => {
  const todos = await supabase
    .from('todo')
    .select('*')
    .order('order', { ascending: false })
    .like('work', 'private')
  return todos.data
}

export const getTodosForWork = async () => {
  const todos = await supabase
    .from('todo')
    .select('*')
    .order('order', { ascending: false })
    .like('work', 'work')
  return todos.data
}

export const addTodo = async (todo: string, who: string, work: string) => {
  const { data, error } = await supabase.from('todo').insert([
    {
      title: todo,
      who: who,
      work: work
    }
  ])
  return data
}

export const deleteTodo = async (id: number) => {
  const { data, error } = await supabase.from('todo').delete().match({ id: id })
  return data
}

export const deleteListBeforeOrderTodo = async (todoList: List[]) => {
  const deletePromises = todoList.map(async (row: List) => {
    await supabase.from('todo').delete().eq('id', row.id)
  })

  await Promise.all(deletePromises)
}

export const insertAndOrderTodo = async (newTodoList: List[]) => {
  const { data, error } = await supabase.from('todo').insert(newTodoList)
  return data
}
