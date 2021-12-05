import styles from './Menu.module.css';
import { P } from '../../components';
import cn from 'classnames';
import { format } from 'date-fns';
import React, {useContext, KeyboardEvent, useState} from 'react';
import { AppContext } from '../../context/app.context';
import { firstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers'
import Link from 'next/link';
import { useRouter } from 'next/router';
import {motion, useReducedMotion} from 'framer-motion';

export const Menu = ():JSX.Element => {
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined);
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0 }
	};

	const variantsChildren = shouldReduceMotion ? {} : {
		visible: {
			opacity: 1,
			height: 29,
		},
		hidden: { opacity: 0, height: 0 }
	};


	const openScondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpend ? 'closed' : 'opened');
				m.isOpend = !m.isOpend;
			}

			return m;
		}));
	};

	const openScondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault();
			openScondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul>
				{firstLevelMenu.map(m => (
					<li key={ m.route }>
						<Link href={`/${ m.route }`}>
							<a>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory
								})} >
									{ m.icon }
									<span>{ m.name }</span>
								</div>
							</a>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: firstLevelMenuItem) => {
		return (
			<ul className={ styles.secondBlock }>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpend = true
					}

					return (
						<li
							tabIndex={0}
							onKeyDown={(key: KeyboardEvent) => openScondLevelKey(key, m._id.secondCategory)}
							key={ m._id.secondCategory }
						>
							<div
								className={styles.secondLevel}
								onClick={() => openScondLevel(m._id.secondCategory)}
								onKeyDown={() => openScondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpend}
							>{ m._id.secondCategory }
							</div>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpend ? 'visible' : 'hidden'}
								animate={m.isOpend ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpend)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.ul
					key={p._id}
					variants={variantsChildren}
				>
					<Link  href={`/${route}/${p.alias}`} >
						<a
							onKeyDown={() => router.push(`/${route}/${p.alias}`)}
							tabIndex={isOpened ? 0 : -1}
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
							})}
						>
							{ p.category }
						</a>
					</Link>
				</motion.ul>
			))
		);
	};

	return (
		<div className={styles.menu} >
			{announce && <span className={styles.visuallyHidden} role="log" > { announce == 'opened' ? 'развёрнуто' : 'свёрнуто' } </span>}
			{buildFirstLevel()}
		</div>
	);
};
