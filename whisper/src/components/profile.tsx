import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  profile_image: string;
  // Aggiungi qui altri campi dell'utente se necessario
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      console.error("Missing JWT token");
      return;
    }

    if (userId) {
      fetch(`http://localhost:3000/api/getUser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUser(data);
          } else {
            console.error("Invalid user data received");
          }
        });
    } else {
      console.error("UserId is null");
    }
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.profile_image} alt="" />
          {/* Aggiungi qui altri campi dell'utente se necessario */}
        </div>
      )}
    </div>
  );
}

export default Profile;
