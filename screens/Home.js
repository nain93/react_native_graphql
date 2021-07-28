import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Now from "./pages/Now";
import Fun from "./pages/Fun";
import My from "./pages/My";
import { colors } from "../style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components";

const Tab = createBottomTabNavigator();

const Container = styled.View`
  flex: 1;
`;

function Home() {
  return (
    <Container style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.main,
          inactiveTintColor: colors.main,
          labelStyle: { fontSize: 12 },
          tabStyle: {
            display: "flex",
            justifyContent: "center",
          },

          indicatorStyle: { backgroundColor: "#eee" },
        }}
      >
        <Tab.Screen
          name="Now"
          component={Now}
          options={{
            tabBarLabel: "이상형월드컵",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "trophy-variant" : "trophy-variant-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Fun"
          component={Fun}
          options={{
            tabBarLabel: "밸런스게임",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "gamepad-variant" : "gamepad-variant-outline"}
                color={color}
                size={size}
              />
            ),
            // tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="My"
          component={My}
          options={{
            tabBarLabel: "내 정보",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </Container>
  );
}

export default Home;
