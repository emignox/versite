import { useState } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage(e.target.files?.[0] || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    formData.append("description", description);
    formData.append("occupation", occupation);

    try {
      const response = await fetch("http://localhost:3000/api/create-user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="flex flex-col text-center items-center space-y-3 mt-10"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="lastname">Last Name</label>
      <input
        id="lastname"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="file">Profile Image</label>
      <input id="file" type="file" onChange={handleFileChange} />

      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="occupation">Occupation</label>
      <input
        id="occupation"
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Registration;
