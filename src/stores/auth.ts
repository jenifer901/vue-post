import { defineStore } from 'pinia';
import { api } from '@/services/api';
import type { User } from '@/models/user.model';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userId: null as string | null,
        userName: null as string | null,
        token: null as string | null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        init() {
            this.token = localStorage.getItem('token');
            this.userId = localStorage.getItem('userId');
            this.userName = localStorage.getItem('userName');
        },

        async login(name: string, password: string) {
            const res = await api.get('/users');
            const users = res.data;

            const user = users.find(
                (u: User) => u.name === name && u.password === password
            );

            if (!user) throw { status: 401 };

            const token = 'STATIC_MOCK_TOKEN';

            localStorage.setItem('token', token);
            localStorage.setItem('userId', String(user.id));
            localStorage.setItem('userName', user.name);

            this.token = token;
            this.userId = String(user.id);
            this.userName = user.name;

            return user;
        },

        logout() {
            localStorage.clear();

            this.token = null;
            this.userId = null;
            this.userName = null;
        },
    },
});