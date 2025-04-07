-- purchases 테이블 생성
create table purchases (
  id uuid default uuid_generate_v4() primary key,
  email text UNIQUE, 
  user_id text UNIQUE,
  status text not null,
  payment_id text not null,
  amount integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);


-- purchases 테이블에 대한 Row Level Security (RLS) 정책
alter table purchases enable row level security;

-- (1) 사용자가 자신의 구매 내역만 조회할 수 있도록 설정
create policy "Enable users to view their own purchases"
on purchases
for select
using (auth.uid() = user_id);

-- (2) 사용자가 자신의 구매를 삽입할 수 있도록 설정
create policy "Enable users to insert their own purchases"
on purchases
for insert
with check (auth.uid() = user_id);

-- (3) 사용자가 자신의 구매만 수정할 수 있도록 설정 (필요한 경우)
create policy "Enable users to update their own purchases"
on purchases
for update
using (auth.uid() = user_id);

-- (4) 사용자가 자신의 구매를 삭제할 수 있도록 설정 (필요한 경우)
create policy "Enable users to delete their own purchases"
on purchases
for delete
using (auth.uid() = user_id);

-- 기존 purchases 테이블 삭제
DROP TABLE IF EXISTS purchases CASCADE;