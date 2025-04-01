import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
      window.location.href = "/login";
  }, []);

  return <div></div>;
};

export default Loading;
