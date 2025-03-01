import styled from 'styled-components';
import { ReactComponent as LikeIcon } from '../../asset/like.svg';
import { ReactComponent as DeleteIcon } from '../../asset/delete.svg';

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    color: var(--text);
    min-width: 300px;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    background-color: var(--primary);
    border: 3px solid var(--secondary);
    padding: 16px;
    box-shadow: 8px 8px 12px -1px rgb(0 0 0 / 0.3);
`;

const ModalImg = styled.img`
    width: 100%;
`;

const DetailRow = styled.div`
    display: flex;
    & > * {
        margin-right: 6px;
    }
`;

const ImageModal = ({ currentImageDetail, setCurrentImageDetail }) => {
    const { largeImageURL, tags, likes, views } = currentImageDetail;
    return (
        <Modal>
            <DeleteIcon
                width="24px"
                cursor="pointer"
                fill="#FFFFFF"
                onClick={() => setCurrentImageDetail(false)}
            />
            <ModalImg src={largeImageURL} />
            <p>{tags}</p>
            <DetailRow>
                <LikeIcon width="20px" height="20px" />
                {likes}명이 좋아합니다
            </DetailRow>
            <p>{views} 조회</p>
        </Modal>
    );
};

export default ImageModal;
