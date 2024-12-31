// import VacSchedule from "./child/VacSchedule"
import HospitalModal from "./hospital/HospitalModal";
import TailButton from "./UI/TailButton";
import { useState } from "react";
export default function Test() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-[800px] h-full flex flex-col justify-start items-center py-12">
      <TailButton caption={"팝업 열기"} color="blue" handleClick={openModal} />
      <HospitalModal open={modalOpen} close={closeModal} />
    </div>

  )
}
