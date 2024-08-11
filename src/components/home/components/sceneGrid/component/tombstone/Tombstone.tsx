import { Card, Skeleton, Inset, Flex } from "@radix-ui/themes";

const Tombstone = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Card>
          <Inset>
            <div className="flex items-center justify-center rounded-t-lg h-40" />
            <div className="px-4 py-2 border-t-2 border-muted h-16">
              <Skeleton
                height="18px"
                className="mt-1"
                width="150px"
                key={index}
              />
              <Flex className="mt-0.5" align="center" gap="1">
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
