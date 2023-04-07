import React, { useState, useEffect } from 'react';
import LikeIcon from '../../assets/common/LikeIcon';
import TimeIcon from '../../assets/common/TimeIcon';
import ViewIcon from '../../assets/common/ViewIcon';
import CommentIcon from '../../assets/common/CommentIcon';
import Thumnail from '../common/Thumbnail';
import { BsTrophy } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { weeklyPopularApi } from '../../api/postListapi';
import { timeSince } from '../mainP/Timecalculator';
import { Itemside, Info, Tag } from './PostList';
import { PostListItem } from '../../types/PostList';
import { FaRegThumbsUp } from 'react-icons/fa';

function WeeklyPopular() {
  const weeklyPopularquery = weeklyPopularApi.useGetWeekPostListQuery({
    endpoint: 'weekly-popular',
  });
  const { data, isSuccess } = weeklyPopularquery;

  return (
    <>
      {isSuccess &&
        data.posts.map((post: PostListItem, index: number) => {
          return (
            <WeeklyBestItem key={post.postId}>
              <Link to={`/posts/${post.postId}`}>
                <div>
                  <Thumnail content={post.imgUrl} />
                </div>
                <div>
                  <h1>
                    {post.title}
                    <div>
                      <BsTrophy size={20} />
                      <span>{index + 1}</span>
                    </div>
                  </h1>
                  <Itemside>
                    <div>
                      {post.tags.map((tag, index) => (
                        <Tag key={index}>{tag.tagName}</Tag>
                      ))}
                    </div>
                    <Info>
                      <span>{post.memberName}</span>
                      <span>
                        <CommentIcon checked={false} />
                        {post.commentCount}
                      </span>
                      <span>
                        <TimeIcon />
                        {timeSince(post.createdAt)}
                      </span>
                      <span>
                        <ViewIcon />
                        {post.viewCount}
                      </span>
                      <span>
                        <FaRegThumbsUp size={13} />
                        {post.thumbupCount}
                      </span>
                    </Info>
                  </Itemside>
                </div>
              </Link>
            </WeeklyBestItem>
          );
        })}
    </>
  );
}

export default WeeklyPopular;
const Item = styled.li`
  a {
    height: 100px;
    border-bottom: 1px solid var(--border-color);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    h1 {
      font-size: 20px;
      margin-bottom: 4px;
    }
    > div:nth-child(2) {
      flex-grow: 1;
    }
    :hover {
      background-color: var(--background-hover-blue-color);
    }
  }
`;
const WeeklyBestItem = styled(Item)`
  background-color: var(--background-blue-color);
  h1 {
    div {
      position: relative;
      display: inline-block;
      svg {
        color: var(--point-blue-color);
        margin-left: 10px;
        transform: translateY(2px);
      }
      span {
        position: absolute;
        font-size: 10px;
        right: 7px;
        top: 3px;
        color: var(--point-blue-color);
      }
    }
  }
`;