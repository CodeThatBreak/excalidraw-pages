import { Card, Skeleton, Inset, Flex } from "@radix-ui/themes";

const Tombstone = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <Card className="h-[228px]">
          <Inset>
            <div className="flex items-center justify-center rounded-t-lg h-40" />
            <div className="px-4 py-2 border-t-2 border-muted">
              <Skeleton width="150px" key={index} />
              <Flex align="center" gap="1">
                <Skeleton width="150px" key={index} />
                <span className="text-muted">·</span>
                <Skeleton width="200px" key={index} />
              </Flex>
            </div>
          </Inset>
        </Card>
      ))}
    </div>
  );
};

export { Tombstone };
