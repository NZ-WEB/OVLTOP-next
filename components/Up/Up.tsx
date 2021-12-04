import styles from './Up.module.css';
import UpIcon from './up.svg';
import {useScrollY} from "../../hooks/useScrollY";
import {useAnimation, motion} from "framer-motion";
import {useEffect} from "react";

export const Up = (): JSX.Element => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({ opacity: y * 3 / document.body.scrollHeight });
    }, [y, controls])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };


    return (
        <motion.button
            className={styles.up}
            onClick={scrollToTop}
            animate={controls}
            initial={{opacity: 0}}
        >
            <UpIcon className={styles.arrow} />
        </motion.button>
    );
};
