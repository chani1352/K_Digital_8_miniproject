import "../css/hospitalCardCss.css";
import CardInfoSmall from "./CardInfoSmall";

export default function VaccinesCard({ vaccine }) {
  //console.log("vaccine",vaccine);
  return (
    <div className="vacCard m-5">
      <div className="relative h-full">
        <div className="p-6 flex flex-col justify-center items-start ">
          <div className="text-xl font-bold font-NanumSquareR">{vaccine["disease"]}</div>
          <div className="mt-1 text-gray-700 text-sm">{vaccine["vaccineName"]} {vaccine["phase"]}</div>
          <div className="mt-6 flex items-center text-sm "> 
            <div className="size-5 bg-gray-100 mr-1 rounded-full 
                            flex justify-center items-center">
              <img src="/img/flushot.png" className="size-4"></img>
            </div>
            <span className="mr-4">방법</span>
            <span className="text-gray-700">{vaccine["method"]}</span>
          </div>
          <div className="flex absolute bottom-6">
            <CardInfoSmall text={"무료접종"} />
            <CardInfoSmall text={vaccine["optional"]} />
          </div>
        </div>
      </div>
    </div>
  )
}