import React from "react";
import { useParams } from 'react-router-dom';
import PostContainer from "../containers/PostContainer";

function PostPage() {
	const { id } = useParams();
	const postId = parseInt(id, 10);

	return (
		<PostContainer postId={postId} />
	)
};

export default PostPage;