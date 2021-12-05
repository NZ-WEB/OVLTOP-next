import styles from './SearchForm.module.css';
import SearchIcon from './search.svg';
import Link from 'next/link';
import { SearchFormProps } from './SearchForm.props';
import cn from 'classnames';
import {Button, ButtonIcon, Input} from '..';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchForm({ className, ...props }:SearchFormProps) {

	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const GoToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		})
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			GoToSearch();
		}
	};

	return (
		<div className={cn(className, styles.search)} {...props} >
			<Input
				className={styles.input}
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={() => handleKeyDown}
			/>
			<ButtonIcon
				appearance="primary"
				className={styles.button}
				onClick={() => GoToSearch()}
				icon={<SearchIcon/>}
			>
			</ButtonIcon>
		</div>
	);
}
