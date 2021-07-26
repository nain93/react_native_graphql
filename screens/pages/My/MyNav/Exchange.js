import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors, Title } from "../../../../style";
import { Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import dummyData from "../../../../data/dummyData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/core";

const CoinBtnBox = styled.View``;

const CoinBtn = styled.View`
  flex-direction: row;
  background-color: ${colors.main};
  padding: 0 2%;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const CoinBtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const ExChangeBtn = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${colors.main};
`;

const ExchangeText = styled.Text`
  font-weight: 700;
  color: white;
`;

const Exchange = () => {
  const coinRef = useRef();
  const [coinName, setCoinName] = useState("SUC");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const { coin } = data;

    // * coin 저장, 로그인 true (dispatch , navigation)
  };

  useEffect(() => {
    register("coin", { required: "교환할 코인 갯수를 입력해주세요" });
  }, [register]);

  useFocusEffect(
    useCallback(() => {
      coinRef?.current?.focus();
      return;
    }, [])
  );

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        height: 700,
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Title style={{ color: colors.main, marginLeft: 0 }}>교환할 코인</Title>
      <CoinBtnBox>
        <ModalSelector
          style={{
            backgroundColor: colors.main,
            marginBottom: "2%",
            justifyContent: "center",
          }}
          onChange={(e) => setCoinName(e.name)}
          data={dummyData.result.List4.data}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.name}
          animationType={"fade"}
          initValue={"SUC"}
          initValueTextStyle={{
            textAlign: "left",
            color: "white",
          }}
          selectTextStyle={{ textAlign: "left", color: "white" }}
          optionTextStyle={{ color: "black" }}
          backdropPressToClose={true}
          cancelText={"닫기"}
          childrenContainerStyle={{}}
          selectStyle={{ borderColor: "transparent" }}
        >
          <CoinBtn>
            <Text style={{ color: "white" }}>{coinName}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </CoinBtn>
        </ModalSelector>
        <CoinBtn>
          <TextInput
            style={{ width: "80%", height: "100%", color: "black" }}
            placeholder={"0"}
            placeholderTextColor={"rgba(0,0,0,0.3)"}
            ref={coinRef}
            onSubmitEditing={handleSubmit(onSubmit)}
            onChangeText={(text) => setValue("coin", text)}
            autoCapitalize={"none"}
            returnKeyLabel="next"
            keyboardType="phone-pad"
          />
          <CoinBtnText>{coinName}</CoinBtnText>
        </CoinBtn>
      </CoinBtnBox>
      <Title style={{ color: colors.main, marginLeft: 0 }}>
        교환 가능양: 10 {coinName}
      </Title>
      <ExChangeBtn onPress={handleSubmit(onSubmit)}>
        <ExchangeText>교환하기</ExchangeText>
      </ExChangeBtn>
    </KeyboardAwareScrollView>
  );
};

export default Exchange;
