import React from "react";
import {Divider, Htag, Tag} from "../components";
import styles from "./index.module.css";
import Link from "next/link";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";

function Error404(): JSX.Element {

    return (
        <>
            <Htag tag='h1'>404 - Ошибка!</Htag>
            <p>Что-то пошло не так.</p>
            <ul>
                <li className={styles.popularList}>
                    <Link href={`/`}>
                        <Tag color="primary" size="md">
                            Вернуться на главную
                        </Tag>
                    </Link>
                </li>
            </ul>
            <Divider/>

        </>
    );
}
export default withLayout(Error404);

export const getStaticProps: GetStaticProps<Error404Props> = async () => {
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

export {Error404};

interface Error404Props extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
