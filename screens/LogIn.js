import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../style";
import headerLogo from "../assets/bigheaderLogo.png";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const TextInput = styled.TextInput`
  width: 70%;
  height: 50px;
  border-radius: 2px;
  background-color: white;
  padding: 0 10px;
`;

const LinkBox = styled.TouchableOpacity`
  margin-top: 10px;
  width: 70%;
  height: 50px;
  border-radius: 2px;
  justify-content: center;
  background-color: ${colors.main};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const NextLink = styled.Text`
  text-align: center;
  color: white;
`;

const ErrorText = styled.Text`
  margin-top: 5px;
  color: red;
`;

const LogoImg = styled.Image`
  width: 50%;
  height: 100px;
`;

function LogIn({ navigation, route: { params } }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: params?.email,
      password: params?.password,
    },
  });
  const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        ok
        error
        token
      }
    }
  `;
  const onCompleted = (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
    }
  };

  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };

  const emaileRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onSubmit = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
    navigation.navigate("Home");
  };

  const goToCreateAccout = () => navigation.navigate("CreateAccount");

  useEffect(() => {
    register("email", { required: "이메일을 입력해주세요" });
    register("password", { required: "비밀번호를 입력해주세요" });
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
        <LogoImg source={headerLogo} resizeMode={"contain"} />
        <TextInput
          value={watch("email")}
          style={{ backgroundColor: "white" }}
          ref={emaileRef}
          placeholder="이메일"
          placeholderTextColor={"#a5a5a5"}
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("email", text)}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
          returnKeyType="next"
        />
        <TextInput
          value={watch("password")}
          style={{ backgroundColor: "white", marginTop: 10, marginBottom: 10 }}
          ref={passwordRef}
          placeholder="비밀번호"
          placeholderTextColor={"#a5a5a5"}
          onSubmitEditing={handleSubmit(onSubmit)}
          onChangeText={(text) => setValue("password", text)}
          autoCapitalize={"none"}
          secureTextEntry
          returnKeyType="done"
        />

        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />

        <LinkBox
          disabled={!watch("email") || !watch("password")}
          onPress={handleSubmit(onSubmit)}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <NextLink>로그인</NextLink>
          )}
        </LinkBox>
        <LinkBox onPress={goToCreateAccout}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <NextLink>회원가입</NextLink>
          )}
        </LinkBox>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

export default LogIn;
