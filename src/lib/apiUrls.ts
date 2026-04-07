export const apiUrls = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  providers: {
    list: '/providers',
    details: (id: string) => `/providers/${id}`,
  },
  appointments: {
    list: '/appointments',
    book: '/appointments/book',
    cancel: (id: string) => `/appointments/${id}/cancel`,
  },
} as const;
