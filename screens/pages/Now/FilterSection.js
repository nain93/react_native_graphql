import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ItemBox, Title, colors } from "../../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import dummyData from "../../../data/dummyData";

const Container = styled.View``;

const WorldCupImg = styled.Image`
  height: 180px;
  width: 100%;
`;

const DescBox = styled.View`
  width: 100%;
  height: 60px;
  background-color: white;
  padding: 5px 20px;
`;

const DescTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const Desc = styled.Text``;

function FilterSection() {
  return (
    <Container>
      <Title>월드컵 게임</Title>
      <WorldCupImg source={{ uri: dummyData.result.List5.data[0].img }} />
      <DescBox>
        <DescTitle>{dummyData.result.List5.data[0].name}</DescTitle>
        <Desc>{dummyData.result.List5.data[0].category}</Desc>
      </DescBox>
    </Container>
  );
}

export default FilterSection;
