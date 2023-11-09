import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function CustomInput({
  placeholder,
  secureTextEntry,
  heightInput,
  icon,
  iconEye,
  boolBlueElement,
  textInputIcon,
  widthInput,
  value,
  onchangeText,
  onBlur,
  boolSideButton,
  error,
  maxLength,
  keyboardType,
  shouldTrimText = true,
}) {
  const handleChangeText = (text) => {
    let newText = text;
    if (shouldTrimText) {
      // Eliminar espacios en blanco al principio y al final del texto
      newText = text.trim();
    }
    onchangeText(newText);
  };

  return (
    <>
      <View style={[styles.container, { height: heightInput }]}>
        {boolBlueElement ? (
          <View style={styles.blueElement}>
            <Image style={styles.Icon} source={icon} />
          </View>
        ) : null}
        <TextInput
          label={placeholder}
          value={value}
          onChangeText={handleChangeText}
          onBlur={onBlur}
          mode="outlined"
          style={[styles.input, { width: widthInput }]}
          secureTextEntry={secureTextEntry}
          left={textInputIcon}
          right={iconEye}
          theme={{
            colors: {
              primary: "#003580",
            },
            roundness: 10,
          }}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
        {boolSideButton ? (
          <TouchableOpacity style={styles.sideButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Enviar código
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  blueElement: {
    backgroundColor: "#003580",
    width: "20%",
    height: "88%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,

    marginTop: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  Icon: {
    width: 32,
    height: 32,
  },
  input: {
    width: "75%",
    fontSize: 16,
  },
  sideButton: {
    backgroundColor: "#4DBF44",
    width: "25%",
    height: "88%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
