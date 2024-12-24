import "../css/hospitalCardCss.css";
import CardInfoSmall from "./CardInfoSmall";

export default function VaccinesCard({ vaccine }) {
  //console.log("vaccine",vaccine);
  return (
    <div className="vacCard m-5">
      <div className="">
        <div className="px-6 flex flex-col justify-center items-start">
          <div className="pt-5 text-xl font-bold">{vaccine["disease"]}</div>
          <div className="pb-4 text-gray-700 text-sm">{vaccine["vaccineName"]} {vaccine["phase"]}</div>
          <div className=""> {vaccine["method"]}</div>
          <div className="pt-3 flex">
            <CardInfoSmall text={"무료접종"} />
            <CardInfoSmall text={vaccine["optional"]} />
          </div>
        </div>
      </div>
    </div>
  )
}