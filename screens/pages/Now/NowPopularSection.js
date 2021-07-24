import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ItemBox, Title } from "../../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import dummyData from "../../../data/dummyData";

const Container = styled.View``;

const Item = styled.TouchableOpacity`
  width: ${(props) => (props.current ? "100%" : "49%")};
  margin-bottom: ${(props) => (props.current ? "10px" : "0px")};
  position: relative;
`;

const ImageItem = styled.Image`
  height: 150px;
  border-radius: 15px;
`;

const DescItem = styled.View`
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 5px 10px;
`;

const DescText = styled.Text`
  color: white;
`;

const IconView = styled.View`
  width: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const IconText = styled.Text`
  color: white;
  margin-left: 2px;
  font-weight: 700;
`;

const MoreBtn = styled.TouchableOpacity`
  align-items: center;
  margin: 20px 0;
`;

const MoreText = styled.Text`
  text-align: center;
  width: 70%;
  height: 40px;
  padding: 10px 0px;
  border: 1px solid #ffc000;
  border-radius: 15px;
  color: #ffc000;
  font-weight: 700;
`;

const PopularSection = ({ navigation }) => {
  const [pickCount, setPickCount] = useState(1);
  const [pickData, setPickData] = useState([]);

  const goReady = (item) => {
    navigation.navigate("DetailReady", { item });
  };

  const handleMoreBtn = () => {
    if (pickCount === 3) {
      setPickCount(1);
      return;
    }
    setPickCount((pickCount) => pickCount + 1);
    return;
  };

  useEffect(() => {
    setPickData((pickData) => [...pickData, ...dummyData.result.List1.data]);
  }, []);

  return (
    <Container>
      <Title>지금 떠오르는 PICK!</Title>
      <ItemBox>
        {pickData
          .slice(0 + 3 * (pickCount - 1), 3 * pickCount)
          .map((item, idx) => {
            if (idx === 0) {
              return (
                <Item key={item.id} current={true}>
                  <ImageItem source={{ uri: item.img }} />
                  <DescItem>
                    <DescText>{item.name}</DescText>
                    <DescText>
                      <IconView>
                        <Ionicons name="heart" size={20} color="#eee" />
                        <IconText>180</IconText>
                      </IconView>
                      <IconView>
                        <Ionicons
                          name="arrow-undo-sharp"
                          size={20}
                          color="#eee"
                        />
                        <IconText>60</IconText>
                      </IconView>
                    </DescText>
                  </DescItem>
                </Item>
              );
            }
            return (
              <Item key={item.id} onPress={() => goReady(item)}>
                <ImageItem source={{ uri: item.img }} />
                <DescItem>
                  <DescText>{item.name}</DescText>
                  <DescText>
                    <IconView>
                      <Ionicons name="heart" size={20} color="#eee" />
                      <IconText>180</IconText>
                    </IconView>
                    <IconView>
                      <Ionicons
                        name="arrow-undo-sharp"
                        size={20}
                        color="#eee"
                      />
                      <IconText>60</IconText>
                    </IconView>
                  </DescText>
                </DescItem>
              </Item>
            );
          })}
      </ItemBox>
      <MoreBtn onPress={handleMoreBtn}>
        <MoreText>인기 PICK 더보기 {pickCount}/3</MoreText>
      </MoreBtn>
    </Container>
  );
};

export default PopularSection;
