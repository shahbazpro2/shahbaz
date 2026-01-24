export interface ProjectItemProps {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    thumbnailURL: string;
    url: string;
  };
  projectUrl?: string;
  githubUrl?: string;
  category?: string;
  technologies: [
    {
      technology: string;
      id: string;
    },
  ];
  tags: [
    {
      name: string;
      id: string;
    },
  ];
  content?: string;
  featured: boolean;
  updatedAt: Date;
  gallery: [
    {
      image: {
        thumbnailURL: string;
        url: string;
      };
      id: string;
    },
  ];
}

export interface ProjectsProps {
  projects: ProjectItemProps[];
}
