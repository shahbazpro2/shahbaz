import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from '../elements/Image';

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ expandMenu, imageSize }) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 flex-grow lg:flex-col',
        expandMenu && 'flex-col !items-start'
      )}
    >
      <Image
        src='/images/aulianza.png'
        alt='Ryan Aulia'
        width={expandMenu ? 75 : imageSize}
        height={expandMenu ? 75 : imageSize}
        rounded='rounded-full'
      />
      <Link href='/' passHref>
        <h2 className='flex-grow text-lg lg:text-xl font-medium'>Ryan Aulia</h2>
      </Link>
    </div>
  );
};

export default ProfileHeader;
