import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './CreateLinkPage.module.css';

function CreateLinkPage() {
  const [values, setValues] = useState({
    title: '',
    url: '',
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { title, url } = values;
    await axios.post(
      '/users/me/links',
      { title, url },
    );
    navigate('/me');
  }

  return (
    <>
      <h1 className={styles.Heading}>링크 추가</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="title">
          사이트 이름
        </Label>
        <Input
          id="title"
          className={styles.Input}
          name="title"
          type="text"
          placeholder="사이트 이름"
          value={values.title}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="url">
          링크
        </Label>
        <Input
          id="url"
          className={styles.Input}
          name="url"
          type="text"
          placeholder="https://www.example.com"
          value={values.url}
          onChange={handleChange}
        />
        <Button className={styles.Button}>등록하기</Button>
      </form>
    </>
  );
}

export default CreateLinkPage;
