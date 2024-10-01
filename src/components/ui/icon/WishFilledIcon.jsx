/* eslint-disable react/prop-types */
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

export default function WishIcon({ isWished }) {
    const wishedIoMdHeart = (
        <IoMdHeart className="text-[24px] text-[#FF5F00] absolute top-[16px] right-[16px]" />
    );

    const notWishedIoMdHeart = (
        <div className="text-[24px] absolute top-[16px] right-[16px]">
            <IoMdHeartEmpty className="text-[#FFFFFF] absolute" />
            <IoMdHeart className="text-[#D5D5D550]" />
        </div>
    );

    return isWished ? wishedIoMdHeart : notWishedIoMdHeart;
}
