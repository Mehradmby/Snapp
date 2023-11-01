import React, { useRef } from "react";
import { useDebouncedForm } from "../../../common/hooks/useFrom";

const MyForm: React.FC = () => {
  const ref = useRef(null);
  const { formState, handleChange, handleSubmit, resetForm, onBlurInput } =
    useDebouncedForm({
      initialValues: {
        name: "",
        email: "",
      },
      debounceTime: 3000, // 3-second debounce time
      onSubmit: (values) => {
        // Handle form submission with debounced values
        console.log("Submitting", values);
      },
      functionToDoAfterDebounce: () => {
        //here is the function to do everything client want to do after debounce time
        console.log("functionToDoAfterDebounce");
      },
      functionToDoAfterBlur: () => {
        //here is the function to do everything client want to do after blue
        console.log("functionToDoAfterBlur");
      },
      formRef: ref,
    });
  //this is the state that give us back the values
  console.log(formState);
  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
      ref={ref}
    >
      <input
        onBlur={onBlurInput}
        type="text"
        name="name"
        onChange={handleChange}
        className="border border-red-500 w-52"
      />
      <input
        onBlur={onBlurInput}
        type="text"
        name="email"
        onChange={handleChange}
        className="border border-red-500 w-52"
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
};

export default MyForm;
