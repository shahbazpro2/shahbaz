import { Combobox, Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Fragment, useContext, useEffect, useState } from 'react';
import {
  BiMoon as DarkModeIcon,
  BiSearch as SearchIcon,
  BiSun as LightModeIcon,
} from 'react-icons/bi';
import { useDebounce } from 'usehooks-ts';

import {
  EXTERNAL_LINKS,
  MENU_ITEMS,
  SOCIAL_MEDIA,
} from '@/common/constant/menu';
import { CommandPaletteContext } from '@/common/context/CommandPaletteContext';
import useIsMobile from '@/common/hooks/useIsMobile';
import { MenuItemProps } from '@/common/types/menu';

interface MenuOptionItemProps extends MenuItemProps {
  click?: () => void;
  closeOnSelect: boolean;
}

interface MenuOptionProps {
  title: string;
  children: MenuOptionItemProps[];
}

const CommandPalette = () => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();
  const isMobile = useIsMobile();
  const { isOpen, setIsOpen } = useContext(CommandPaletteContext);
  const { resolvedTheme, setTheme } = useTheme();
  const queryDebounce = useDebounce(query, 500);

  const placeholders = [
    'Search or Ask anything...',
    'Press Cmd + K anytime to access this command pallete',
  ];

  const placeholder = placeholders[placeholderIndex];

  const menuOptions: MenuOptionProps[] = [
    {
      title: 'PAGES',
      children: MENU_ITEMS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'SOCIALS',
      children: SOCIAL_MEDIA?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'EXTERNAL LINKS',
      children: EXTERNAL_LINKS?.map((menu) => ({
        ...menu,
        closeOnSelect: true,
      })),
    },
    {
      title: 'APPEARANCE',
      children: [
        {
          icon:
            resolvedTheme === 'dark' ? (
              <LightModeIcon size={20} />
            ) : (
              <DarkModeIcon size={20} />
            ),
          title: `Switch to ${
            resolvedTheme === 'dark' ? 'Light' : 'Dark'
          } Mode`,
          click: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
          href: '#',
          isExternal: false,
          closeOnSelect: false,
        },
      ],
    },
  ];

  const filterMenuOptions: MenuOptionProps[] = queryDebounce
    ? menuOptions.map((menu) => ({
        ...menu,
        children: menu.children.filter((item) =>
          item.title.toLowerCase().includes(queryDebounce.toLowerCase()),
        ),
      }))
    : menuOptions;

  const handleSelect = (menu: MenuOptionItemProps) => {
    setQuery('');

    if (menu.closeOnSelect) setIsOpen(false);

    menu.click?.();

    if (menu.isExternal) {
      window.open(menu.href, '_blank');
    } else {
      router.push(menu?.href as string);
    }
  };

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setQuery(value);

  const handleFindGoogle = () => {
    const url =
      'https://www.google.com/search?q=' + queryDebounce + '&ref=shahbaz.dev';
    window.open(url, '_blank');
  };

  const isActiveRoute = (href: string) => {
    return router.pathname === href;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === 'k' &&
        !event.shiftKey
      ) {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={setIsOpen}
        data-umami-event='Command Palette: Open'
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-neutral-900/50 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-20'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='mx-auto max-w-2xl transform divide-y divide-neutral-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all dark:divide-neutral-800 dark:bg-neutral-900'>
              <Combobox onChange={handleSelect}>
                <div className='relative'>
                  <SearchIcon
                    className='pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-neutral-400'
                    aria-hidden='true'
                  />
                  <Combobox.Input
                    className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-neutral-900 placeholder-neutral-500 focus:ring-0 dark:text-neutral-100 dark:placeholder-neutral-400 sm:text-sm'
                    placeholder={placeholder}
                    onChange={handleSearch}
                    value={query}
                  />
                </div>

                {queryDebounce && (
                  <div className='flex flex-wrap items-center gap-2 border-t border-neutral-200 px-4 py-2.5 dark:border-neutral-800'>
                    <button
                      onClick={handleFindGoogle}
                      className='flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    >
                      <SearchIcon size={16} />
                      Search on Google
                    </button>
                  </div>
                )}

                {filterMenuOptions.map((menu) => (
                  <div key={menu.title} className='py-2'>
                    <div className='px-4 py-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400'>
                      {menu.title}
                    </div>
                    <Combobox.Options
                      static
                      className='max-h-96 overflow-y-auto py-1'
                    >
                      {menu.children.map((item) => (
                        <Combobox.Option
                          key={item.title}
                          value={item}
                          className={({ active }) =>
                            clsx(
                              'relative cursor-pointer select-none px-4 py-2',
                              active
                                ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                                : 'text-neutral-700 dark:text-neutral-300',
                            )
                          }
                        >
                          {({ selected, active }) => (
                            <>
                              <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-2'>
                                  {item.icon}
                                  <span
                                    className={clsx(
                                      'truncate',
                                      selected && 'font-semibold',
                                    )}
                                  >
                                    {item.title}
                                  </span>
                                </div>
                                {isActiveRoute(item.href) && (
                                  <div className='ml-auto flex items-center gap-1'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500' />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                ))}

                {queryDebounce &&
                  filterMenuOptions.every(
                    (menu) => menu.children.length === 0,
                  ) && (
                    <div className='px-4 py-14 text-center text-sm text-neutral-500 dark:text-neutral-400'>
                      <SearchIcon className='mx-auto h-6 w-6 text-neutral-400 dark:text-neutral-500' />
                      <p className='mt-4'>No results found.</p>
                      <p className='mt-2'>Try searching for something else.</p>
                    </div>
                  )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
