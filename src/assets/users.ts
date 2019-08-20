import { Role } from '../app/dto/UserDTO';

export const users = [
    {
        id: '1',
        username: 'admin',
        password: 'admin',
        avatar: '/assets/images/avatar.png',
        role: Role.ADMIN,
        isActivated: true,
        defaultPage: '/apps/dashboards/analytics',
    },
    {
        id: '2',
        username: 'super_user',
        password: 'super_user',
        avatar: '/assets/images/super_user.png',
        role: Role.SUPER_USER,
        isActivated: true,
        defaultPage: '/apps/dashboards/project',
    },
    {
        id: '3',
        username: 'normal_user',
        password: 'normal_user',
        avatar: '/assets/images/normal_user.png',
        role: Role.NORMAL_USER,
        isActivated: true,
        defaultPage: '/apps/calendar',
    },
];
