import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/layouts/AppLayout";

export const Route = createFileRoute("/commander")({
  component: () => (
    <AppLayout role="commander">
      <Outlet />
    </AppLayout>
  ),
});
