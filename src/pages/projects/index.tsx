import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { ProjectItemProps } from '@/common/types/projects';
import Projects from '@/modules/projects';

interface ProjectsPageProps {
  projects: ProjectItemProps[];
}

const PAGE_TITLE = 'Projects';
const PAGE_DESCRIPTION =
  'Several projects that I have worked on, both private and open source.';

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMore = () => setVisibleProjects((prev) => prev + 2);
  const hasMore = visibleProjects < projects.length;

  return (
    <>
      <NextSeo title={`${PAGE_TITLE} - Muhammad Shahbaz`} />
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <Projects
          projects={projects.slice(0, visibleProjects)}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </Container>
    </>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async () => {
  // Temporarily disabled database connection for build
  // const response = await prisma.projects.findMany({
  //   orderBy: [
  //     {
  //       is_featured: 'desc',
  //     },
  //     {
  //       updated_at: 'desc',
  //     },
  //   ],
  // });

  // Mock data for build
  const mockProjects = [
    {
      id: 1,
      title: 'Sample Project',
      slug: 'sample-project',
      description: 'This is a sample project for demonstration purposes.',
      image: '/images/placeholder.png',
      link_demo: 'https://example.com',
      link_github: 'https://github.com/example',
      stacks: '["React", "TypeScript", "Next.js"]',
      is_show: true,
      updated_at: new Date().toISOString(),
      content: null,
      is_featured: true,
    },
  ];

  return {
    props: {
      projects: JSON.parse(JSON.stringify(mockProjects)),
    },
    revalidate: 1,
  };
};
