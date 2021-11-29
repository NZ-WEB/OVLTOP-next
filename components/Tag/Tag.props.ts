import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>,HTMLDivElement> {
	children: ReactNode;
	size?: 'sm' | 'md';
	color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
	href?: string;
}