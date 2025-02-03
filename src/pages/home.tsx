import { withLayout } from "../HOC/withLayout";

const Home = () => {
  return (
    <div>
      Home page
    </div>
  );
};

const HomePage = withLayout(Home);

export default HomePage;
