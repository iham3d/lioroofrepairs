import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-neutral-100)',
        }}>
            <LoginForm />
        </div>
    );
}
