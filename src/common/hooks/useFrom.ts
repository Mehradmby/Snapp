import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useMemo,
  RefObject,
} from "react";
import { debounce } from "lodash";
type UseDebouncedFormOptions = {
  initialValues: { [key: string]: string };
  debounceTime: number;
  formRef: RefObject<HTMLFormElement>;
  onSubmit: (formState: { [key: string]: string }) => void;
  functionToDoAfterDebounce?: () => void;
  functionToDoAfterBlur?: () => void;
};

export const useDebouncedForm = ({
  initialValues,
  debounceTime = 3000,
  formRef,
  onSubmit,
  functionToDoAfterDebounce,
  functionToDoAfterBlur,
}: UseDebouncedFormOptions) => {
  const [formState, setFormState] = useState(initialValues);

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    functionToDoAfterDebounce?.();
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, debounceTime);

  const checkIfDuplicate = (nameKey: string, value: string) => {
    const isThereAnyDuplicate = formState[nameKey] === value;
    return isThereAnyDuplicate;
  };
  const onBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (checkIfDuplicate(name, value)) {
      return null;
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    functionToDoAfterBlur?.();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  const resetForm = () => {
    setFormState(initialValues);
    formRef.current?.reset();
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    resetForm,
    onBlurInput,
  };
};
