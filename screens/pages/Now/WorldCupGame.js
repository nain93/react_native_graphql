import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import NowPopularSection from "./NowPopularSection";
import WorldIcon from "react-native-vector-icons/Ionicons";
import { colors } from "../../../style";
import ScreenLayout from "../../../Components/ScreenLayout";

const Container = styled.View`
  flex: 1;
`;

const ImgBox = styled.View`
  width: 100%;
  flex-direction: row;
`;

const WorldCupImg = styled.Image`
  height: 180px;
  width: 50%;
`;

const DescBox = styled.View`
  width: 100%;
  height: 60px;
  background-color: white;
  padding: 5px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DescTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const Desc = styled.Text``;

function WorldCupGame({ navigation }) {
  const GET_CONTENT_ALL = gql`
    query getContentAll($type: String) {
      getContentAll(type: $type) {
        id
        title
        desc
        type
        views
        userId
        photos {
          photoUrl
        }
        bookMarks {
          contentId
          id
          userId
        }
      }
    }
  `;

  const { data, loading } = useQuery(GET_CONTENT_ALL, {
    variables: {
      type: "imggame",
    },
    onCompleted: (props) => {},
  });

  const goToDetail = ({ url, title, type }) => {
    navigation.navigate("DetailReady", {
      url,
      title,
      type,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          goToDetail({
            url: item.photos,
            title: item.title,
            type: item.type,
          })
        }
      >
        <ImgBox>
          <WorldCupImg source={{ uri: item.photos[0].photoUrl }} />
          <WorldCupImg source={{ uri: item.photos[1].photoUrl }} />
        </ImgBox>

        <DescBox>
          <View>
            <DescTitle>{item.title}</DescTitle>
            <Desc>내용</Desc>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <WorldIcon
                name="eye-outline"
                color={colors.main}
                size={20}
                style={{ marginLeft: 12 }}
              />
              <Text style={{ marginLeft: 3 }}>24</Text>
            </View>

            <WorldIcon
              name="trophy-outline"
              color={colors.main}
              size={20}
              style={{ marginLeft: 12 }}
            />
            <WorldIcon
              name="share-social-outline"
              color={colors.main}
              size={20}
              style={{ marginLeft: 12 }}
            />
          </View>
        </DescBox>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ListHeaderComponent={NowPopularSection}
        data={data?.getContentAll}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </ScreenLayout>
  );
}

export default WorldCupGame;
