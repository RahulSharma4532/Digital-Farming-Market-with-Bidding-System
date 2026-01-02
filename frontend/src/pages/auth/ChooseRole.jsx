import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f6f9f6]">
      <div className="grid grid-cols-1 gap-6 w-[500px]">

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer border rounded-xl p-6 hover:shadow-lg bg-white"
        >
          <h3 className="text-xl font-bold">Consumer</h3>
          <p>Browse products and place bids</p>
        </div>

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer border rounded-xl p-6 bg-white"
        >
          <h3 className="text-xl font-bold">Farmer</h3>
          <p>Manage inventory & auctions</p>
        </div>

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer border rounded-xl p-6 bg-white"
        >
          <h3 className="text-xl font-bold">Administrator</h3>
          <p>Verify farmers & manage platform</p>
        </div>

      </div>
    </div>
  );
}
