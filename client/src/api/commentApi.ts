import { apiSlice } from './apiSlice';

// 댓글 API
export const commentsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Comment'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // 댓글 조회
      getComment: builder.query({
        query: ({ postId, page, orderby = 'latest' }) =>
          //latest, thumbup
          `posts/${postId}/comments?page=${page}&orderby=${orderby}`,
        providesTags: ['Comment'],
      }),
      // 댓글 추가
      setComment: builder.mutation({
        query: ({ postId, content }) => {
          return {
            url: `posts/${postId}/comments`,
            method: 'POST',
            body: { postId, content },
          };
        },
        invalidatesTags: ['Comment'],
      }),
      // 댓글 수정
      updateComment: builder.mutation({
        query: ({ postId, commentId, content }) => {
          return {
            url: `/comments/${commentId}`,
            method: 'PATCH',
            body: { postId, content },
          };
        },
        invalidatesTags: ['Comment'],
      }),
      // 댓글 삭제
      deleteComment: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `/comments/${commentId}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      // 댓글 좋아요 추가
      addCommentThumbUp: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbup`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      // 댓글 좋아요 제거
      removeCommentThumbUp: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbup`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      // 댓글 싫어요 추가
      addCommentThumbDown: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbdown`,
            method: 'POST',
          };
        },
        invalidatesTags: ['Comment'],
      }),
      // 댓글 싫어요 제거
      removeCommentThumbDown: builder.mutation({
        query: ({ commentId }) => {
          return {
            url: `comments/${commentId}/thumbdown`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Comment'],
      }),
    }),
  });