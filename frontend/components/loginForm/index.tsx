'use client';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Login, loginSchema} from '@/utils/schemas/login.schemas';
import { useLogin } from '@/utils/hooks/login/useLogin';

export const LoginForm = () => {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: { name: '', password: '' },
  });

  const { mutate, isPending } = useLogin()

  const onSubmit = (values: Login) => {
    mutate(values, {
      onSuccess: () => {
        
      }
    })
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input type='text' placeholder="Digite seu usuário"  disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite sua senha"
                  disabled={isPending}
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>
    </Form>
  );
};
