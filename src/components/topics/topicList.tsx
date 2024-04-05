import { db } from '@/db';
import paths from '@/paths';
import { Chip } from '@nextui-org/react';
import { Topic } from '@prisma/client';
import Link from 'next/link';

export async function TopicList() {
  const topics = await db.topic.findMany();

  const renderTopics = topics.map((topic: Topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-wrap gap-2">{renderTopics}</div>;
}
