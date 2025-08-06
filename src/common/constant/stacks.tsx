import {
  SiAngular,
  SiBootstrap,
  SiChakraui,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedux,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';

export type stacksProps = {
  [key: string]: JSX.Element;
};

const iconSize = 20;

export const STACKS = {
  JavaScript: <SiJavascript size={iconSize} className='text-yellow-500' />,
  TypeScript: <SiTypescript size={iconSize} className='text-blue-500' />,
  React: <SiReact size={iconSize} className='text-blue-500' />,
  'React js': <SiReact size={iconSize} className='text-blue-500' />,
  Vue: <SiVuedotjs size={iconSize} className='text-green-500' />,
  Angular: <SiAngular size={iconSize} className='text-red-500' />,
  Node: <SiNodedotjs size={iconSize} className='text-green-500' />,
  Next: <SiNextdotjs size={iconSize} className='text-black dark:text-white' />,
  Express: <SiExpress size={iconSize} className='text-black dark:text-white' />,
  Laravel: <SiLaravel size={iconSize} className='text-red-500' />,
  PHP: <SiPhp size={iconSize} className='text-blue-500' />,
  Python: <SiPython size={iconSize} className='text-blue-500' />,
  MySQL: <SiMysql size={iconSize} className='text-blue-500' />,
  PostgreSQL: <SiPostgresql size={iconSize} className='text-blue-500' />,
  MongoDB: <SiMongodb size={iconSize} className='text-green-500' />,
  Supabase: <SiSupabase size={iconSize} className='text-green-500' />,
  Prisma: <SiPrisma size={iconSize} className='text-black dark:text-white' />,
  GraphQL: <SiGraphql size={iconSize} className='text-pink-500' />,
  Redux: <SiRedux size={iconSize} className='text-purple-500' />,
  Jest: <SiJest size={iconSize} className='text-red-500' />,
  Docker: <SiDocker size={iconSize} className='text-blue-500' />,
  Git: <SiGit size={iconSize} className='text-orange-500' />,
  GitHub: <SiGithub size={iconSize} className='text-black dark:text-white' />,
  HTML: <SiHtml5 size={iconSize} className='text-orange-500' />,
  CSS: <SiCss3 size={iconSize} className='text-blue-500' />,
  SASS: <SiSass size={iconSize} className='text-pink-500' />,
  TailwindCSS: <SiTailwindcss size={iconSize} className='text-blue-500' />,
  Tailwindcss: <SiTailwindcss size={iconSize} className='text-blue-500' />,
  Bootstrap: <SiBootstrap size={iconSize} className='text-purple-500' />,
  ChakraUI: <SiChakraui size={iconSize} className='text-teal-500' />,
  Figma: <SiFigma size={iconSize} className='text-pink-500' />,
  Wagmi: (
    <img
      src='https://wagmi.sh/logo-dark.svg'
      alt='Wagmi'
      className='h-10 w-10'
    />
  ),
  Vite: (
    <img src='https://vitejs.dev/logo.svg' alt='Vite' className='h-5 w-5' />
  ),
  'CoinGecko API': (
    <img src='/images/coingecko.avif' alt='Coingoko api' className='h-3 w-14' />
  ),
};
