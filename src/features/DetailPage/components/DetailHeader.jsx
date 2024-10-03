/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { TopButtonIcon } from "../../../components/ui/icon/index";

export default function DetailHeader({ title }) {
    const navigate = useNavigate(); // 이전 페이지 이동을 위함

    // 이전 페이지로 이동하는 함수
    const goBack = () => {
        navigate(-1); // -1은 이전 페이지로 이동
    };

    return (
        <div className="w-[100%] my-[16px] flex justify-center items-center">
            <div onClick={goBack} className="text-[30px] absolute left-0">
                <TopButtonIcon />
            </div>
            <span className="text-[20px] px-[35px] text-center font-bold">
                {title}
            </span>
        </div>
    );
}
