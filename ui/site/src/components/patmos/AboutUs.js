import React from "react";
import { useQuery } from '@apollo/client';
import tw from "twin.macro";
import styled from "styled-components";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "./common/Header";
import Footer from "./common/Footer";
import { SectionHeading } from "components/misc/Headings.js";
import Newsletter from "./common/Newsletter";
import OurServices from "./common/OurServices";
import { SETTINGS_QUERY } from './model';


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-8 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8`;

const Heading = tw(SectionHeading)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`

const Statistics = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap`
const Statistic = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`
const Value = tw.div`font-bold text-primary-500`
const Key = tw.div`font-medium text-gray-700`

const baseCloudinaryUrl =
  process.env.REACT_APP_CLOUDINARY_BASE_URL  || 'https://res.cloudinary.com/patmos-watersports/image/upload/v1625418099/';



export default ({textOnLeft = false}) => {

  const { data, loading, error } = useQuery(SETTINGS_QUERY);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  const settings = data && data.settings
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  return (
    <AnimationRevealPage>
    <Header />
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={`${baseCloudinaryUrl}${settings.about_us_image_public_id}`} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{settings.about_us_title_en}</Heading>
            <Description>{settings.about_us_content_en}</Description>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
    <Newsletter/>
    <OurServices/>
    <Footer/>
    </AnimationRevealPage>
  );
};
