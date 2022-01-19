import axios from 'axios';
import Chat from '../components/chat/Chat';
import UserList from '../components/chat/UserList';

interface MainPageProps {
  users: User[]
}

interface User {
  login: string,
  post: string,
  banned: boolean
}

function Main({ users }: MainPageProps): JSX.Element {
  return (
    <div className="main-container">
      <UserList users={users} />
      <Chat />
    </div>
  );
}

export async function getServerSideProps() {
  let users = await axios.get('http://localhost:5000/user/get-all')
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      alert("ERROR! " + error);
    });

  return {
    props: { users }
  }
}

export default Main;