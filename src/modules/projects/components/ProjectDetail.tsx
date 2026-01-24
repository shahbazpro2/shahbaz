import Image from '@/common/components/elements/Image';
import Tooltip from '@/common/components/elements/Tooltip';
import RenderContent from '@/common/components/RenderContent';
import { STACKS } from '@/common/constant/stacks';
import { ProjectItemProps } from '@/common/types/projects';
import { imageBaseUrl } from '@/services/image';

import ProjectGallery from './ProjectGallery';
import ProjectLink from './ProjectLink';

const ProjectDetail = ({
  title,
  featuredImage,
  technologies,
  projectUrl,
  githubUrl,
  category,
  content,
  gallery,
}: ProjectItemProps) => {
  const stacksArray = technologies;
  return (
    <div className='space-y-8'>
      <div className='flex flex-col items-start justify-between gap-5 sm:flex-row lg:flex-row lg:items-center'>
        <div className='flex flex-wrap items-center gap-2'>
          {category && (
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
                Category:
              </span>
              <span className='rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                {category}
              </span>
            </div>
          )}
          <div className='flex flex-wrap items-center gap-2'>
            <span className='mb-1 text-[15px] text-neutral-700 dark:text-neutral-300'>
              Tech Stack :
            </span>
            <div className='flex flex-wrap items-center gap-3'>
              {stacksArray?.map(
                (stack: { technology: string }, index: number) => (
                  <div key={index}>
                    {STACKS[
                      (stack.technology?.charAt(0).toUpperCase() +
                        stack.technology?.slice(1)) as keyof typeof STACKS
                    ] && (
                      <Tooltip title={stack.technology}>
                        {
                          STACKS[
                            (stack.technology?.charAt(0).toUpperCase() +
                              stack.technology?.slice(1)) as keyof typeof STACKS
                          ]
                        }
                      </Tooltip>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <ProjectLink
          title={title}
          link_demo={projectUrl || ''}
          link_github={githubUrl || ''}
        />
      </div>
      {featuredImage?.url && (
        <Image
          src={`${imageBaseUrl}${featuredImage.url}`}
          width={800}
          height={400}
          alt={title}
          className='hover:scale-105'
        />
      )}
      {content && (
        <div className='mt-5 space-y-6 leading-[1.8] dark:text-neutral-300'>
          <RenderContent data={content} className='prose' />
        </div>
      )}

      {gallery && gallery.length > 0 && (
        <div className='mt-8'>
          <ProjectGallery images={gallery} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
