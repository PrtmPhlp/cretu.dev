'use client';

import { GitHubLogo, TwitterLogo } from './Icons';
import { actions } from '@/data/cmd';
import { cn } from '@/lib/className';
import {
  HomeIcon,
  MoonIcon,
  PencilIcon,
  PlusIcon,
  ComputerDesktopIcon,
  SunIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useRef, useState, type JSX } from 'react';

export default function RollingMenu() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const memoizedActions = actions.filter((action) => {
    if (action.section === 'Themes') {
      return action.keywords !== resolvedTheme;
    }
    return true;
  });

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const changeTheme = (theme: string) => {
    if (theme === 'light') {
      setTheme('light');
    } else if (theme === 'dark') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, rotate: -360, scale: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        bounce: 0.5,
        damping: 10,
        delay: i * 0.05,
        type: 'spring' as const,
      },
      x: 0,
    }),
  };

  useEffect(() => {
    if (!expanded) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (ref.current?.contains(target)) return;

      setExpanded(false);
    };

    const scrolled = () => {
      setExpanded(false);
    };

    window.addEventListener('click', handleOutsideClick, { passive: true });
    window.addEventListener('scroll', scrolled, { passive: true });

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('scroll', scrolled);
    };
  }, [expanded]);

  useEffect(() => {
    const handler = (event: {
      key: string;
      metaKey: boolean;
      preventDefault: () => void;
    }) => {
      if (event.key === 'ArrowLeft' && expanded) {
        event.preventDefault();
      } else if (event.key === 'ArrowDown' && expanded) {
        event.preventDefault();
      } else if (event.key === 'Enter' && expanded) {
        // highlightedTab?.click();
      } else if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        setExpanded(!expanded);
      } else if (event.key === 'Escape') {
        setExpanded(false);
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  });

  return (
    <div className="flex items-center" ref={ref}>
      <motion.button
        animate={{ rotate: expanded ? 45 : 0 }}
        aria-label="Navigation Menu"
        className="m-2 flex h-12 w-12 items-center justify-center rounded-full bg-black select-none dark:bg-white"
        onClick={handleClick}
        whileTap={{ scale: 1.1 }}
      >
        <PlusIcon className="h-6 w-6 text-white dark:text-black" />
      </motion.button>
      <AnimatePresence>
        {expanded && (
          <motion.div className="flex space-x-2">
            {memoizedActions.map((action, i) => (
              <motion.div
                animate="visible"
                className="mx-0.5"
                custom={i}
                exit="hidden"
                initial="hidden"
                key={i}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
                tabIndex={-1}
                transition={{ bounce: 0.5, damping: 10, type: 'spring' }}
                variants={itemVariants}
                whileTap={{
                  scale: 1.1,
                  transition: {
                    duration: 0.4,
                    ease: [0.25, 1, 0.5, 1],
                    type: 'tween',
                  },
                }}
              >
                <Comp
                  as={
                    action.section === 'Navigation'
                      ? Link
                      : action.section === 'Socials'
                        ? 'a'
                        : 'button'
                  }
                  className={cn(
                    'flex h-12 w-12 cursor-pointer items-center justify-center transition-all duration-200 select-none',
                    'rounded-full',
                    `bg-[${action.color}]`,
                  )}
                  href={action.href ?? undefined}
                  key={i}
                  onClick={
                    action.section === 'Themes'
                      ? () => changeTheme(action.keywords!)
                      : undefined
                  }
                  rel={
                    action.section === 'Socials'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  tabIndex={0}
                  target={action.section === 'Socials' ? '_blank' : undefined}
                >
                  {action.keywords === 'home' && (
                    <HomeIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'writing' && (
                    <PencilIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'publications' && (
                    <DocumentTextIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'github' && (
                    <GitHubLogo
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'twitter' && (
                    <TwitterLogo
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'light' && (
                    <SunIcon className={`h-6 w-6 text-[${action.iconColor}]`} />
                  )}
                  {action.keywords === 'dark' && (
                    <MoonIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                  {action.keywords === 'system' && (
                    <ComputerDesktopIcon
                      className={`h-6 w-6 text-[${action.iconColor}]`}
                    />
                  )}
                </Comp>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Comp({
  as,
  children,
  ...props
}: {
  [key: string]: unknown;
  as: React.ElementType;
  children: React.ReactNode;
}): JSX.Element {
  // Fully dynamic element (`Link`, `a`, `button`, …): the props are whatever
  // the caller forwards, so widen to a generic component type.
  const Component = as as React.ComponentType<Record<string, unknown>>;
  return <Component {...props}>{children}</Component>;
}
