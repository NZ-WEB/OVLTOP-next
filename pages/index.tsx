import {GetStaticProps} from 'next';
import Link from 'next/link';
import React, {useState} from 'react';
import {Button, Divider, Htag, Input, P, Rating, Tag, Textarea} from '../components';
import {withLayout} from '../layout/Layout';
import axios from 'axios';
import {MenuItem} from '../interfaces/menu.interface';
import {API} from '../helpers/api';
import styles from "./index.module.css";


function Home({menu}: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4);

    return (
        <>
            <Htag tag='h1'>Добро пожаловать на OWL top!</Htag>
            <p>Здесь представлены самые различные курсы по самым разным и восстребованным направлениям на рынке.</p>
            <ul>
                <li className={styles.popularList}>
                    <Link href={`/courses/financial-analytics`}>
                        <Tag color="primary" size="md">
                            Курсы финансовой аналитики
                        </Tag>
                    </Link>
                </li>
                <li className={styles.popularList}>
                    <Link href={`/courses/web-design`}>
                        <Tag color="primary" size="md">
                            Курсы веб дизайна
                        </Tag>
                    </Link>
                </li>
                <li className={styles.popularList}>

                    <Link href={`/courses/python`}>
                        <Tag color="primary" size="md">
                            Курсы python - разработки
                        </Tag>
                    </Link>
                </li>
                <li className={styles.popularList}>
                    <Link href={`/courses/webdev`}>
                        <Tag color="primary" size="md">
                            Курсы веб-разработки
                        </Tag>
                    </Link>
                </li>
            </ul>
            <Divider/>

        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
