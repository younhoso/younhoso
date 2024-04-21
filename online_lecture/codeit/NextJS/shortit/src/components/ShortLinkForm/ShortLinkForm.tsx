import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ShortLinkFormStyled } from "./styled";
import Card from "../Card/Card";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface ShortLinkFormProps {
  type?: string;
  initialValues?: {
    title: string;
    url: string;
  };
  onSubmit: (values: { title: string; url: string }) => void;
}

export const ShortLinkFormType = {
  Create: "create",
  Edit: "edit",
};

export default function ShortLinkForm({
  type = ShortLinkFormType.Create,
  initialValues = {
    title: "",
    url: "",
  },
  onSubmit,
}: ShortLinkFormProps) {
  const { title, url } = initialValues;
  const [values, setValues] = useState({ title, url });
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(values);
    setValues({
      title: "",
      url: "",
    });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <ShortLinkFormStyled className={clsx("ShortLinkForm")}>
      <Card>
        <form onSubmit={handleSubmit}>
          <label>
            제목
            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="제목을 입력해주세요."
            />
          </label>
          <label>
            주소
            <Input
              name="url"
              value={values.url}
              onChange={handleChange}
              placeholder="https://example.com/long-url"
            />
          </label>
          <div>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button>
              {type === ShortLinkFormType.Create
                ? "등록하기"
                : type === ShortLinkFormType.Edit
                ? "수정하기"
                : null}
            </Button>
          </div>
        </form>
      </Card>
    </ShortLinkFormStyled>
  );
}
