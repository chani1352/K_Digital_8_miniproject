//import "../css/vaccineCardCss.css";
import CardInfoSmall  from "./CardInfoSmall";

export default function VaccinesCard({vaccine}){
  console.log("vaccine",vaccine);
  return (
    <div className="card flex m-5 ">
      <div className="w-4/5 ">
        <div className="h-3/4 px-6 flex flex-col justify-center items-start text-sm  ">
            <div className="py-1 flex w-full">
              <div className="w-5/6">{vaccine["disease"]}</div>
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