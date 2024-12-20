import "../css/hospitalCardCss.css";
import CardInfoSmall from "./CardInfoSmall";

export default function VaccinesCard({ vaccine }) {
  //console.log("vaccine",vaccine);
  return (
    <div className="vacCard flex m-5">
      <div className="">
        <div className="h-3/4 px-6 flex flex-col justify-center items-start">
          <div className="py-1 flex w-full">
            <div className="w-5/6 text-2xl font-bold">{vaccine["disease"]}</div>
          </div>
          <div className="py-1 flex w-full">
            <div className="w-5/6">{vaccine["vaccineName"]}</div>
          </div>
          <div className="py-1 flex w-full">
            <div className="w-5/6">{vaccine["phase"]} {vaccine["method"]}</div>
          </div>
          <div className="h-1/4 pl-3 flex items-end">
            <CardInfoSmall text={"무료접종"} />
            <CardInfoSmall text={vaccine["optional"]} />
          </div>
        </div>
      </div>
    </div>
  )
}