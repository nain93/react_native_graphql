import React from "react";
import styled from "styled-components";
import WorldCupGame from "./WorldCupGame";

const Container = styled.View`
  flex: 1;
`;

function Now({ navigation }) {
  return (
    <Container>
      <WorldCupGame navigation={navigation} />
    </Container>
  );
}

export default Now;
