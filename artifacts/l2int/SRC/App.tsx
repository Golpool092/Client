import React from "react";
import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "./hooks/useI18n";
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout";
import HomePage from "./pages/home";
import QuestsPage from "./pages/quests";
import QuestDetailPage from "./pages/quest-detail";
import ClassesPage from "./pages/classes";
import ClassDetailPage from "./pages/class-detail";
import SkillsPage from "./pages/skills";
import ItemsPage from "./pages/items";
import AdminPage from "./pages/admin/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <Switch>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route>
              <Layout>
                <Switch>
                  <Route path="/" component={HomePage} />
                  <Route path="/quests" component={QuestsPage} />
                  <Route path="/quests/:id" component={QuestDetailPage} />
                  <Route path="/classes" component={ClassesPage} />
                  <Route path="/classes/:id" component={ClassDetailPage} />
                  <Route path="/skills" component={SkillsPage} />
                  <Route path="/items" component={ItemsPage} />
                  <Route>
                    <div className="text-center py-24 text-gray-600">
                      404 — Страница не найдена
                    </div>
                  </Route>
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
