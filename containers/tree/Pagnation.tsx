interface PagnationProps {
	page: number,
	totalPage: number,
	onPreviousButtonClicked: () => void,
	onNextButtonClicked: () => void
}

const Pagnation = ({ page, totalPage, onPreviousButtonClicked, onNextButtonClicked }: PagnationProps) => {
	return (
		<div className="rounded-full bg-stone-900 px-4 py-2 text-sm flex items-center justify-center gap-2">
			<span className="cursor-pointer" onClick={onPreviousButtonClicked}>≪</span>
			{page} / {totalPage}
			<span className="cursor-pointer" onClick={onNextButtonClicked}>≫</span>
		</div>
	)
}

export default Pagnation;