import { getProjectApi } from 'api/projects-client';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { ProjectItemProps } from '@/common/types/projects';
import ProjectDetail from '@/modules/projects/components/ProjectDetail';
import { imageBaseUrl } from '@/services/image';

interface ProjectsDetailPageProps {
  project: ProjectItemProps;
}

const ProjectsDetailPage: NextPage<ProjectsDetailPageProps> = ({ project }) => {
  const PAGE_TITLE = project?.title;
  const PAGE_DESCRIPTION = project?.excerpt;

  const canonicalUrl = `https://theshahbaz.com/project/${project?.slug}`;

  return (
    <>
      <NextSeo
        title={`${project?.title} - Project Muhammad Shahbaz`}
        description={project?.excerpt}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: project?.updatedAt.toString(),
            modifiedTime: project?.updatedAt.toString(),
            authors: ['Muhammad Shahbaz'],
          },
          url: canonicalUrl,
          images: project?.featuredImage?.thumbnailURL
            ? [
                {
                  url: `${imageBaseUrl}${project.featuredImage.thumbnailURL}`,
                },
              ]
            : [],
          siteName: 'Blog Muhammad Shahbaz',
        }}
      />
      <Container data-aos='fade-up'>
        <BackButton url='/projects' />
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <ProjectDetail {...project} />
      </Container>
    </>
  );
};

export default ProjectsDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Fetch project from API
  const response = await getProjectApi(String(params?.slug))();
  const project = response?.data?.docs?.[0] || null;

  if (!project) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
  };
};
