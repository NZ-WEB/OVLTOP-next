import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import React, {FC, FunctionComponent, useRef, useState} from 'react';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { KeyboardEvent } from 'react';
import { AppContextProvider, IAppContext } from '../context/app.context';
import {Up} from "../components";
import cn from 'classnames';


const Layout = ({ children }:LayoutProps):JSX.Element => {
	const [skipLink, setSkipLink] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			bodyRef.current.focus();
		}
		setSkipLink(false);
	};

	return (
		<div
			className={styles.wrapper}
		>
			<a
				onFocus={() => setSkipLink(true)}
				tabIndex={69}
				className={cn(styles.skipLink, {
					[styles.displayed]: skipLink
				})}
				onKeyDown={skipContentAction}
			>Сразу к содержанию</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div className={styles.body} ref={bodyRef} tabIndex={0}>
				{children}
			</div>
			<Footer className={styles.footer} />
			<Up/>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FC<T>) => {
	return function withLayoutComponent(props: T) {
		return (
			<AppContextProvider menu={ props.menu } firstCategory={ props.firstCategory } >
				<Layout>
					<Component {...props}/>
				</Layout>
			</AppContextProvider>

		);
	};
};
