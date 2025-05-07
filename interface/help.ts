export interface Concern {
    id?: string;
    name: string;
    email: string;
    content: string;
    user: number | null;
    created_at?: string;
    updated_at?: string;
    status?: 'pending' | 'resolved' | 'closed';
}
