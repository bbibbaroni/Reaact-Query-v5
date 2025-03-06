import "./Profile.css";
import { useQuery } from "@tanstack/react-query";

const fetchBoxes = async () => {
  const response = await fetch("http://localhost:3000/profile/boxes");
  console.log("Users Calling");
  if (!response.ok) throw new Error("네트워크 오류");
  return response.json();
};

const Profile = () => {
  const {
    data: boxesData,
    isLoading: boxesLoading,
    error: boxesError,
  } = useQuery({
    queryKey: ["boxes"],
    queryFn: fetchBoxes,
    staleTime: 10000,
    gcTime: 20000,
  });

  if (boxesLoading) return <p>로딩 중...</p>;
  if (boxesError) return <p>ERROR: {boxesError.message}</p>;

  return (
    <>
      <div className="profile">
        <div className="main">
          <div className="person">
            <svg
              width="150"
              height="150"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 4C11.93 4 13.5 5.57 13.5 7.5C13.5 9.43 11.93 11 10 11C8.07 11 6.5 9.43 6.5 7.5C6.5 5.57 8.07 4 10 4ZM10 18C7.97 18 5.57 17.18 3.86 15.12C5.61182 13.7462 7.77376 12.9996 10 12.9996C12.2262 12.9996 14.3882 13.7462 16.14 15.12C14.43 17.18 12.03 18 10 18Z"
                fill="#ffffff"
              />
            </svg>
            <h3>최정혁</h3>
            <div className="fix">프로필수정</div>
          </div>
          <div className="boxes">
            {boxesData && (
              <>
                <div className="box">
                  <h2>{boxesData.box1}</h2>
                </div>
                <div className="box">
                  <h2>{boxesData.box2}</h2>
                </div>
                <div className="box">
                  <h2>{boxesData.box3}</h2>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
