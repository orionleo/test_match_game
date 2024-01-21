import Image from "next/image";

interface Item {
	id: number;
	name: string;
	img: string;
	matched: boolean;
}

interface CardProps {
	item: Item,
	handleSelectedCards: (item: Item) => void,
	toggled: boolean,
	stopFlip: boolean
}
//is carried out in this file 
function Card({ item, handleSelectedCards, toggled, stopFlip }: CardProps) {
	return (
		<div >
			<div>
				<div>
				<img
					className={`max-h-[6rem] max-w-[6rem] min-h-[3rem] min-w-[3rem] absolute [transform:rotateY(90deg)] transition-all rounded-[50%] ease-in duration-[250ms] ${toggled && "[transform:rotateY(0deg)] transition-all rounded-[50%] ease-in duration-[250ms] delay-[250ms]"}`} src={item.img} alt="face" />
				</div>
				<div
					className={`h-[6rem] w-[6rem] bg-[#fddaaf] text-[rgb(61, 21, 21)] border-[1px] border-solid border-black rounded-[50%] transition-all ease-in duration-[250ms] delay-[250ms] ${toggled && "[transform:rotateY(90deg)] delay-0"} `}
					onClick={() => !stopFlip && handleSelectedCards(item)}
				>
					{" "}
				</div>
			</div>
		</div>
	);
}

export default Card; 
