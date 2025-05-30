import { useParams, useNavigate } from "react-router-dom";
import DefaultProfile from "./DefaultProfile";
import Spinach from "./Spinach";
import Popeye from "./Popeye";
import { Link } from 'react-router-dom';

const Profile = () => {
  const { name } = useParams();
  const navigate = useNavigate()

  const changeName = (newName) => () => {
    navigate(`/profile/${newName}`)
  }

  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>Select your profile</p>
      <ul>
        <li onClick={changeName('popeye')}>Popeye</li>
        <li onClick={changeName('spinach')}>Spinach</li>
      </ul>
      <hr />
      <h2>The profile visited is here:</h2>
      {name === "popeye" ? (
        <Popeye />
      ) : name === "spinach" ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}
    </div>
  );
};

export default Profile;
