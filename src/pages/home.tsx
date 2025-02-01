import { useQuery } from "@tanstack/react-query";
import { withLayout } from "../HOC/withLayout";
// import { useEffect, useState } from "react";

const Home = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {

  //   fetch("http://localhost:8001/tasks")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []); // Or [] if effect doesn't need props or state


   const { isPending, error, data } = useQuery({
     queryKey: ["repoData"],
     queryFn: () =>
       fetch("http://localhost:8001/tasks").then((res) => res.json()),
   });

   if (isPending) return "Loading...";

   if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data?.map(
        ({ createdAt, description, done, id, title, updatedAt }, index) => (
          <div key={index}>
            <p>{id}</p>
            <p>{createdAt}</p>
            <p>{description}</p>
            <p>{done}</p>
            <p>{title}</p>
            <p>{updatedAt}</p>
          </div>
        )
      )}
    </div>
  );
};

const HomePage = withLayout(Home);

export default HomePage;
