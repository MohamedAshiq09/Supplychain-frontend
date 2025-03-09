import { BatchCard } from "./BatchCard";

interface Batch {
  id: string;
  status: string;
  qualityScore: number;
  createdAt: string;
  berryType: string;
}

interface BatchListProps {
  batches: Batch[];
}

export const BatchList = ({ batches }: BatchListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {batches.map((batch) => (
        <BatchCard
          key={batch.id}
          id={batch.id}
          status={batch.status}
          qualityScore={batch.qualityScore}
          createdAt={batch.createdAt}
          berryType={batch.berryType}
        />
      ))}
    </div>
  );
};