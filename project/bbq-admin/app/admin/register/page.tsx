'use client';

import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';

interface AdminRegisterCondition {
  userId: string;
  password: string;
  passwordCheck: string;
  useNewPassword: boolean;
  newPassword: string;
  newPasswordCheck: string;
  name: string;
  empId: string;
  isUsed: string;
  isDeleted: boolean;
  authorities: string[];
  allowIps: AllowIP[];
}

interface AllowIP {
  isAllowAll: string[];
  isUsed: string[];
  allowIp: string;
  allowIpDesc: string;
  date: DateRangePickerValue;
}

export default function CouponRegisterPage() {
  const router = useRouter();
  const { openModal } = useModalContext();

  const searchParams = useSearchParams();
  const typeMode = !searchParams || searchParams.get('id') === null;

  const initalAllowIp = {
    isAllowAll: [],
    isUsed: ['true'],
    allowIp: '',
    allowIpDesc: '',
    date: {
      from: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).add(1, 'year').format('YYYY-MM-DD')),
    },
  };
  const [selectedValue, setSelectedValue] = useState<AdminRegisterCondition>({
    userId: '',
    password: '',
    passwordCheck: '',
    useNewPassword: false,
    newPassword: '',
    newPasswordCheck: '',
    name: '',
    empId: '',
    isUsed: 'true',
    isDeleted: false,
    authorities: [],
    allowIps: [initalAllowIp],
  });

  const handleValueChange = (
    key: keyof AdminRegisterCondition,
    value: string | object | number[] | Date,
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getData = async () => {
    try {
      if (typeMode) {
        return;
      }
      const id = searchParams && searchParams.get('id');
      const res = await getAxios().get(`/api/admin/${id}`);
      setSelectedValue({
        userId: res.data.userId,
        password: '',
        passwordCheck: '',
        useNewPassword: false,
        newPassword: '',
        newPasswordCheck: '',
        name: res.data.name,
        empId: res.data.empId,
        isUsed: res.data.isUsed ? 'true' : 'false',
        isDeleted: res.data.isDeleted,
        authorities: res.data.authorities.map((data: any) => data.authority),
        allowIps: res.data.allowIps.map((data: any) => {
          return {
            isAllowAll: data.isAllowAll.length ? ['true'] : ['false'],
            allowIp: data.allowIp,
            allowIpDesc: data.allowIpDesc,
            isUsed: data.isUsed ? ['true'] : ['false'],
            date: {
              from: dayjs(data.startDate).toDate(),
              to: dayjs(data.endDate).toDate(),
            },
          };
        }),
      });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const validationCheck = () => {
    if (selectedValue.userId.length < 6 || selectedValue.userId.length > 12) {
      alert('아이디는 6~12 자리의 숫자 또는 영문 소문자를 사용하여 입력해주세요');
      return false;
    }
    if (selectedValue.password.length < 8 || selectedValue.password.length > 20) {
      alert('비밀번호는 8자 이상 20자 이하로 입력해주세요');
      return false;
    }
    if (selectedValue.password !== selectedValue.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (selectedValue.name.length < 2 || selectedValue.name.length > 10) {
      alert('이름은 2자 이상 10자 이하로 입력해주세요');
      return false;
    }
    if (selectedValue.allowIps.filter(data => data.allowIp.length < 1).length > 0) {
      alert('IP 주소를 입력해주세요');
      return false;
    }
    if (selectedValue.allowIps.filter(data => data.allowIpDesc.length < 1).length > 0) {
      alert('IP 주소 설명을 입력해주세요');
      return false;
    }
    if (
      selectedValue.allowIps.filter(
        data => data.date.from == undefined || data.date.to == undefined,
      ).length > 0
    ) {
      alert('사용 가능 시작일과 종료일을 입력해주세요');
      return false;
    }
    return true;
  };

  const modifyAdmin = async () => {
    try {
      if (selectedValue.name.length < 2 || selectedValue.name.length > 10) {
        alert('이름은 2자 이상 10자 이하로 입력해주세요');
        return false;
      }
      if (
        (selectedValue.useNewPassword && selectedValue.newPassword.length < 8) ||
        selectedValue.newPassword.length > 20
      ) {
        alert('새 비밀번호는 8자 이상 20자 이하로 입력해주세요');
        return false;
      }
      if (
        selectedValue.useNewPassword &&
        selectedValue.newPassword !== selectedValue.newPasswordCheck
      ) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return false;
      }
      if (selectedValue.allowIps.filter(data => data.allowIp.length < 1).length > 0) {
        alert('IP 주소를 입력해주세요');
        return false;
      }
      if (selectedValue.allowIps.filter(data => data.allowIpDesc.length < 1).length > 0) {
        alert('IP 주소 설명을 입력해주세요');
        return false;
      }
      if (
        selectedValue.allowIps.filter(
          data => data.date.from == undefined || data.date.to == undefined,
        ).length > 0
      ) {
        alert('사용 가능 시작일과 종료일을 입력해주세요');
        return false;
      }

      const result = await getAxios().patch(`/api/admin/${searchParams?.get('id')}`, {
        name: selectedValue.name,
        empId: selectedValue.empId,
        isUsed: selectedValue.isUsed == 'true' ? true : false,
        isDeleted: selectedValue.isDeleted,
        ...(selectedValue.useNewPassword && {
          password: selectedValue.newPassword,
        }),
        authorities:
          selectedValue.authorities[0] == 'all'
            ? ['SYSTEM', 'CONTENT', 'ORDER', 'FAMILY', 'MENU', 'COUPON', 'CUSTOMER'].map(x => {
                return {
                  authority: x,
                };
              })
            : selectedValue.authorities.map(x => {
                return {
                  authority: x,
                };
              }),
        allowIps: selectedValue.allowIps.map(data => {
          return {
            isAllowAll: data.isAllowAll[0] === 'true' ? true : false,
            isUsed: data.isUsed[0] === 'true' ? true : false,
            allowIp: data.allowIp,
            allowIpDesc: data.allowIpDesc,
            startDate: dayjs(data.date.from).format('YYYY-MM-DD'),
            endDate: dayjs(data.date.to).format('YYYY-MM-DD'),
          };
        }),
      });
      if (result.status == 200) {
        alert('관리자 정보가 수정되었습니다.');
        router.push('/admin');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const registerAdmin = async () => {
    try {
      if (!validationCheck()) {
        return;
      }

      const result = await getAxios().post('/api/admin', {
        userId: selectedValue.userId,
        password: selectedValue.password,
        passwordCheck: selectedValue.passwordCheck,
        name: selectedValue.name,
        empId: selectedValue.empId,
        isUsed: selectedValue.isUsed == 'true' ? true : false,
        isDeleted: selectedValue.isDeleted,
        authorities:
          selectedValue.authorities[0] == 'all'
            ? ['SYSTEM', 'CONTENT', 'ORDER', 'FAMILY', 'MENU', 'COUPON', 'CUSTOMER'].map(x => {
                return {
                  authority: x,
                };
              })
            : selectedValue.authorities.map(x => {
                return {
                  authority: x,
                };
              }),
        allowIps: selectedValue.allowIps.map(data => {
          return {
            isAllowAll: data.isAllowAll[0] === 'true' ? true : false,
            isUsed: data.isUsed[0] === 'true' ? true : false,
            allowIp: data.allowIp,
            allowIpDesc: data.allowIpDesc,
            startDate: dayjs(data.date.from).format('YYYY-MM-DD'),
            endDate: dayjs(data.date.to).format('YYYY-MM-DD'),
          };
        }),
      });
      if (result.status == 200) {
        alert('관리자 등록되었습니다.');
        router.push('/admin');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert(error);
      }
    }
  };

  return (
    <>
      <Card className="p-0">
        <div className="border-b p-5">
          <Title>관리자 정보</Title>
        </div>
        <Flex flexDirection="col" className="p-5 gap-5">
          <Flex justifyContent="start" className="border-b pb-5">
            <Text className="w-[150px]">아이디*</Text>
            <TextInput
              disabled={searchParams && searchParams.get('id') ? true : false}
              className="w-full"
              value={selectedValue.userId}
              onChange={e => handleValueChange('userId', e.target.value)}
              placeholder="아이디는 6~12 자리의 숫자 또는 영문 소문자를 사용하여 입력해주세요"
            />
          </Flex>
          <Flex justifyContent="start" className="border-b pb-5">
            <Text className="w-[150px]">비밀번호*</Text>
            {searchParams && searchParams.get('id') ? (
              <div className="w-full">
                <CustomButton
                  onClick={() =>
                    selectedValue.useNewPassword
                      ? setSelectedValue({
                          ...selectedValue,
                          useNewPassword: false,
                        })
                      : setSelectedValue({
                          ...selectedValue,
                          useNewPassword: true,
                          newPassword: '',
                          newPasswordCheck: '',
                        })
                  }
                  type="secondary"
                >
                  비밀번호 변경
                </CustomButton>
              </div>
            ) : (
              <TextInput
                disabled={searchParams && searchParams.get('id') ? true : false}
                className="w-full security"
                value={selectedValue.password}
                onChange={e => handleValueChange('password', e.target.value)}
                placeholder="비밀번호는 8자 이상 20자 이하로 입력해주세요"
              />
            )}
          </Flex>
          {searchParams && !searchParams.get('id') && (
            <Flex justifyContent="start" className="border-b pb-5">
              <Text className="w-[150px]">비밀번호 확인*</Text>
              <TextInput
                disabled={searchParams && searchParams.get('id') ? true : false}
                className="w-full security"
                value={selectedValue.passwordCheck}
                onChange={e => handleValueChange('passwordCheck', e.target.value)}
                placeholder="비밀번호를 다시 한번 입력해주세요"
              />
            </Flex>
          )}
          {selectedValue.useNewPassword && (
            <>
              <Flex justifyContent="start" className="pb-5">
                <Text className="w-[150px]">새 비밀번호*</Text>
                <TextInput
                  className="w-full security"
                  value={selectedValue.newPassword}
                  onChange={e => handleValueChange('newPassword', e.target.value)}
                  placeholder="새 비밀번호는 8자 이상 20자 이하로 입력해주세요"
                />
              </Flex>
              <Flex justifyContent="start" className="border-b pb-5">
                <Text className="w-[150px]">새 비밀번호 확인*</Text>
                <TextInput
                  className="w-full security"
                  value={selectedValue.newPasswordCheck}
                  onChange={e => handleValueChange('newPasswordCheck', e.target.value)}
                  placeholder="새 비밀번호를 다시 한번 입력해주세요"
                />
              </Flex>
            </>
          )}
          <Flex justifyContent="start" className="border-b pb-5">
            <Text className="w-[150px]">이름*</Text>
            <TextInput
              className="w-full"
              value={selectedValue.name}
              onChange={e => handleValueChange('name', e.target.value)}
              placeholder="이름은 2자 이상 10자 이하로 입력해주세요"
            />
          </Flex>
          <Flex justifyContent="start" className="border-b pb-5">
            <Text className="w-[150px]">사번</Text>
            <TextInput
              className="w-full"
              value={selectedValue.empId}
              onChange={e => handleValueChange('empId', e.target.value)}
              placeholder="사번을 입력해주세요"
            />
          </Flex>
          <Flex justifyContent="start" className="border-b pb-5">
            <Text className="w-[150px]">사용 여부*</Text>
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.isUsed}
                onChange={e => handleValueChange('isUsed', e)}
              >
                <Radiobox value="true" label={'사용'} />
                <Radiobox value="false" label={'미사용'} />
              </RadioboxGroup>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>관리자 기능 설정</Title>
        </div>
        <Flex flexDirection="col" className="p-5 gap-5">
          <Flex justifyContent="start" className="border-b pb-5">
            <Text className="w-[150px]">관리자 기능</Text>
            <CheckboxGroup
              value={selectedValue.authorities}
              onChange={e => handleValueChange('authorities', e)}
              className="flex flex-wrap gap-5"
            >
              <Checkbox value="all" label={'전체'} />
              <Checkbox value="SYSTEM" label={'시스템 관리'} />
              <Checkbox value="CONTENT" label={'콘텐츠 관리'} />
              <Checkbox value="ORDER" label={'주문 관리'} />
              <Checkbox value="FAMILY" label={'매장 관리'} />
              <Checkbox value="MENU" label={'메뉴 관리'} />
              <Checkbox value="COUPON" label={'쿠폰 관리'} />
              <Checkbox value="CUSTOMER" label={'고객 관리'} />
            </CheckboxGroup>
          </Flex>
        </Flex>
        <Flex className="p-5 pt-0 gap-5">
          <Text className="w-[140px] self-start">IP 주소</Text>
          <Flex flexDirection="col" className="gap-5" alignItems="start">
            {selectedValue.allowIps.map((data, index) => {
              return (
                <Flex justifyContent="start" className="gap-5" key={index}>
                  <TextInput
                    value={selectedValue.allowIps[index].allowIp}
                    onChange={e =>
                      setSelectedValue(prevSelectedValue => {
                        return {
                          ...prevSelectedValue,
                          allowIps: prevSelectedValue.allowIps.map((data, idx) => {
                            if (idx === index) {
                              return {
                                ...data,
                                allowIp: e.target.value,
                              };
                            }
                            return data;
                          }),
                        };
                      })
                    }
                    className="w-[200px]"
                    placeholder="IP 주소를 입력해주세요"
                  />
                  <TextInput
                    className="w-[200px]"
                    value={selectedValue.allowIps[index].allowIpDesc}
                    onChange={e =>
                      setSelectedValue(prevSelectedValue => {
                        return {
                          ...prevSelectedValue,
                          allowIps: prevSelectedValue.allowIps.map((data, idx) => {
                            if (idx === index) {
                              return {
                                ...data,
                                allowIpDesc: e.target.value,
                              };
                            }
                            return data;
                          }),
                        };
                      })
                    }
                    placeholder="IP 주소 설명을 입력해주세요"
                  />
                  <DateRangePicker
                    placeholder="사용 가능 시작일 ~ 종료일"
                    enableSelect={false}
                    className="w-[280px]"
                    locale={ko}
                    value={selectedValue.allowIps[index].date}
                    onValueChange={e =>
                      setSelectedValue(prevSelectedValue => {
                        return {
                          ...prevSelectedValue,
                          allowIps: prevSelectedValue.allowIps.map((data, idx) => {
                            if (idx === index) {
                              return {
                                ...data,
                                date: e,
                              };
                            }
                            return data;
                          }),
                        };
                      })
                    }
                  />

                  <CheckboxGroup
                    className={typeMode ? 'hidden' : ''}
                    value={selectedValue.allowIps[index].isUsed}
                    onChange={() =>
                      setSelectedValue(prevSelectedValue => {
                        return {
                          ...prevSelectedValue,
                          allowIps: prevSelectedValue.allowIps.map((data, idx) => {
                            if (idx === index) {
                              return {
                                ...data,
                                isUsed: data.isUsed[0] === 'true' ? ['false'] : ['true'],
                              };
                            }
                            return data;
                          }),
                        };
                      })
                    }
                  >
                    <Checkbox value="true" label={'IP 사용 여부'} />
                  </CheckboxGroup>
                  <CustomButton
                    type="tertiary"
                    onClick={() => {
                      setSelectedValue(prevSelectedValue => {
                        return {
                          ...prevSelectedValue,
                          allowIps: prevSelectedValue.allowIps.filter((data, idx) => idx !== index),
                        };
                      });
                    }}
                  >
                    삭제
                  </CustomButton>
                </Flex>
              );
            })}
            <CustomButton
              type="secondary"
              onClick={() =>
                setSelectedValue(prevSelectedValue => {
                  return {
                    ...prevSelectedValue,
                    allowIps: [...prevSelectedValue.allowIps, initalAllowIp],
                  };
                })
              }
            >
              IP 주소 추가
            </CustomButton>
          </Flex>
        </Flex>
      </Card>
      <Flex justifyContent="end" className="gap-5 mt-5">
        <CustomButton type="tertiary" className="w-[150px]" onClick={() => router.back()}>
          취소
        </CustomButton>
        <CustomButton
          type="secondary"
          className="w-[150px]"
          onClick={() => (typeMode ? registerAdmin() : modifyAdmin())}
        >
          {typeMode ? '등록' : '수정'}
        </CustomButton>
      </Flex>
    </>
  );
}
