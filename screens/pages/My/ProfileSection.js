import React from "react";
import styled from "styled-components";
import dummyData from "../../../data/dummyData";
import { colors } from "../../../style";
import { Text, TouchableOpacity } from "react-native";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut, tokenVar } from "../../../apollo";

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
  const GET_PROFILE = gql`
    query getProfile($id: Int!) {
      getProfile(id: $id) {
        userName
        email
      }
    }
  `;

  // let id;

  // if (isLoggedIn) {
  //   id = jwt.verify(
  //     tokenVar(),
  //     "ZOPLE56bWrwcTq0wGKC5a6LJ9rci6Xus",
  //     function (decoded) {
  //       return decoded.id;
  //     }
  //   );
  // }
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id: 1,
    },
  });

  const handleLogout = () => logUserOut();

  const goToWallet = () => navigation.navigate("LogIn");

  return (
    <Container>
      <ProfileImg source={{ uri: dummyData.result.List7.data[0].img }} />
      <ProfileDesc>
        {isLoggedIn ? (
          <>
            {console.log(data)}
            <ProfileId>닉네임</ProfileId>
            <ProfileId>이메일</ProfileId>
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
