import React, { useState,useEffect } from "react";
import { useQuery } from '@apollo/client';
import fromUnixTime from 'date-fns/fromUnixTime';
import { format } from 'date-fns';
import { POSTS_QUERY } from './model';

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import Newsletter from "./common/Newsletter";
import OurServices from "./common/OurServices";


const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

const baseCloudinaryUrl =
  process.env.REACT_APP_CLOUDINARY_BASE_URL  || 'https://res.cloudinary.com/patmos-watersports/image/upload/v1625418099/';


export default () => {
const headingText = "Blog Posts"

  const [visible, setVisible] = useState(9);


  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };

  const { data, loading, error } = useQuery(POSTS_QUERY, {
    variables: {
      offset: 0,
      limit: 100,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  const posts = data && data.posts || [];

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Posts>
            {posts.slice(0, visible).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <Post className="group" as="a" href={post.url}>
                  <Image imageSrc={`${baseCloudinaryUrl}${post.image_public_id}`} />
                  <Info>
                    <Category>{post.category}</Category>
                    <CreationDate>{format(
                  fromUnixTime(post.created_at / 1000),
                  'dd/MM/yyyy'
                )}</CreationDate>
                    <Title>{post.title_en}</Title>
                    {post.summary_en && <Description>{post.summary_en}</Description>}
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </Posts>
          {visible < posts.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>
      <Newsletter/>
      <OurServices/>
      <Footer />
    </AnimationRevealPage>
  );
};
