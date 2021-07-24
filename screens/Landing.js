import React from "react";
import styled from "styled-components";
// import landing from "../assets/landing.png";
import { colors } from "../style";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.main};
  align-items: center;
  justify-content: center;
`;

// const Logo = styled.Image`
//   max-width: 100%;
// `;

const GoToStyle = styled.TouchableOpacity`
  border: 1px solid white;
  border-radius: 10px;
  padding: 15px 30px;
  width: 300px;
`;

const GoToHome = styled(GoToStyle)``;

const GoToWallet = styled(GoToStyle)`
  margin-top: 5%;
  background-color: white;
`;

const ConnectText = styled.Text`
  font-size: 15px;
  text-align: center;
`;

function Landing({ navigation }) {
  const goToHome = () => navigation.navigate("Home");
  const goToWallet = () => navigation.navigate("Wallet");

  return (
    <Container>
      {/* <Logo resizeMode="contain" source={landing} /> */}
      <GoToHome onPress={goToHome}>
        <ConnectText style={{ color: "white" }}>
          나중에 월렛 생성하기
        </ConnectText>
      </GoToHome>

      <GoToWallet onPress={goToWallet}>
        <ConnectText style={{ color: colors.main }}>
          지금 바로 월렛 연동
        </ConnectText>
      </GoToWallet>
    </Container>
  );
}

export default Landing;
