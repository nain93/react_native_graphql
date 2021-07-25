import React from "react";
import styled from "styled-components";
import { Title } from "../../../style";
import Carousel from "react-native-snap-carousel";
import dummyData from "../../../data/dummyData";

const Container = styled.View``;

const SlideBtn = styled.TouchableOpacity``;

const SlideText = styled.Text``;

const SlideImg = styled.Image`
  height: 150px;
  border-radius: 15px;
`;

const renderItem = ({ item }) => {
  return (
    <SlideBtn>
      <SlideImg source={{ uri: item.img }} />
      <SlideText>{item.name}</SlideText>
    </SlideBtn>
  );
};

const PopularSection = ({ navigation }) => {
  return (
    <Container>
      <Title>추천 월드컵</Title>
      <Carousel
        layout={"default"}
        renderItem={renderItem}
        data={dummyData.result.List1.data}
        sliderWidth={420}
        itemWidth={200}
        loop={true}
      />
    </Container>
  );
};

export default PopularSection;
