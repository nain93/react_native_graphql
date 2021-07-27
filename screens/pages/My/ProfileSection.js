import React from "react";
import styled from "styled-components";
import dummyData from "../../../data/dummyData";
import { colors } from "../../../style";
import { Text, TouchableOpacity } from "react-native";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../../apollo";

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

const IconBox = styled.View``;

const IconText = styled.Text`
  color: ${colors.main};
  font-weight: 700;
`;

const ProfileSection = ({ navigation }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const handleLogout = () => isLoggedInVar(false);

  const goToWallet = () => navigation.navigate("LogIn");

  return (
    <Container>
      <ProfileImg source={{ uri: dummyData.result.List7.data[0].img }} />
      <ProfileDesc>
        {isLoggedIn ? (
          <>
            <ProfileId>nickname</ProfileId>
            <IconBox>
              <IconText>180</IconText>
              <TouchableOpacity onPress={handleLogout}>
                <Text>로그아웃</Text>
              </TouchableOpacity>
            </IconBox>
          </>
        ) : (
          <>
            <ProfileId>guest</ProfileId>
            <TouchableOpacity onPress={goToWallet}>
              <Text>로그인</Text>
            </TouchableOpacity>
          </>
        )}
      </ProfileDesc>
    </Container>
  );
};

export default ProfileSection;
