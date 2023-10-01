import React from 'react';
import {IComment} from '../../store/api/types';
import Comment from './Comment';
import './CommentList.scss';

interface ICommentListProps {
    comments: IComment[];
}

export default function CommentList({comments}: ICommentListProps) {
    return (
        <div className="CommentList">
            <div className="CommentList__container">
                {comments.map((comment) => (
                    <div
                        className="CommentList__comment"
                        key={comment.id}
                    >
                        <Comment comment={comment} />
                    </div>
                ))}
            </div>
        </div>
    );
}
