import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { PersonnelTable } from "@/components/PersonnelTable";
import { PrototypeNote } from "@/components/PrototypeNote";
import { listPersonnel } from "@/services/personnelService";
import type { Personnel } from "@/types";

export const Route = createFileRoute("/welfare/personnel/")({
  head: () => ({
    meta: [
      { title: "Personnel Directory — SentinelWell" },
      {
        name: "description",
        content: "Filterable welfare risk directory of monitored personnel identifiers.",
      },
      { property: "og:title", content: "Personnel Directory — SentinelWell" },
      {
        property: "og:description",
        content: "Search and filter personnel welfare risk indicators by unit, band and trend.",
      },
    ],
  }),
  component: PersonnelDirectory,
});

function PersonnelDirectory() {
  const [people, setPeople] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPersonnel().then((p) => {
      setPeople(p);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageHeader
        title="Personnel"
        subtitle="Confidential welfare risk directory · identifiers only, access logged."
      />
      <section className="panel p-6">
        <PersonnelTable data={people} loading={loading} />
      </section>
      <PrototypeNote />
    </>
  );
}
