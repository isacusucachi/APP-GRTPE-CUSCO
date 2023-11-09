import React from "react";
import { View } from "react-native";

import ServiceButton from "./ServiceButton";

export default function ServiceButtonsComponent({
  searchQuery,
  data,
  navigation,
}) {
  const normalizeString = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredData = data.filter((service) =>
    normalizeString(service.title.toLowerCase()).includes(
      normalizeString(searchQuery.toLowerCase())
    )
  );

  return (
    <View>
      {filteredData
        .sort((a, b) => a.title.localeCompare(b.title)) // Ordenar alfabéticamente por título
        .map((service) => (
          <ServiceButton
            key={service._id}
            serviceID={service._id}
            title={service.title}
            description={service.description}
            navigation={navigation}
          />
        ))}
    </View>
  );
}
