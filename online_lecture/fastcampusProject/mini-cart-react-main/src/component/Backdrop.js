const Backdrop = ({ onClickHandler }) => {
    return (
        <div
            id="backdrop"
            onClick={onClickHandler}
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
    );
};

export default Backdrop;
