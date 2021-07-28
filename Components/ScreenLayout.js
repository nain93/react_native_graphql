import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
`;

const ScreenLayout = ({ loading, children }) => {
  return (
    <Container>
      {loading ? (
        <ActivityIndicator
          color="black"
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          size={"large"}
        />
      ) : (
        children
      )}
    </Container>
  );
};

export default ScreenLayout;
