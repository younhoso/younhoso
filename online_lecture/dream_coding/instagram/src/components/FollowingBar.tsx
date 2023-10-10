'use client';
import useSWR from "swr";

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR('/api/hello');
  console.log(data)

  return (
    <p>FollowingBar</p>
  );
} 