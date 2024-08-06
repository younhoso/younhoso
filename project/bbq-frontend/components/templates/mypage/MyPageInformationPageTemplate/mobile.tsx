import { FC } from 'react';

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
import { FONTSIZE_11, FONTSIZE_13, FONTSIZE_15, PLANCK } from '@/constants';

import { Template } from '../components';
import { MyPageInformationPageTemplateComponentProps } from './MyPageInformationPageTemplate';

export const MyPageInformationPageTemplateMobile: FC<
  MyPageInformationPageTemplateComponentProps
> = ({
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
    <Template.Mobile title="내 정보">
      <Container.Mobile flexDirection="v">
        <Grid columnCount={1} gap={PLANCK * 4}>
          <div>
            <Flex.RSE>
              <Text size={FONTSIZE_15}>아이디</Text>
              <Space.V1 />
              <Text size={FONTSIZE_11}>(수정불가)</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 110px">
              <Input.Mobile
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
              <Text size={FONTSIZE_15}>비밀번호</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 110px">
              <Input.Mobile
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
              <Button.Mobile
                full={true}
                fill={true}
                text={'비밀번호 변경'}
                color="black"
                shape={'round'}
                style={{ height: 38 }}
                onClick={handleChangePasswordButtonClick}
              />
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text size={FONTSIZE_15}>이름</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 110px">
              <Input.Mobile
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
              <Text size={FONTSIZE_15}>연락처</Text>
              <Space.V1 />
              <Text size={FONTSIZE_11} color={'#777777'}>
                (수정시 인증 과정이 필요합니다)
              </Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 110px">
              <Input.Mobile
                readonly={true}
                value={form.phoneNumber}
                placeholder=""
                shadow={true}
                onChange={e => {}}
              />
              <Space.V2 />
              <Button.Mobile
                full={true}
                fill={true}
                text={'휴대폰 번호 변경'}
                color="black"
                shape={'round'}
                style={{ height: 38 }}
                onClick={handleVerifyPhoneButtonClick}
              />
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text size={FONTSIZE_15}>이메일</Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 110px">
              <Input.Mobile
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
            <Text size={FONTSIZE_15}>생년월일</Text>
            <Space.H1 />
            <Text size={FONTSIZE_11} color={'#777777'} lineHeight={'1.4em'}>
              (선택/입력시 생일자 쿠폰등 다양한 혜택을 받으실 수 있습니다. 입력예시:1999년 9월
              22일인 경우 19990922)
            </Text>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 110px">
              <Input.Mobile
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
                  <Button.Mobile
                    full={true}
                    fill={true}
                    text={'생년월일 변경'}
                    color="black"
                    shape={'round'}
                    style={{ height: 38 }}
                    onClick={handleChangeDateButtonClick}
                  />
                </>
              ) : null}
            </Flex.RSC>
          </div>
          <div>
            <Flex.RSE>
              <Text size={FONTSIZE_15}>성별</Text>
              <Space.V1 />
              <Text size={FONTSIZE_11} color={'#777777'}>
                (선택)
              </Text>
            </Flex.RSE>
            <Space.H2_5 />
            <Flex.RSC layout="1 auto 110px">
              <Select.Mobile
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
        <Space.H6 />
        <Divider.H1 />
        <Space.H3 />
        <CheckBox.Mobile
          label={'마케팅 정보 이메일 알림 수신 동의 (선택)'}
          checked={form.agreeEmail}
          onClick={() => {
            setForm({ ...form, agreeEmail: !form.agreeEmail });
          }}
        />
        <Space.H3 />
        <CheckBox.Mobile
          label={'마케팅 정보 SMS 알림 수신 동의 (선택)'}
          checked={form.agreeSms}
          onClick={() => {
            setForm({ ...form, agreeSms: !form.agreeSms });
          }}
        />
        <Space.H3 />
        <Divider.H1 />
        <Space.H6 />
        <Button.Mobile
          full
          disabled={submitButtonDisabled}
          shape={'round'}
          text={'수정 완료'}
          color={'red'}
          size={'big'}
          onClick={handleSubmitButtonClick}
        />
        <Space.H5 />

        <Flex.RCC>
          <Text color={'#777777'} size={FONTSIZE_13}>
            회원 관리 번호: {memberId}
          </Text>
        </Flex.RCC>
        <Space.H4 />
        <Flex.RCC style={{ cursor: 'pointer' }} onClick={handleResignButtonClick}>
          <Text color={'#777777'} size={FONTSIZE_13}>
            회원탈퇴
          </Text>
        </Flex.RCC>
        <Space.H4 />
      </Container.Mobile>
    </Template.Mobile>
  );
};
