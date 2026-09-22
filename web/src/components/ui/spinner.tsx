import { HashLoader } from "react-spinners";

export default function Spinner({ size = 40, color = "#4f46e5" }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <HashLoader size={size} color={color} />;
    </div>
  )
}
