import React, { useState } from "react";
import { useLocation } from "wouter";
import { Shield } from "lucide-react";
import { useLogin } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const loginMutation = useLogin();

  const [login, setLoginStr] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ data: { login, password } }, {
      onSuccess: () => {
        toast({ title: "Успешный вход", description: "Добро пожаловать в панель управления" });
        setLocation("/admin");
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Ошибка авторизации",
          description: (err as any)?.error?.error || "Неверный логин или пароль",
        });
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-sm sm:max-w-md border-primary/30 shadow-[0_0_30px_rgba(201,162,39,0.1)]">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-cinzel font-bold">Панель управления</CardTitle>
          <CardDescription className="text-sm">
            Вход для администраторов сайта
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLoginStr(e.target.value)}
                required
                className="bg-background/50"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50"
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full font-cinzel font-bold tracking-wider"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Входим..." : "Войти"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
