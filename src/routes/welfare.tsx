import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/layouts/AppLayout";

export const Route = createFileRoute("/welfare")({
  component: () => (
    <AppLayout role="welfare">
      <Outlet />
    </AppLayout>
  ),
});
