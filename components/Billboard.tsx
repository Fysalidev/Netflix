import react from "react";
import useBillboard from "@/hooks/useBillboard";

const Billboard = () => {
  const { data } = useBillboard();
  console.log(data);
  return <div className="relative h-[56.25vw]">
    <video poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
  </div>;
};

export default Billboard;
