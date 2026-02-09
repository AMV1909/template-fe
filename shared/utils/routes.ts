const API_PREFIX = "/api";
const V1_PREFIX = `${API_PREFIX}/v1`;

export const authRoutes = {
    signUp: `${V1_PREFIX}/auth/sign-up`,
    login: `${V1_PREFIX}/auth/login`,
};

export const todosRoutes = {
    getTodos: `${V1_PREFIX}/todos`,
    getTodo: (id: string) => `${V1_PREFIX}/todos/${id}`,
    createTodo: `${V1_PREFIX}/todos`,
    updateTodo: (id: string) => `${V1_PREFIX}/todos/${id}`,
    deleteTodo: (id: string) => `${V1_PREFIX}/todos/${id}`,
};
