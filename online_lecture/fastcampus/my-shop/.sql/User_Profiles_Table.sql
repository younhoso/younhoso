-- profiles 테이블 생성
CREATE TABLE profiles (
    id UUID references auth.users on delete cascade primary key, -- UUID 타입 + 기본값 자동 생성
    email TEXT UNIQUE,  -- 이메일은 중복 방지
    name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user';
    created_at timestamp with time zone default timezone('utc'::TEXT, now()),
    updated_at timestamp with time zone default timezone('utc'::TEXT, now())
);

-- 사용자 자동 생성을 위한 함수
create or replace function public.handler_new_user()
returns trigger as $$
begin
  -- 새로운 사용자의 프로필을 users 테이블에 삽입
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id, -- auth.users에서 새로 생성된 id
    new.email,
    coalesce(new.raw_user_meta_data->>'name', NULL),  -- 기본값 설정
    coalesce(new.raw_user_meta_data->>'avatar_url', NULL)  -- 기본값 설정
    'user'  -- ✅ 안전한 기본값
  );
  return new;
end;
$$ language plpgsql security definer;

-- 기존 트리거가 이미 존재하면 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 트리거를 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE procedure public.handler_new_user();

-- RLS(Row Level security) 정책 설정
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS 작업에 SELECT 권한 (필요에 따라 설정)
CREATE POLICY "사용자는 자신의 프로필만 조회 가능"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- RLS 시스템 트리거가 삽입할 수 있도록 예외 정책 추가 (필요에 따라 설정)
CREATE POLICY "트리거는 모든 프로필 삽입 허용"
  ON profiles
  FOR INSERT
  TO public -- public, 또는 authenticated, 필요에 따라
  WITH CHECK (true);

-- RLS 필요 시 INSERT 권한 (필요에 따라 설정)
CREATE POLICY "사용자는 자신의 프로필만 삽입 가능"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS 필요 시 UPDATE 권한 (필요에 따라 설정)
CREATE POLICY "사용자는 자신의 프로필만 수정 가능"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Supabase에서 제공하는 auth.users 테이블에서 사용자 정보를 조회
SELECT id, email, raw_user_meta_data FROM auth.users ORDER BY created_at DESC;

SELECT * FROM auth.users ORDER BY created_at DESC;
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

SELECT * FROM auth.users ORDER BY created_at DESC LIMIT 5;


-- RLS가 비활성화되었는지 확인
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 기존 users 테이블 삭제
DROP TABLE IF EXISTS users CASCADE;