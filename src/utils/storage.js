export const loadTodos = (key = 'todos') => {
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : []
    } catch (e) {
        console.error('failed to load todos', e)
        return []
    }
}

export const saveTodos = (todos, key = 'todos') => {
    try {
        localStorage.setItem(key, JSON.stringify(todos))
    } catch (e) {
        console.error('failed to save todos', e)
    }
}
