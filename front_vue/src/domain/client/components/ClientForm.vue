<script setup lang="ts">
import {useClientStore} from "@/domain/client/store/client_store";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import {ClientDto} from "@/domain/client/model/ClientDto";
import {useRouter} from 'vue-router';

const router = useRouter();
const {} = storeToRefs(useClientStore())

const form = ref<ClientDto>({
  name: "",
  email: "",
  phone: "",
  description: "",
  password: ""
});

const submitHandler = () => {
  router.push({name: 'login'});
}
</script>

<template>
  <v-col cols="8" offset="1">
    <v-container>
      <v-form @submit.prevent="submitHandler">


        <v-text-field v-model="form.name" label="name"></v-text-field>
        <v-text-field v-model="form.email" type="email" label="email"></v-text-field>
        <v-text-field v-model="form.phone" type="phone" label="phone"></v-text-field>
        <v-text-field v-model="form.description" label="description"></v-text-field>
        <v-text-field v-model="form.password" type="password" label="password"></v-text-field>


        <v-btn label="send" color="primary" type="submit">send</v-btn>
      </v-form>
    </v-container>
  </v-col>
</template>

<style scoped>

</style>