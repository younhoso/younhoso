const MAX_COUNT = 10;
const MIN_COUNT = 1;

const CartList = ({ cartItems, setCartItems }) => {
    const increaseCartItem = (idx) => {
        if (cartItems[idx].count < MAX_COUNT) {
            const newCartItems = [...cartItems];
            newCartItems[idx].count += 1;
            setCartItems(newCartItems);
        } else {
            alert('장바구니에 담을 수 있는 최대 수량은 10개입니다.');
        }
    };

    const decreaseCartItem = (idx) => {
        if (cartItems[idx].count > MIN_COUNT) {
            const newCartItems = [...cartItems];
            newCartItems[idx].count -= 1;
            setCartItems(newCartItems);
        } else {
            alert('장바구니에 담을 수 있는 최소 수량은 1개입니다.');
        }
    };

    const removeCartItem = (idx) => {
        // 삭제할 아이템을 찾아서 state 업데이트
        const newCartItems = [...cartItems];
        newCartItems.splice(idx, 1);
        setCartItems(newCartItems);
    };

    return (
        <ul className="divide-y divide-gray-200">
            {cartItems.map(({ id, name, imgSrc, price, count }, idx) => (
                <li className="flex py-6" id={id} key={id}>
                    <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                        <img
                            src={imgSrc}
                            className="h-full w-full object-cover object-center"
                            alt={name}
                        />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{name}</h3>
                                <p className="ml-4">
                                    {(price * count).toLocaleString()} 원
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between">
                            <div className="flex text-gray-500">
                                <button
                                    className="decrease-btn"
                                    onClick={() => decreaseCartItem(idx)}
                                >
                                    -
                                </button>
                                <div className="mx-2 font-bold">{count}개</div>
                                <button
                                    className="increase-btn"
                                    onClick={() => increaseCartItem(idx)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                type="button"
                                className="font-medium text-sky-400 hover:text-sky-500"
                            >
                                <p
                                    className="remove-btn"
                                    onClick={() => removeCartItem(idx)}
                                >
                                    삭제하기
                                </p>
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CartList;
