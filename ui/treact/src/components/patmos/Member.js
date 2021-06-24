import React from "react";
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { MEMBER_BY_PK_QUERY } from './model';


import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-2/3`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``

export default () => {
  const { id} = useParams();
  // This setting is for animating the post background image on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%"
    },
    hover: {
      backgroundSize: "110%"
    }
  };


  const { data, loading, error } = useQuery(MEMBER_BY_PK_QUERY, {
    variables: {
      id:+id,
      offset: 0,
      limit: 100,
    },
    fetchPolicy: 'cache-and-network',
  });
  
  if (loading) {
    return <div>Loading...</div>;
  }
  const member = data.member_by_pk
  const members = data.members || [];
  console.log({member,members})

  return (
    <Container>
             <Header/>
      <ContentWithPaddingXl>
 
        <Row>
          <PopularPostsContainer>
            <PostsContainer>
                  <Image
  
                    imageSrc={`https://res.cloudinary.com/devaloupis/image/upload/v1623773439/${member.image_public_id}`}
                  />
                  <Title>{member.name_en}</Title>
                  <Description>{member.description_en}</Description>
                  {/* <AuthorInfo>
                    <AuthorImage src={post.authorImageSrc} />
                    <AuthorNameAndProfession>
                      <AuthorName>{post.authorName}</AuthorName>
                      <AuthorProfile>{post.authorProfile}</AuthorProfile>
                    </AuthorNameAndProfession>
                  </AuthorInfo> */}

            </PostsContainer>
          </PopularPostsContainer>
          <RecentPostsContainer>
            <Heading>Other members</Heading>
            <PostsContainer>
              {members.filter(x=>x.id!==id).map((m, index) => (
              <Post key={index} href={`http://localhost:3000/members/${m.id}`} className="group">
                <PostTextContainer>
                  <Title>{m.name_en}</Title>
                  <AuthorName>{m.position_en}</AuthorName>
                </PostTextContainer>
                <Image imageSrc={`https://res.cloudinary.com/devaloupis/image/upload/v1623773439/${m.image_public_id}`} />
              </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer>
        </Row>
        
      </ContentWithPaddingXl>
      <Footer/>
    </Container>
  );
};
