import React from "react";
import { View, StyleSheet } from "react-native";

import InformationButton from "./InformationButton";

export default function InformationSection({institutionalInformationData}) {
  return (
    <View style={styles.container}>
      <View style={styles.columna}>
        {institutionalInformationData.map(
          (comp, index) =>
            index % 2 === 0 && (
              <InformationButton
                key={index}
                title={comp.title}
                iconUrl={comp.iconUrl}
                urlLink={comp.urlLink}
              />
            )
        )}
      </View>
      <View style={styles.columna}>
        {institutionalInformationData.map(
          (comp, index) =>
            index % 2 === 1 && (
              <InformationButton
                key={index}
                title={comp.title}
                iconUrl={comp.iconUrl}
                urlLink={comp.urlLink}
              />
            )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // Para alinear las columnas en horizontal
  },
  columna: {
    flex: 1, // Para que las columnas ocupen el mismo espacio
  },
});
