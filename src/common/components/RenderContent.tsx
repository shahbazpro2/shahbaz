import React from 'react';

import { imageBaseUrl } from '@/services/image';

const RenderContent = ({
  data,
  className,
}: {
  data: any;
  className: string;
}) => {
  if (!data?.root?.children) return null;

  const renderNode = (node: any, index: number, className: string) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p className={`mb-4 ` + className}>
            {node.children?.map((child: any, index: number) =>
              renderNode(child, index, className),
            )}
          </p>
        );
      case 'heading': {
        const Tag = node.tag || 'h2';
        return (
          <Tag className={'mb-2 text-lg font-bold ' + className}>
            {node.children?.map((child: any, index: number) =>
              renderText(child, index, className),
            )}
          </Tag>
        );
      }
      case 'text':
        return renderText(node, index, className);
      case 'link':
        console.log('lll', node);
        return (
          <a
            key={node.fields.url}
            href={node.fields.url}
            target={node.fields.newTab ? '_blank' : '_self'}
            rel='noopener noreferrer'
            className='text-blue-600 underline'
          >
            {node.children?.map((child: any, index: number) =>
              renderText(child, index, className),
            )}
          </a>
        );
      case 'list': {
        const ListTag = node.tag === 'ul' ? 'ul' : 'ol';
        const listClassName =
          node.tag === 'ul'
            ? 'list-disc list-inside mb-6 ml-6 space-y-2'
            : 'list-decimal list-inside mb-6 ml-6 space-y-2';
        return (
          <ListTag className={`${listClassName} ${className || ''}`}>
            {node.children?.map((child: any, index: number) =>
              renderNode(child, index, className),
            )}
          </ListTag>
        );
      }
      case 'listitem':
        return (
          <li className={`mb-2 leading-relaxed ${className || ''}`}>
            {node.children?.map((child: any, index: number) =>
              renderNode(child, index, className),
            )}
          </li>
        );
      case 'ul':
        return (
          <ul
            className={`mb-6 ml-6 list-inside list-disc space-y-2 ` + className}
          >
            {node.children?.map((child: any, index: number) =>
              renderNode(child, index, className),
            )}
          </ul>
        );
      case 'ol':
        return (
          <ol
            className={
              `mb-6 ml-6 list-inside list-decimal space-y-2 ` + className
            }
          >
            {node.children?.map((child: any, index: number) =>
              renderNode(child, index, className),
            )}
          </ol>
        );
      case 'li':
        return (
          <li className={`mb-2 leading-relaxed ` + className}>
            {node.children?.map((child: any, index: number) =>
              renderNode(child, index, className),
            )}
          </li>
        );
      case 'horizontalrule':
        return <hr className='my-6 border-gray-300' />;
      case 'linebreak':
        return <br />;
      case 'block':
        return renderBlock(node);
      default:
        return null;
    }
  };

  const renderText = (textNode: any, key: number, className: string) => {
    if (!textNode.text) return null;

    if (textNode.format === 1) className += 'font-bold ';
    if (textNode.format === 2) className += 'italic ';

    return (
      <span key={key} className={className.trim()}>
        {textNode.text}
      </span>
    );
  };

  const renderBlock = (block: any) => {
    if (block.fields.blockType === 'banner') {
      return (
        <div
          key={block.fields.id}
          className='col-start-2 mx-auto my-8 mb-4 w-full'
        >
          <div className='border-border bg-card flex items-center rounded border px-6 py-3'>
            {block.fields.content?.root?.children?.map(
              (child: any, index: number) =>
                renderNode(child, index, className),
            )}
          </div>
        </div>
        /*  <div key={block.fields.id} className="p-4 bg-blue-100 border-l-4 border-blue-500 my-4">
                     {block.fields.content?.root?.children?.map((child: any, index: number) =>
                         renderNode(child, index, 'dark:text-black')
                     )}
                 </div> */
      );
    } else if (
      block.fields.blockType === 'mediaBlock' &&
      (block.fields.blockName === 'video' ||
        (block.fields.media?.url &&
          /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(block.fields.media.url)))
    ) {
      return (
        <div key={block.fields.id} className='my-4'>
          <video
            controls
            className='h-auto w-full rounded'
            src={`${imageBaseUrl}${block.fields.media?.url}`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (block.fields.blockType === 'iframeBlock') {
      const { title, aspectRatio = '16/9', url } = block.fields;

      // Parse aspect ratio with proper number conversion and error handling
      let width = 16,
        height = 9; // Default fallback
      try {
        const ratioParts = aspectRatio.split(':');
        if (ratioParts.length === 2) {
          width = parseInt(ratioParts[0], 10);
          height = parseInt(ratioParts[1], 10);

          // Validate the numbers
          if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            width = 16;
            height = 9;
          }
        }
      } catch (error) {
        console.warn('Invalid aspect ratio format:', aspectRatio);
        width = 16;
        height = 9;
      }

      // Set default width and calculate height proportionally
      const defaultWidth = 800; // Default width in pixels
      const calculatedHeight = Math.round((height / width) * defaultWidth);

      return (
        <div key={block.fields.id} className='my-4'>
          {title && <h3 className='mb-2 text-base font-semibold '>{title}</h3>}
          <div className='w-full overflow-hidden rounded-lg'>
            <iframe
              src={url}
              title={title || 'Embedded content'}
              width='100%'
              height={`${calculatedHeight}px`}
              className='border-0'
              allowFullScreen
              loading='lazy'
              style={{
                aspectRatio: aspectRatio,
                maxWidth: '100%',
                maxHeight: '600px',
              }}
            />
          </div>
        </div>
      );
    } else if (block.fields.blockType === 'mediaBlock') {
      return (
        <div key={block.fields.id} className='my-4'>
          <img
            src={`${imageBaseUrl}${block.fields.media?.url}`} // Adjust URL as per your API
            alt='Media Block'
            className='h-auto w-full rounded'
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className='prose'>
      {data.root.children.map((child: any, index: number) =>
        renderNode(child, index, className),
      )}
    </div>
  );
};

export default RenderContent;
