import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement> {
	appearance: 'primary' | 'ghost' | 'white';
	arrow?: 'right' | 'down' | 'none';
	disabled?: boolean;
	icon: JSX.Element;
}
