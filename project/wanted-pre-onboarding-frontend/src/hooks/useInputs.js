import { useState, useCallback } from "react";

const useInputs = (initialForm) => {
	const [form, setForm] = useState(initialForm);

	const onChange = useCallback((name, value) => {
    setForm((form) => ({
      ...form,
      [name]: value
    }))
  },[]);

  const reset = useCallback(() => setForm(initialForm), [initialForm])
  return [form, onChange, reset];
}

export default useInputs;