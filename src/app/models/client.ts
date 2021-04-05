export interface Client {
    id: number;
    name: string;
    password?: string;
    accessable?: boolean;
}
export const users: Client[] =
    [{ id: 1, name: 'user', password: 'user@1234' },
    { id: 1, name: 'MunishGowtham Baskaran', password: 'munisbaskii@gmail.com' }];
