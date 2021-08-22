<template>
  <v-card class="chat-room">
    <v-card-text class="chat-messages">
      <div
        v-for="(message, i) in chatroomMessages"
        :key="i"
        class="d-flex"
        :class="message.username === user ? 'justify-end' : ''"
      >
        <div
          class="chat-globe"
          :class="message.username === user ? 'chat-globe-own' : ''"
        >
          <div>
            <h4>{{ message.username }}</h4>
            <span>{{ message.message }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="d-flex align-center">
      <v-text-field
        v-model="message"
        hide-details=""
        dense
        filled
        class="flex-grow-1"
      ></v-text-field>
      <v-btn
        @click="sendMessage(message)"
        class="flex-shrink-1"
        elevation="0"
        color="primary "
        >Enviar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState({
      chatroomMessages: (state) => state.chatroomMessages,
      user: (state) => state.user,
    }),
  },
  sockets: {
    newMessage() {
      console.log("LLego mensaje a WS");
    },
  },
  methods: {
    sendMessage(msg) {
      this.message = ""
      this.$socket.client.emit("NewMessage", msg);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-room {
  height: 70vh;
}
.chat-messages {
  height: 85%;
  overflow-y: scroll;
}
.chat-globe {
  border-radius: 5px;
  background: rgba(168, 142, 25, 0.1);
  padding: 1rem;
  margin: 0.5rem 0;
  width: 80%;
}
.chat-globe-own {
  background: rgba(32, 32, 150, 0.1);
}
</style>
