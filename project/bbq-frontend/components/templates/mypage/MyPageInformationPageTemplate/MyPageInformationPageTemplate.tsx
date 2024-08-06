import { FC, ReactNode } from 'react';

import {
  CheckBox,
  Container,
  Divider,
  Flex,
  Grid,
  Input,
  Select,
  Space,
  Text,
} from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_12, FONTSIZE_14, PLANCK } from '@/constants';

import { Template } from '../components';
import { MyPageInformationPageTemplateMobile } from './mobile';

export type MyPageInformationPageForm = {
  username: string;
  oldPassword: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  ciToken?: string;
  birth?: string;
  gender?: string;
  agreeEmail: boolean;
  agreeSms: boolean;
};

export interface MyPageInformationPageTemplateProps {
  form: MyPageInformationPageForm;
  setForm: (form: MyPageInformationPageForm) => void;
  handleChangeDateButtonClick: () => void;
  handleVerifyPhoneButtonClick: () => void;
  handleChangePasswordButtonClick: () => void;
  submitButtonDisabled: boolean;
  handleSubmitButtonClick: () => void;
  handleResignButtonClick: () => void;
  memberId?: string;
}

export interface MyPageInformationPageTemplateComponentProps
  extends MyPageInformationPageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageInformationPageTemplate: FC<MyPageInformationPageTemplateComponentProps> & {
  Mobile: FC<MyPageInformationPageTemplateComponentProps>;
} = ({
  form,
  setForm,
  handleChangeDateButtonClick,
  handleVerifyPhoneButtonClick,
  handleChangePasswordButtonClick,
  submitButtonDisabled,
  handleSubmitButtonClick,
  handleResignButtonClick,
  memberId,
}) => {
  return (
    <Template title="내 정보">
      <Container flexDirection="v">
        <Grid columnCount={1} gap={PLANCK * 6}>
          <div>
            <Flex.RSE>
              <Text>아이디</Text>
              <Space.V1 />
              <Text size={FONTSIZE_12}>(수정불가)</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 150px">
              <Input
                disabled={true}
                readonly={true}
                value={form.username}
                placeholder=""
                shadow={true}
                onChange={e => {}}
              />
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text>비밀번호</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 150px">
              <Input
                type="password"
                disabled={true}
                readonly={true}
                value={form.password}
                placeholder=""
                shadow={true}
                onChange={e => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
              <Space.V2 />
              <Button
                full={true}
                fill={true}
                text={'비밀번호 변경'}
                color="black"
                shape={'round'}
                style={{ height: 44 }}
                onClick={handleChangePasswordButtonClick}
              />
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text>이름</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 150px">
              <Input
                value={form.name}
                placeholder=""
                shadow={true}
                onChange={e => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text>연락처</Text>
              <Space.V1 />
              <Text size={FONTSIZE_12} color={'#777777'}>
                (수정시 인증 과정이 필요합니다)
              </Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 150px">
              <Input
                readonly={true}
                value={form.phoneNumber}
                placeholder=""
                shadow={true}
                onChange={e => {}}
              />
              <Space.V2 />
              <Button
                full={true}
                fill={true}
                text={'휴대폰 번호 변경'}
                color="black"
                shape={'round'}
                style={{ height: 44 }}
                onClick={handleVerifyPhoneButtonClick}
              />
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text>이메일</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 150px">
              <Input
                value={form.email}
                placeholder="이메일 입력"
                shadow={true}
                onChange={e => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text>생년월일</Text>
              <Space.V1 />
              <Text size={FONTSIZE_12} color={'#777777'}>
                (선택/입력시 생일자 쿠폰등 다양한 혜택을 받으실 수 있습니다. 입력예시:1999년 9월
                22일인 경우 19990922)
              </Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 150px">
              <Input
                readonly={true}
                value={
                  form.birth
                    ? `${Number(form.birth.split('-')[0].replace(/[^0-9]/g, ''))}년 ${Number(
                        form.birth.split('-')[1].replace(/[^0-9]/g, ''),
                      )}월 ${Number(form.birth.split('-')[2].replace(/[^0-9]/g, ''))}일`
                    : '없음'
                }
                placeholder=""
                shadow={true}
                onChange={e => {}}
              />
              {!form.birth ? (
                <>
                  <Space.V2 />
                  <Button
                    full={true}
                    fill={true}
                    text={'생년월일 변경'}
                    color="black"
                    shape={'round'}
                    style={{ height: 44 }}
                    onClick={handleChangeDateButtonClick}
                  />
                </>
              ) : null}
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text>성별</Text>
              <Space.V1 />
              <Text size={FONTSIZE_12} color={'#777777'}>
                (선택)
              </Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 150px">
              <Select
                shadow={true}
                options={[
                  { value: '', label: '(선택해 주세요)' },
                  { value: 'F', label: '여성' },
                  { value: 'M', label: '남성' },
                ]}
                placeholder={'성별 (선택)'}
                value={form.gender}
                onChange={value => {
                  setForm({ ...form, gender: value });
                }}
              />
            </Flex.RSC>
          </div>
        </Grid>
        <Space.H8 />
        <Divider.H1 />
        <Space.H3 />
        <CheckBox
          label={'마케팅 정보 이메일 알림 수신 동의 (선택)'}
          checked={form.agreeEmail}
          onClick={() => {
            setForm({ ...form, agreeEmail: !form.agreeEmail });
          }}
        />
        <Space.H3 />
        <CheckBox
          label={'마케팅 정보 SMS 알림 수신 동의 (선택)'}
          checked={form.agreeSms}
          onClick={() => {
            setForm({ ...form, agreeSms: !form.agreeSms });
          }}
        />
        <Space.H3 />
        <Divider.H1 />
        <Space.H4 />
        <Text color={'#777777'} size={FONTSIZE_14}>
          회원 관리 번호: {memberId}
        </Text>
        <Space.H4 />
        <div style={{ cursor: 'pointer' }} onClick={handleResignButtonClick}>
          <Text color={'#777777'} size={FONTSIZE_14}>
            회원탈퇴
          </Text>
        </div>
        <Space.H8 />
        <Flex.RCC full={true}>
          <Button
            disabled={submitButtonDisabled}
            shape={'round'}
            text={'수정 완료'}
            color={'red'}
            size={'big'}
            style={{ width: 320 }}
            onClick={handleSubmitButtonClick}
          />
        </Flex.RCC>
      </Container>
    </Template>
  );
};
MyPageInformationPageTemplate.Mobile = MyPageInformationPageTemplateMobile;
