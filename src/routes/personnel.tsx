import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/layouts/AppLayout";

export const Route = createFileRoute("/personnel")({
  component: () => (
    <AppLayout role="personnel">
      <Outlet />
    </AppLayout>
  ),
});
