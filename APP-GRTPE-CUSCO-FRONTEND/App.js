import React from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

import Navigation from "./src/navigation";
const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <StatusBar barStyle="light-content" backgroundColor="#1A3F86" />
      </QueryClientProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
