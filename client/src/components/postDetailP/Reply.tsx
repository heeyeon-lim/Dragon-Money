import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styled from 'styled-components';
import DislikeIcon from '../../assets/common/DislikeIcon';
import LikeIcon from '../../assets/common/LikeIcon';
import {
  isEdit,
  setIsEdit,
  setReplyId,
  setIsOpenIntro,
} from '../../slices/replySlice';
import {
  PostStateType,
  ReplyStateType,
  CommentStateType,
  ReplyProps,
  ReplyType,
} from '../../types/PostDetail';
import { repliesApi } from '../../api/replyApi';
import {
  setIsOpenDelete,
  setIsOpenReport,
  setReportType,
  setDeleteType,
} from '../../slices/postSlice';
import { timeSince } from '../mainP/Timecalculator';
import { setCommentId } from '../../slices/commentSlice';
import _ from 'lodash';

const Reply: React.FC<ReplyProps> = ({ replyInfo, idx }: ReplyProps) => {
  const replyEditInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const state = useAppSelector(
    (
      state: PostStateType | ReplyStateType,
    ): PostStateType | ReplyStateType | CommentStateType => {
      return state;
    },
  );
  const loginUserName = window.localStorage.getItem('name');
  const commentId = 'comment' in state && state.comment?.commentId;
  const replyId = 'reply' in state && state.reply?.replyId;
  const page = ('reply' in state && state.reply?.page) || 1;

  // 답글
  const replyQuery = repliesApi.useGetReplyQuery({ commentId, page });
  const replySucccess = replyQuery.isSuccess;
  const replyMutation = repliesApi.useUpdataReplyMutation();
  const [updateMutation] = replyMutation;
  // 게시글, 댓글 작성자 소개페이지 오픈 여부
  const isOpenCommentIntro = 'comment' in state && state?.comment.isOpeneIntro;
  const isOpenPostIntro = 'post' in state && state?.post.isOpeneIntro;

  // 답글 좋아요 추가, 삭제
  const addThumbUpMutation = repliesApi.useAddThumbUpMutation();
  const [addThumbUp] = addThumbUpMutation;
  const removeThumbUpMutation = repliesApi.useRemoveThumbUpMutation();
  const [removeThumbUp] = removeThumbUpMutation;
  // 답글 싫어요  추가, 삭제
  const addThumbDownMutation = repliesApi.useAddThumbDownMutation();
  const [addThumbDown] = addThumbDownMutation;
  const removeThumbDownMutation = repliesApi.useRemoveThumbDownMutation();
  const [removeThumbDown] = removeThumbDownMutation;

  // 답글 좋아요 클릭 함수
  const ReplyLiikeHandler = (reply: ReplyType): void => {
    const replyId = reply.replyId;
    if (reply?.isThumbup && !reply?.isThumbdown) {
      console.log('좋아요 삭제');
      removeThumbUp({ replyId });
      return;
    }
    // 싫어요만 있는 경우
    if (reply?.isThumbup && reply?.isThumbdown) {
      console.log('싫어요 삭제 후 좋아요 추가');
      removeThumbDown({ replyId });
      setTimeout(() => {
        addThumbUp({ replyId });
      }, 500);
      return;
    }
    // 둘 다 없는 경우
    if (!reply?.isThumbdown && !reply?.isThumbdown) {
      console.log('좋아요 추가');
      addThumbUp({ replyId });
      return;
    }
  };

  // 답글 싫어요 클릭 함수
  const ReplyDislikeHandler = (reply: ReplyType): void => {
    const replyId = reply.replyId;
    // 좋아요만 있는 경우
    if (reply?.isThumbup && !reply?.isThumbdown) {
      // 좋아요 제거, 싫어요 추가
      console.log('좋아요 삭제 후 싫어요 추가');
      removeThumbUp({ replyId });
      setTimeout(() => {
        addThumbDown({ replyId });
      }, 500);
      return;
    }
    // 싫어요만 있는 경우
    if (!reply?.isThumbup && reply?.isThumbdown) {
      // 싫어요 제거
      console.log('싫어요 삭제');
      removeThumbDown({ replyId });
      return;
    }
    // 둘 다 없는 경우
    if (!reply?.isThumbup && !reply?.isThumbdown) {
      // 싫어요 추가
      console.log('싫어요 추가');
      addThumbDown({ replyId });
      return;
    }
  };
  // 답글 Edit 여부 확인을 위한 배열 생성
  if (
    replyQuery.isSuccess &&
    (state as ReplyStateType).reply.isEdit === undefined
  ) {
    const edit = Array.from(
      { length: replyQuery.data?.replies.length },
      (el) => (el = false),
    );

    dispatch(isEdit(edit as Array<boolean>));
  }

  // 삭제 확인 모달창
  const confirmDeleteHandler = (): void => {
    dispatch(setIsOpenDelete((state as PostStateType).post.isOpenDelete));
  };

  const deleteTypeChecker = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement) {
      dispatch(setDeleteType(event.target.id));
    }
  };

  //TODO
  // 소개 페이지 오픈
  const IntroHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (
      !isOpenPostIntro &&
      !isOpenCommentIntro &&
      'reply' in state &&
      event.target instanceof HTMLElement
    ) {
      dispatch(setIsOpenIntro(state.reply.isOpeneIntro));
      dispatch(setReplyId(Number(event.target.dataset.replyid)));
      console.log('userName', event.target.id);
    }
  };

  // 신고 카테고리 확인
  const reportTypeChecker = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target instanceof HTMLElement) {
      dispatch(setReplyId(Number(event.target.dataset.replyid)));
      dispatch(setReportType(event.target.dataset.category!));
    }
  };
  // 시간 계산
  const time = timeSince(replyInfo.createdAt);
  // 답글 수정 여부
  const replyIsEdit =
    replyInfo.createdAt !== replyInfo.modifiedAt ? true : false;
  return (
    <ReplyContainer>
      <ReplyInfo key={replyInfo.replyId}>
        <ul className="reply-info">
          <li className="image" onClick={IntroHandler}>
            <img
              src={replyInfo && replyInfo.memberImage}
              id={replyInfo.memberName}
              data-img={replyInfo.memberImage}
              data-replyId={replyInfo.replyId}
            ></img>
          </li>
          {'reply' in state &&
          state.reply.isOpeneIntro &&
          replyInfo?.replyId === state.reply?.replyId ? (
            <IntorductionContainer onClick={IntroHandler}>
              <IntroInfo>
                <ul className="intro-content-info">
                  <li className="image">
                    <img src={replyInfo.memberImage}></img>
                  </li>
                  <li className="intro-nickname">{replyInfo.memberName}</li>
                </ul>
              </IntroInfo>
              <label className="introduction">
                {/* TODO 수정 필요*/}
                {replyInfo.content}
              </label>
              <div className="intro-moreInfo">더보기 》</div>
            </IntorductionContainer>
          ) : null}

          <li className="nickname">{replyInfo && replyInfo.memberName}</li>
          <li className="reply-created-time">{time} 전</li>
          {'reply' in state &&
          replyInfo.replyId === replyId &&
          ((replySucccess && state.reply.isEdit !== undefined) || null) &&
          state.reply.isEdit[idx] ? (
            <li
              className="reply-update"
              id="edit"
              onClick={(): void => {
                if (!replyEditInput.current?.value) {
                  dispatch(setIsEdit(idx));
                  return;
                }
                dispatch(setIsEdit(idx));
                updateMutation({
                  replyId: replyInfo.replyId,
                  content: replyEditInput.current?.value,
                });
              }}
            >
              변경
            </li>
          ) : (
            <li
              // TODO
              className="reply-update"
              onClick={(): void => {
                dispatch(setCommentId(replyInfo.commentId));
                dispatch(setReplyId(replyInfo.replyId));
                dispatch(setIsEdit(idx));
              }}
            >
              수정
            </li>
          )}
          <li
            className="reply-delete"
            id="답글"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              dispatch(setReplyId(replyInfo.replyId));
              deleteTypeChecker(event);
              confirmDeleteHandler();
            }}
          >
            삭제
          </li>
          <li
            className="reply-report"
            data-category="reply"
            data-replyId={String(replyInfo.replyId)}
            onClick={(event): void => {
              dispatch(
                setIsOpenReport('post' in state && state.post.isOpenReport),
              );
              reportTypeChecker(event);
            }}
          >
            신고
          </li>
          <button
            onClick={_.debounce(() => {
              ReplyLiikeHandler(replyInfo);
            }, 500)}
          >
            <LikeIcon checked={replyInfo?.isThumbup} />
          </button>
          <li className="reply-likes">{replyInfo?.thumbupCount}</li>
          <button
            onClick={_.debounce(() => {
              ReplyDislikeHandler(replyInfo);
            }, 500)}
          >
            <DislikeIcon checked={replyInfo?.isThumbdown} />
          </button>
          <li className="reply-dislikes">{replyInfo?.thumbDownCount}</li>
        </ul>
      </ReplyInfo>
      <ReplyContent>
        {'reply' in state &&
        replyInfo.replyId === replyId &&
        state.reply?.isEdit[idx] ? (
          // 댓글 수정 시 생기는 INPUT
          <input
            className="edit-reply"
            placeholder={replyInfo && replyInfo.content}
            ref={replyEditInput}
          ></input>
        ) : (
          <div className="content">
            {replyInfo && replyInfo.content} {replyIsEdit ? '(수정됨)' : null}
          </div>
        )}
      </ReplyContent>
    </ReplyContainer>
  );
};

export default Reply;

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 670px;
  padding-left: 50px;
  height: auto;
  margin-top: 25px;

  h1 {
    font-size: 24px;
    font-weight: 400;
  }
  .reply-info {
    width: 670px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 30px 0 30px 0;
    position: relative;
  }
  .content {
    display: flex;
    align-items: center;
    width: 660px;
    height: 50px;
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
    width: auto;
    color: black;
  }
  .nickname {
    width: 130px;
    font-size: 16px;
    margin: 2px 15px 0 5px;
  }
  .reply-created-time {
    width: 75px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
  }
  .reply-update {
    width: 40px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
    cursor: pointer;
  }
  .reply-delete {
    width: 40px;
    font-size: 16px;
    margin: 3px 15px 0 5px;
    cursor: pointer;
  }
  .reply-report {
    width: 40px;
    font-size: 16px;
    margin: 3px 110px 0 5px;
    color: #ca0000;
    cursor: pointer;
  }
  .reply-likes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
  .reply-dislikes {
    width: 30px;
    font-size: 16px;
    margin: 3px 15px 0 15px;
  }
`;
// TODO Intro
const IntorductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 240px;
  height: 140px;
  border: 1px solid #d4d4d4;
  z-index: 5;
  top: 45px;
  left: 45px;
  background-color: white;

  .introduction {
    font-size: 17x;
    color: gray;
    width: 175px;
    margin: 10px 0 0 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .intro-moreInfo {
    font-size: 17x;
    color: gray;
    width: 150px;
    margin: 5px 0 0 165px;
    cursor: pointer;
  }
`;
const IntroInfo = styled.div`
  z-index: 5;
  .intro-content-info {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 10px 0 0 10px;
  }
  .intro-nickname {
    width: 150px;
    height: 30px;
    font-size: 16px;
    margin: 8px 0 0 10px;
  }
`;

const ReplyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
`;

const ReplyContent = styled.div`
  padding-left: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 670px;
  height: 100%;
  .edit-reply {
    width: 660px;
    height: 50px;
    border-bottom: 1px solid #d4d4d4;
    padding: 3px 0 0 10px;
    ::placeholder {
      color: #0099ca;
    }
  }
`;
