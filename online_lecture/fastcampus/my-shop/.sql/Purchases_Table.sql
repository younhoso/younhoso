-- purchases 테이블 생성
create table purchases (
  id uuid default uuid_generate_v4() primary key,
  email text UNIQUE, 
  user_id uuid UNIQUE,
  user_name TEXT, -- ✅ 사용자 이름 필드 추가
  status text not null,
  payment_id text not null,
  amount integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- purchases 테이블에 RLS(Row Level security) 정책 활성화
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- INSERT가 일어나기 전에 자동으로 user_id 컬럼에 현재 로그인한 유저의 ID를 넣어줘요.
create or replace function set_user_id_on_insert()
returns trigger as $$
begin
  new.user_id := auth.uid();
  return new;
end;
$$ language plpgsql security definer;

-- purchases 테이블에 트리거 연결 (이게 없으면 작동 안 함!)
create trigger set_user_id_before_insert
before insert on purchases
for each row
execute function set_user_id_on_insert();

-- (1) 본인 구매 내역 조회
CREATE POLICY "사용자는 자신의 구매 내역만 조회 가능"
  ON purchases
  FOR SELECT
  TO public -- public, 또는 authenticated, 필요에 따라 변경
  USING (auth.uid() = user_id);

-- (2) 본인 구매 내역 삽입 가능
CREATE POLICY "사용자는 자신의 구매만 삽입 가능"
  ON purchases
  FOR INSERT
  TO public -- public, 또는 authenticated, 필요에 따라 변경
  WITH CHECK (auth.uid() = user_id);

-- (3) 본인 구매 내역 수정 가능 (선택 사항)
CREATE POLICY "사용자는 자신의 구매만 수정 가능"
  ON purchases
  FOR UPDATE
  TO public -- public, 또는 authenticated, 필요에 따라 변경
  USING (auth.uid() = user_id);

-- (4) 본인 구매 내역 삭제 가능 (선택 사항)
CREATE POLICY "사용자는 자신의 구매만 삭제 가능"
  ON purchases
  FOR DELETE
  TO public -- public, 또는 authenticated, 필요에 따라 변경
  USING (auth.uid() = user_id);


-- 기존 purchases 테이블 삭제
DROP TABLE IF EXISTS purchases CASCADE;

ALTER TABLE purchases
ADD COLUMN user_name TEXT;

ALTER TABLE purchases
ALTER COLUMN user_id TYPE UUID USING user_id::uuid;