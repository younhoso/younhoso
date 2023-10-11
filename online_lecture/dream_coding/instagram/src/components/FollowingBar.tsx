'use client';
import useSWR from "swr";

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR('/api/me');
  console.log(data)

  return (
    <p>FollowingBar</p>
  );
} 