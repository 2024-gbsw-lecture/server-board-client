interface OrnamentProps {
  id: number,
  onClick: (id: number) => void
}

const Ornament = ({ id, onClick }: OrnamentProps) => {
	return (
		<div>
      <img
        className="w-12 cursor-pointer"
        alt="크리스마스 트리볼"
        src="/red_ornament.png"
        draggable="false"
        onClick={() => onClick(id)}/>
		</div>
	)
}

export default Ornament;