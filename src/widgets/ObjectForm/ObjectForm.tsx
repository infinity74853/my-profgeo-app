// src/widgets/ObjectForm/ObjectForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './ObjectForm.module.css';

export type FormValues = {
  name: string;
  code: string;
  contractNumber: string;
  contractDate: string;   // HTML <input type="date" /> вернет YYYY-MM-DD
  designation: string;
  customer: string;
  contractor: string;
};

// Схема валидации: обязательны name и code, остальные — опциональны (строки)
const schema = yup
  .object({
    name: yup.string().required('Введите наименование объекта'),
    code: yup.string().required('Введите шифр'),
    contractNumber: yup.string().optional().default(''),
    contractDate: yup.string().optional().default(''),
    designation: yup.string().optional().default(''),
    customer: yup.string().optional().default(''),
    contractor: yup.string().optional().default(''),
  })
  .required();

const defaultValues: FormValues = {
  name: '',
  code: '',
  contractNumber: '',
  contractDate: '',
  designation: '',
  customer: '',
  contractor: '',
};

type ObjectFormProps = {
  onSubmit?: SubmitHandler<FormValues>;
};

const ObjectForm: React.FC<ObjectFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });

  // Заглушка, если проп не передан — чтобы не ломать текущий вызов <ObjectForm />
  const fallbackSubmit: SubmitHandler<FormValues> = (data) => {
    // тут потом заменим на вызов эффекта submitFormFx()
    // eslint-disable-next-line no-console    
  };

  return (
    <form
      id="object-form"
      className={styles.form}
      onSubmit={handleSubmit(onSubmit ?? fallbackSubmit)}
      noValidate
    >
      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Наименование объекта*</span>
          <input
            {...register('name')}
            placeholder="Введите наименование объекта"
          />
          {errors.name && <em className={styles.err}>{errors.name.message}</em>}
        </label>

        <label className={styles.field}>
          <span>Шифр*</span>
          <input
            {...register('code')}
            placeholder="Введите шифр"
          />
          {errors.code && <em className={styles.err}>{errors.code.message}</em>}
        </label>

        <label className={styles.field}>
          <span>Договор</span>
          <input
            {...register('contractNumber')}
            placeholder="Введите номер договора"
          />
        </label>

        <label className={styles.field}>
          <span>Дата договора</span>
          <input
            type="date"
            {...register('contractDate')}
            placeholder="Выберите дату договора"
          />
        </label>

        <label className={styles.field}>
          <span>Обозначение</span>
          <input
            {...register('designation')}
            placeholder="Введите обозначение договора"
          />
        </label>

        <label className={styles.field}>
          <span>Заказчик</span>
          <input
            {...register('customer')}
            placeholder="Введите наименование заказчика"
          />
        </label>

        <label className={styles.fieldWide}>
          <span>Подрядчик</span>
          <input
            {...register('contractor')}
            placeholder="Введите наименование подрядчика"
          />
        </label>
      </div>
    </form>
  );
};

export { ObjectForm };
export default ObjectForm;
