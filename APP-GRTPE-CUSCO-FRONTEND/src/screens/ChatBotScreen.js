import React, { Component } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { chatWithChatBot } from "../api/api";
const botAvatar = require("../../assets/images/chatbotlogo.png");
import Logo from "../components/Logo";

const CustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#1B3F89", // Change this to the desired background color for sent messages
        },
      }}
    />
  );
};

const BOT_USER = {
  /*  */ _id: 2,
  name: "GRTPE Bot",
  avatar: botAvatar,
};

class ChatScreen extends Component {
  state = {
    messages: [],
    userId: null,
  };

  componentDidMount() {
    // Obtén el ID de usuario almacenado en AsyncStorage (debes implementar esta parte)
    this.loadUserIdFromAsyncStorage();

    // Inicializa la conversación con un mensaje de bienvenida (opcional)
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hola, soy el bot 🤖 de la GRTPE CUSCO. ¿Cuál es tu consulta?",
          createdAt: new Date(),
          user: BOT_USER,
        },
      ],
    });
  }

  // Función para cargar el ID de usuario desde AsyncStorage
  loadUserIdFromAsyncStorage = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        this.setState({ userId });
      }
    } catch (error) {
      console.error(
        "Error al cargar el ID de usuario desde AsyncStorage:",
        error
      );
    }
  };

  onSend = async (messages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const userMessage = messages[0].text;
    const { userId } = this.state;

    try {
      const data = { text: userMessage, user_id: userId };
      const response = await chatWithChatBot(data);

      const chatbotResponse = response.data.fullfillmentText;

      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, [
          {
            _id: Math.random().toString(36).substring(7),
            text: chatbotResponse,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Chatbot",
              avatar: require("../../assets/images/chatbotlogo.png"),
            },
          },
        ]),
      }));
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingBottom: 50 }}>
        <Logo />
        <GiftedChat
          locale="es"
          placeholder="Escribe un mensaje..."
          renderBubble={(props) => <CustomBubble {...props} />}
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default ChatScreen;
