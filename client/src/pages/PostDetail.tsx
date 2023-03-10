import React from 'react';
import styled from 'styled-components';
import CommentInput from '../components/postDetailP/CommentInput';
import Comment from '../components/postDetailP/Comment';
import ProfilePreview from '../components/postDetailP/ProfilePreview';
import RecommendedPost from '../components/postDetailP/RecommendedPost';
import BookmarkIcon from '../assets/common/BookmarkIcon';
import { BsThreeDots } from 'react-icons/bs';
import TimeIcon from '../assets/common/TimeIcon';
import ViewIcon from '../assets/common/ViewIcon';
import CommentIcon from '../assets/common/CommentIcon';
import DislikeIcon from '../assets/common/DislikeIcon';
import LikeIcon from '../assets/common/LikeIcon';

const PostDetail = () => {
  const img =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWYbN0psesHG68-EUQ0ljjqAK806TEJBC5Q&usqp=CAU';
  return (
    <Container>
      <PostContainer>
        <h1>인터넷으로 돈버는 25가지 방법</h1>
        <PostInfo>
          <ul className="post-info">
            <li className="image">
              <img src={img}></img>
            </li>
            <li className="nickname">NickName</li>
            <TimeIcon />
            <li className="created-time">12시간 전</li>
            <ViewIcon />
            <li className="views">2,500</li>
            <CommentIcon checked={false} />
            <li className="comments">100</li>
            <BookmarkIcon checked={false} />
            <BsThreeDots />
          </ul>
        </PostInfo>
        <PostContent>
          <img src={img} width={100} height={100}></img>
          <div>돈버는 방법 공유합니다~~</div>
          <div>
            이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는
            사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에
            당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한
            사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라
            하실지 모르지만 사실입니다. 영국에서 HGXWCH이라는 사람은 1930년에 이
            편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠
            뒤에 복권이 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나
            96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧
            사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시
            좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만
            그냥 버렸습니다. 결국 9일 후 그는 암살당했습니다. 기억해 주세요. 이
            편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이
            있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로
            안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들것입니다.
            힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서...
          </div>

          <ul className="post-info">
            <LikeIcon checked={false} /> <li className="likes">30</li>
            <DislikeIcon checked={false} /> <li className="dislikes">20</li>
          </ul>
          <CommentInput></CommentInput>
          <Comment></Comment>
          <Comment></Comment>
        </PostContent>
      </PostContainer>
      <RecommendedPostContainer>
        <div className="recommended-post">
          <RecommendedPost></RecommendedPost>
        </div>
      </RecommendedPostContainer>
      {/* <ProfilePreview></ProfilePreview> */}
    </Container>
  );
};

export default PostDetail;
// 페이지 컨테이너
const Container = styled.div`
  display: grid;
  grid-template-columns: 760px 340px;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
// Post 컨테이너
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 100%;
  padding: 75px 50px 75px 15px;
  /* background-color: lightgray; */
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .post-info {
    width: 720px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 30px 0 30px 0;
    border-bottom: 1px solid #d4d4d4;
    .nickname {
      font-size: 16px;
      margin: 2px 15px 0 2px;
    }
    .created-time {
      font-size: 16px;
      margin: 3px 15px 0 5px;
    }
    .views {
      font-size: 16px;
      margin: 1px 15px 0 5px;
    }
    .comments {
      font-size: 16px;
      margin: 1px 230px 0 5px;
    }
  }
  .image {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    margin: 0 15px 0 5px;
  }
  .image img {
    width: 28px;
    height: 28px;
    border-radius: 100px;
  }
`;
// Post 정보
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
`;
const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-top: 50px;
  width: 720px;
  height: 100%;
  line-height: 30px;
  .likes {
    font-size: 16px;
    margin: 0 15px 0 15px;
  }
  .dislikes {
    font-size: 16px;
    margin: 0 15px 0 15px;
  }
`;

// 추천글 컨테이너
const RecommendedPostContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .recommended-post {
    display: flex;
    justify-content: center;
    padding: 5%;
    width: 315px;
    height: 440px;
    background-color: white;
    border: 2px solid #d4d4d4;
  }
`;
