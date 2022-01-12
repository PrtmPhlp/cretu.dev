import { GitHubLogoIcon } from '@radix-ui/react-icons';
import React from 'react';

interface ProjectCardProps {
  url?: string;
  github?: string;
  title: string;
  description: string;
  type?: string;
}

function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectCard({
  url,
  github,
  title,
  description,
  type
}: ProjectCardProps): JSX.Element {
  return (
    <div>
      <p
        className={cx(
          'font-bold flex items-center space-x-1 text-black dark:text-white',
          type === 'small' ? 'text-md' : 'text-lg'
        )}
      >
        <span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="Website"
            className="custom-underline"
          >
            {title}
          </a>
          <span className="text-sm font-normal cursor-arrow">&#8599;</span>
        </span>
        <a href={github} target="_blank" rel="noreferrer" aria-label="Github">
          <GitHubLogoIcon
            className="w-4 h-auto pt-1 text-gray-900 transition-all duration-200 fill-current dark:text-white dark:text-opacity-40 dark:hover:text-opacity-100 text-opacity-40 hover:text-opacity-100"
          />
        </a>
      </p>
      <p>{description}</p>
    </div>
  );
}
