import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  console.log("Users Calling");
  if (!response.ok) throw new Error("네트워크 오류");
  return response.json();
};

const fetchNestData = async () => {
  const response = await fetch("http://localhost:3000");
  console.log("Nest Calling");
  if (!response.ok) throw new Error("네트워크 오류");
  return response.json();
};

function UserList() {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10000,
    gcTime: 20000,
  });

  const {
    data: nestData,
    isLoading: nestLoading,
    error: nestError,
  } = useQuery({
    queryKey: ["nestData"],
    queryFn: fetchNestData,
    staleTime: 10000,
    gcTime: 20000,
  });

  if (usersLoading || nestLoading) return <p>로딩 중...</p>;
  if (nestError) return <p>ERROR: {nestError.message}</p>;

  return (
    <div>
      <h1>사용자 목록 (React Query v5 캐싱)</h1>
      {Object.keys(nestData).map((key) => (
        <h2 key={key}>{nestData[key]}</h2>
      ))}
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
