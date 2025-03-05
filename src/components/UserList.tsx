import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  console.log("API calling");
  if (!response.ok) throw new Error("네트워크 오류");
  return response.json();
};

function UserList() {
  const {
    data: users,
    isLoading, //loading state checking
    error, //error state checking
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10000, // 10초 동안은 새로운 요청 없이 캐시 사용, 아직은 싱싱한 데이터라고 판단중
    gcTime: 14000, //garbage colect time 오래된 데이터, 삭제 필요
  });

  if (isLoading) return <p>로딩 중...</p>; //loading state component return
  if (error) return <p>ERROR: {error.message}</p>; //ERROR state 404 component return

  return (
    <div>
      <h1>사용자 목록 (React Query v5 캐싱)</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;
