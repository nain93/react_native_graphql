import React, { useEffect, useRef } from "react";
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

const TextInput = styled.TextInput`
  width: 70%;
  height: 50px;
  border-radius: 2px;
  background-color: white;
  padding: 0 10px;
`;

const LinkBox = styled.TouchableOpacity`
  margin-top: 20px;
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

function CreateAccount({ navigation }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
      $userName: String
      $email: String!
      $password: String!
    ) {
      createAccount(userName: $userName, email: $email, password: $password) {
        ok
        error
      }
    }
  `;
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { email, password } = getValues();
    if (ok) {
      navigation.navigate("LogIn", {
        email,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };

  const emaileRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    if (!loading) {
      createAccountMutation({
        variables: {
          email,
          password,
        },
      });
    }
    navigation.navigate("Home");
  };

  useEffect(() => {
    register("email", { required: "이메일을 입력해주세요" });
    register("password", { required: "비밀번호를 입력해주세요" });
    register("rePassword", { required: "비밀번호 확인을 입력해주세요" });
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
          style={{ backgroundColor: "white", marginTop: 10, marginBottom: 10 }}
          ref={passwordRef}
          placeholder="비밀번호"
          placeholderTextColor={"#a5a5a5"}
          onSubmitEditing={() => onNext(rePasswordRef)}
          onChangeText={(text) => setValue("password", text)}
          autoCapitalize={"none"}
          secureTextEntry
          returnKeyType="next"
        />
        <TextInput
          style={{ backgroundColor: "white" }}
          ref={rePasswordRef}
          placeholder="비밀번호 확인"
          placeholderTextColor={"#a5a5a5"}
          onSubmitEditing={handleSubmit(onSubmit)}
          onChangeText={(text) => setValue("rePassword", text)}
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
        <ErrorMessage
          errors={errors}
          name="rePassword"
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
        <LinkBox disabled={false} onPress={handleSubmit(onSubmit)}>
          {!loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <NextLink>회원가입</NextLink>
          )}
        </LinkBox>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

export default CreateAccount;
