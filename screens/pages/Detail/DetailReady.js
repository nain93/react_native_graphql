import React from "react";
import styled from "styled-components";
import { colors } from "../../../style";

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const ImgBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: 40%;
`;

const ImgItem = styled.Image`
  height: 70%;
  width: 50%;
`;

const DescBox = styled.View`
  align-items: center;
`;

const MainText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const OtherText = styled.Text`
  margin: 10px 0;
  font-weight: 700;
`;

const JoinText = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 700;
`;

const JoinBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 7%;
  margin: 0 auto;
  margin-bottom: 10%;
  border-radius: 5px;
  background-color: ${colors.main};
`;

const JoinBtnText = styled.Text`
  font-weight: 700;
  color: white;
`;

const DetailReady = ({ route, navigation }) => {
  const { title, url, type } = route.params;

  const goToDetail = () => navigation.navigate("WorldCupDetail");

  return (
    <Container>
      <ImgBox>
        <ImgItem source={{ uri: url[0].photoUrl }} />
        <ImgItem source={{ uri: url[1].photoUrl }} />
      </ImgBox>
      <DescBox>
        <MainText>{title}</MainText>
        <OtherText>{type}</OtherText>
        <JoinText>182명 참여중</JoinText>
      </DescBox>
      <JoinBtn onPress={goToDetail}>
        <JoinBtnText>게임시작!</JoinBtnText>
      </JoinBtn>
    </Container>
  );
};

export default DetailReady;
