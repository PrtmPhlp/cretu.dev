import AnimatedGradientBox from '../app/components/AnimatedGradientBox';
import Card from '../app/components/card';
import ExternalLink from './ExternalLink';
import Flashcard from './Flashcard';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

const CustomLink = ({
  href = '',
  children,
  ...props
}: ComponentPropsWithoutRef<'a'>) => {
  const isInternalLink = href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <ExternalLink href={href} {...props}>
      {children}
    </ExternalLink>
  );
};

function RoundedImage({ alt, ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      className="rounded-lg"
      {...props}
      style={{
        height: 'auto',
        maxWidth: '100%',
      }}
    />
  );
}

const components = {
  AnimatedGradientBox,
  Card,
  Flashcard,
  Image: RoundedImage,
  a: CustomLink,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose-quoteless prose prose-neutral dark:prose-invert">
      {/* eslint-disable-next-line react-hooks/static-components -- useMDXComponent memoizes the compiled component per `code` */}
      <Component components={components} />
    </article>
  );
}

export default components;
