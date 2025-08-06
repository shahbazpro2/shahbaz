import { getAllProjectsApi } from 'api/projects-client';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { ProjectItemProps } from '@/common/types/projects';
import Projects from '@/modules/projects';

const PAGE_TITLE = 'Projects';
const PAGE_DESCRIPTION =
  'Several projects that I have worked on, both private and open source.';

interface ProjectsPageProps {
  projects: ProjectItemProps[];
  total: number;
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects, total }) => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMore = () => setVisibleProjects((prev) => prev + 2);
  const hasMore = visibleProjects < total;

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
  const response = await getAllProjectsApi(1)();
  const projects = response?.data?.docs || [];

  return {
    props: {
      projects,
      total: response?.data?.totalDocs || 0,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
