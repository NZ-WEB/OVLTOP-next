import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from './close.svg'
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';


export const ReviewForm = ({ productId, isOpened, className, ...props }:ReviewFormProps):JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>(undefined);


	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId});
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что-то пошло не так');
			}
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder="Имя"
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', { required: {value: true, message: 'Заполните заголовок'} })}
					placeholder="Заголовок отзыва"
					className={styles.title}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name="rating"
						rules={{ required: {value: true, message: 'Обязательное поле'}}}
						render={({ field }) => {
							return <Rating
								error={errors.rating}
								isEditable
								setRating={field.onChange}
								rating={field.value}
								tabIndex={isOpened ? 0 : -1}
								aria-invalid={error ? true : false}
							/>
						}}
					/>
				</div>
				<Textarea
					{...register('description', { required: {value: true, message: 'Заполните описание'}})}
					placeholder="Текст отзыва"
					className={styles.description}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					area-label="Текст описания отзыва"
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit} >
					<Button tabIndex={isOpened ? 0 : 1} appearance="primary">
						Отправить
					</Button>
					<span>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && <div role="alert" className={cn(styles.success, styles.panel)}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div className={styles.successDescription} >
					Спасибо за ваш отзыв! После проверки модератора, он разместится здесь.
				</div>
				<button
					className={styles.close}
					onClick={() => setIsSuccess(false)}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon />
				</button>
			</div>}

			{error && <div role="alert" className={cn(styles.error, styles.panel)}>
				Что-то пошло не так, попробуйте обновить страницу
				<button
					className={styles.close}
					onClick={() => setError(undefined)}
					aria-label="Закрыть оповещение"
				>
					<CloseIcon />
				</button>
			</div>}
		</form>
	);
};
