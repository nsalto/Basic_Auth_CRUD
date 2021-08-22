<template>
  <v-app>
    <v-app-bar app color="blue darken-4" dark>
      <v-container class="d-flex align-center">
        <h1>codeCave chat</h1>
        <v-spacer></v-spacer>
        Home
      </v-container>
    </v-app-bar>
    <main class="main">
      <v-container>
        <v-row class="chat">
          <v-col cols="12" lg="4" md="4">
            <Sidebar />
          </v-col>
          <v-col cols="12" lg="8" md="8">
            <Chatroom />
          </v-col>
        </v-row>
      </v-container>
    </main>
    <v-dialog v-model="createUserDialog" max-width="600">
      <v-card>
        <v-card-title>
          <h2>Crear usuario</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="username"></v-text-field>
          <v-btn @click="login(username)">Registrar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Chatroom from "@/components/Chatroom";
export default {
  components: {
    Sidebar,
    Chatroom,
  },
  data() {
    return {
      username: "",
      createUserDialog: true
    };
  },
  sockets: {
    connect() {
      console.log("Entro a connection");
    },
    NEW_MESSAGE(msg) {
      this.$store.commit("ADD_MESSAGE", msg)
    },
    LOGIN(data){
      this.$store.commit("CONNECTED_USERS", data.users)
      console.log("LLEGO", data);
    },
    USER_JOINED(data){
      this.$store.commit("CONNECTED_USERS", data.users)
      console.log("LLEGO USER", data)
    }
  },
  methods: {
    login(username) {
      this.$socket.client.emit("login", username);
      this.$store.commit("REGISTER_USER", username)
      this.createUserDialog = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: rgb(0, 0, 255, 0.1);
}
.chat {
  height: 70%;
}
</style>
