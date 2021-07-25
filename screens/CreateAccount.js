import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import {
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../style";
import { useDispatch } from "react-redux";
import { logIn, userNickName } from "../redux/reducers/userReducer";
import headerLogo from "../assets/bigheaderLogo.png";

const TextInput = styled.TextInput`
  width: 70%;
  height: 50px;
  border-radius: 5px;
  background-color: white;
  padding: 0 10px;
`;

const LinkBox = styled.TouchableOpacity`
  margin-top: 20px;
  width: 70%;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  border: 1px solid ${colors.main};
`;

const NextLink = styled.Text`
  text-align: center;
  color: ${colors.main};
`;

const ErrorText = styled.Text`
  margin-top: 5px;
  color: red;
`;

const LogoImg = styled.Image`
  margin-bottom: 50px;
`;

function CreateAccount({ navigation }) {
  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };

  const dispatch = useDispatch();

  const nickNameRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const { nickname } = data;
    dispatch(logIn(nickname));
    navigation.navigate("Home");
    // * nickname 저장, 로그인 true
  };

  useEffect(() => {
    register("nickname", { required: "닉네임을 입력해주세요" });
  }, [register]);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyBoard}
      disabled={Platform.OS === "web"}
    >
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#F2F2F2" }}
        contentContainerStyle={{
          height: 600,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogoImg source={headerLogo} />
        <TextInput
          style={{ backgroundColor: "white" }}
          ref={nickNameRef}
          placeholder="닉네임"
          placeholderTextColor={colors.main}
          onSubmitEditing={handleSubmit(onSubmit)}
          onChangeText={(text) => setValue("nickname", text)}
          autoCapitalize={"none"}
          returnKeyLabel="next"
        />

        <ErrorMessage
          errors={errors}
          name="nickname"
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
        <LinkBox onPress={handleSubmit(onSubmit)}>
          <NextLink>다음</NextLink>
        </LinkBox>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

export default CreateAccount;
