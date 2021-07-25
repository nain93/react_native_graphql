import React from "react";
import styled from "styled-components";
import dummyData from "../../../data/dummyData";
import Ad from "../../../Components/Ad";
import FilterSection from "./FilterSection";
import NowPopularSection from "./NowPopularSection";

const Container = styled.ScrollView`
  flex: 1;
`;

function Now({ navigation }) {
  return (
    <Container>
      <NowPopularSection navigation={navigation} />
      <FilterSection />
    </Container>
  );
}

export default Now;
