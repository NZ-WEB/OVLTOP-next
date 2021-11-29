import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>  {
	tag: 'h1' | 'h2' | 'h3';
	children: ReactNode;
}