<template>
  <v-card>
    <v-card-title>Hola {{ user }}</v-card-title>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="(user, i) in users" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="user"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
