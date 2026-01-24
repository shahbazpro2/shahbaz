import { Key, Link2, Shield } from 'lucide-react';
import {
  SiAngular,
  SiBootstrap,
  SiChakraui,
  SiCss3,
  SiDjango,
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
  SiStripe,
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
  'Next js': (
    <SiNextdotjs size={iconSize} className='text-black dark:text-white' />
  ),
  Express: <SiExpress size={iconSize} className='text-black dark:text-white' />,
  Laravel: <SiLaravel size={iconSize} className='text-red-500' />,
  PHP: <SiPhp size={iconSize} className='text-blue-500' />,
  Python: <SiPython size={iconSize} className='text-blue-500' />,
  MySQL: <SiMysql size={iconSize} className='text-blue-500' />,
  PostgreSQL: <SiPostgresql size={iconSize} className='text-blue-500' />,
  Postgresql: <SiPostgresql size={iconSize} className='text-blue-500' />,
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
  Django: <SiDjango size={iconSize} className='text-blue-500' />,
  'Material Ui': (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
      <path
        fill='#0073E6'
        fill-rule='evenodd'
        d='M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z'
        clip-rule='evenodd'
      />
    </svg>
  ),
  'Pusher js': <img src='/images/pusherjs.png' alt='Pusher' className='w-10' />,
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
  Stripe: <SiStripe size={iconSize} className='text-indigo-500' />,
  OAuth: <Shield size={iconSize} className='text-orange-500' />,
  'JWT Authentication': <Key size={iconSize} className='text-orange-500' />,
  'RESTful APIs': <Link2 size={iconSize} className='text-blue-500' />,
};
