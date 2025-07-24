import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import BackButton from '@/common/components/elements/BackButton';
import Container from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import { ProjectItemProps } from '@/common/types/projects';
import ProjectDetail from '@/modules/projects/components/ProjectDetail';

interface ProjectsDetailPageProps {
  project: ProjectItemProps;
}

const ProjectsDetailPage: NextPage<ProjectsDetailPageProps> = ({ project }) => {
  const PAGE_TITLE = project?.title;
  const PAGE_DESCRIPTION = project?.description;

  const canonicalUrl = `https://aulianza.id/project/${project?.slug}`;

  return (
    <>
      <NextSeo
        title={`${project?.title} - Project Muhammad Shahbaz`}
        description={project?.description}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: project?.updated_at.toString(),
            modifiedTime: project?.updated_at.toString(),
            authors: ['Muhammad Shahbaz'],
          },
          url: canonicalUrl,
          images: [
            {
              url: project?.image,
            },
          ],
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
  // Temporarily disabled database connection for build
  // const response = await prisma.projects.findUnique({
  //   where: {
  //     slug: String(params?.slug),
  //   },
  // });

  // Mock data for build
  const mockProject = {
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
    content: 'This is sample content for the project.',
    is_featured: true,
  };

  // Check if the requested slug matches our mock data
  if (params?.slug !== 'sample-project') {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(mockProject)),
    },
  };
};

// RY: moved from SSG to SSR since data updated frequently from DB
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const response = await prisma.projects.findUnique({
//     where: {
//       slug: String(params?.slug),
//     },
//   });

//   return {
//     props: {
//       project: JSON.parse(JSON.stringify(response)),
//     },
//     revalidate: 10,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await prisma.projects.findMany();
//   const paths = response.map((project) => ({
//     params: { slug: project.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
