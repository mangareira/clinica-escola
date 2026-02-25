import { LoginForm } from '@/components/loginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary-600 via-primary-500 to-primary-700">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>
            <Image src="/logo.png" alt="Clínica Escola" width={80} height={80} priority />
            <h2 className="mt-6 text-3xl font-semibold">Bem-vindo(a) de volta</h2>
          </CardTitle>
          <CardDescription>
            Acesse o painel para acompanhar agendamentos, pacientes e relatórios da Clínica Escola.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
