import React,{ useState, useEffect } from "react";
import OurServices from './common/OurServices'
import {  listAssets } from '../../services/asset';
import Gallery from "react-photo-gallery";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Newsletter from "./common/Newsletter";

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;
const PhotoGalleryContainer = tw.div`lg:w-2/3`;



export default ({url}) => {
 
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( 
        () =>
          listAssets(url).then(({ data }) => {
            setAssets(JSON.parse(data));
            setLoading(false);
          }),
        [url]
      );

if (loading) return <div>Loading</div>

  return (
    // <AnimationRevealPage>
    <Container>
      <Header/>

      <ContentWithPaddingXl>


            <Heading>Photo Gallery</Heading>

      
      <Gallery photos={assets.map(x=>({src:x.url,width:x.width,height:x.height}))} />


      </ContentWithPaddingXl>
      <Newsletter/>
      <OurServices/>
      <Footer/>
    </Container> 
    // </AnimationRevealPage>
  );
};
