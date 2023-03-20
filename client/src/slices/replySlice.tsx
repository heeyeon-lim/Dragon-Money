import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const replySlice = createSlice({
  name: 'reply',
  initialState: {
    isReplyLike: false,
    isReplyDislike: false,
    replyValue: '',
    replyId: undefined,
    isEdit: undefined,
    isOpened: undefined,
    totalReplies: [],
  },
  reducers: {
    // 답글 좋아요
    setReplyLike: (state, action: PayloadAction<boolean>): void => {
      state.isReplyLike = !state.isReplyLike;
    },
    // 답글 싫어요
    setReplyDislike: (state, action: PayloadAction<boolean>): void => {
      state.isReplyDislike = !state.isReplyDislike;
    },
    // 답글 내용
    setReply: (state, action: PayloadAction<string>) => {
      (state.replyValue as unknown) = action.payload;
    },
    // 답글 ID
    setReplyId: (state, action: PayloadAction<number>): void => {
      (state.replyId as unknown) = action.payload;
    },
    // 답글 수정 여부
    isEdit: (state, action: PayloadAction<object>): void => {
      (state.isEdit as unknown) = action.payload;
    },
    // 답글 수정 상태 변경
    setIsEdit: (state, action: PayloadAction<number>): void => {
      (state.isEdit! as Array<boolean>)[action.payload] = !(
        state.isEdit! as Array<boolean>
      )[action.payload];
    },
    // edit 답글 추가
    addReplyEdit: (state, action: PayloadAction<boolean>): void => {
      (state.isEdit! as Array<boolean>).push(action.payload);
    },
    // 렌더링 답글
    setTotalReplies: (state, action: PayloadAction<Array<object>>): void => {
      (state.totalReplies as Array<object>).unshift(...action.payload);
    },
    // 답글 클릭 여부
    isOpened: (state, action: PayloadAction<object>): void => {
      (state.isOpened as unknown) = action.payload;
    },
    // 답글 클릭 상태 변경
    setIsOpened: (state, action: PayloadAction<number>): void => {
      (state.isOpened! as Array<boolean>)[action.payload] = !(
        state.isOpened! as Array<boolean>
      )[action.payload];
    },
  },
});

export default replySlice;
export const {
  setReplyLike,
  setReplyDislike,
  setReply,
  setReplyId,
  isEdit,
  setIsEdit,
  addReplyEdit,
  setTotalReplies,
  isOpened,
  setIsOpened,
} = replySlice.actions;
