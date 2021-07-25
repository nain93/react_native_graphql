import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import dummyData from "../../../data/dummyData";
import { userSelector } from "../../../redux/selector";
import { colors } from "../../../style";
import { Text, TouchableOpacity } from "react-native";
import { logOut } from "../../../redux/reducers/userReducer";

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const ProfileImg = styled.Image`
  width: 35%;
  height: 100px;
  margin-right: 5%;
`;

const ProfileDesc = styled.View`
  justify-content: center;
`;

const ProfileId = styled.Text`
  color: ${colors.main};
  font-weight: 700;
`;

const ProfileAdress = styled.Text`
  color: ${colors.main};
  font-weight: 700;
`;

const IconBox = styled.View``;

const IconText = styled.Text`
  color: ${colors.main};
  font-weight: 700;
`;

const ProfileSection = ({ navigation }) => {
  const { isLoggedIn, nickName } = useSelector(userSelector);

  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logOut());

  const goToWallet = () => navigation.navigate("CreateAccount");

  return (
    <Container>
      <ProfileImg source={{ uri: dummyData.result.List7.data[0].img }} />
      <ProfileDesc>
        <ProfileId>{nickName}</ProfileId>
        {isLoggedIn ? (
          <>
            <ProfileAdress>SW1q2w3e...2q2w5e</ProfileAdress>
            <IconBox>
              <IconText>180</IconText>
              <TouchableOpacity onPress={handleLogout}>
                <Text>로그아웃</Text>
              </TouchableOpacity>
            </IconBox>
          </>
        ) : (
          <TouchableOpacity onPress={goToWallet}>
            <Text>로그인</Text>
          </TouchableOpacity>
        )}
      </ProfileDesc>
    </Container>
  );
};

export default ProfileSection;
