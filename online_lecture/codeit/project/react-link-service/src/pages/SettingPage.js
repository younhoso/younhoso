import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import AvatarInput from '../components/AvatarInput';
import styles from './SettingPage.module.css';

function SettingPage() {
  const [initialAvatar, setInitialAvatar] = useState('');
  const [values, setValues] = useState({
    avatar: '',
    name: '',
    email: '',
    bio: '',
  });
  const navigate = useNavigate();

  async function getMe() {
    const res = await axios.get('/users/me');
    const nextUser = res.data;
    const { avatar, name, email, bio } = nextUser;
    setValues({ name, email, bio });
    setInitialAvatar(avatar);
  }

  function handleChange(name, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', values.avatar);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('bio', values.bio);
    await axios.patch('/users/me', formData);
    navigate('/me');
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <h1 className={styles.Heading}>프로필 편집</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <AvatarInput
          name="avatar"
          initialAvatar={initialAvatar}
          className={styles.Input}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="이름"
          value={values.name}
          onChange={handleInputChange}
        />
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleInputChange}
        />
        <Label className={styles.Label} htmlFor="bio">
          내 링크 소개
        </Label>
        <TextArea
          id="bio"
          className={styles.TextArea}
          name="bio"
          type="text"
          maxLength={64}
          placeholder="아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"
          value={values.bio}
          onChange={handleInputChange}
        />
        <Button className={styles.Button}>적용하기</Button>
      </form>
    </>
  );
}

export default SettingPage;
