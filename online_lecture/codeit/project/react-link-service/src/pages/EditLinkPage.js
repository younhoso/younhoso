import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../lib/axios';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './EditLinkPage.module.css';

function EditLinkPage() {
  const [values, setValues] = useState({
    title: '',
    url: '',
  });
  const params = useParams();
  const linkId = params.id;
  const navigate = useNavigate();

  async function getLink() {
    const res = await axios.get(`/users/me/links/${params.linkId}`);
    const { title, url } = res.data;
    setValues({ title, url });
  }

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
    await axios.patch(
      `/users/me/links/${params.linkId}`,
      { title, url }
    );
    navigate('/me');
  }

  useEffect(() => {
    getLink(linkId);
  }, [linkId]);

  return (
    <>
      <h1 className={styles.Heading}>링크 편집</h1>
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
        <Button className={styles.Button}>적용하기</Button>
      </form>
    </>
  );
}

export default EditLinkPage;
