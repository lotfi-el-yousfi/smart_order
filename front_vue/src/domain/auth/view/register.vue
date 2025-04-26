<script setup>
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {useAuth} from '@/domain/auth/store/store'
import {useForm} from 'vee-validate';
import {object, string} from 'yup';
import {toTypedSchema} from "@vee-validate/yup";

const router = useRouter()
const authStore = useAuth()

const schema = toTypedSchema(object({
  email: string().email().required(),
  firstname: string().required(),
  lastname: string().required(),
  phone: string().required(),
  confirmed_email: string().oneOf([ref('email')]).required(),
  password: string().required(),
}))

const {handleSubmit, isSubmitting, errors} = useForm({
  validationSchema: schema,
})

const form = reactive({
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
  confirmed_email: '',
  password: '',
})

const onSubmit = async () => {
  await authStore.register(form)
  await router.push('/login')
}
</script>

<template>
  <v-col cols="12" class="text-center">
    <h1 class="display-2">register</h1>
  </v-col>

  <VForm @submit="handleSubmit(onSubmit)" v-slot="{ errors }">
    <v-container>
      <v-col cols="6" offset="3">
        <v-text-field v-model="form.email" label="Email" type="email" :error-messages="errors.email" required/>
        <v-text-field v-model="form.firstname" label="firstname" type="text" :error-messages="errors.firstname"
                      required/>
        <v-text-field v-model="form.lastname" label="lastname" type="text" :error-messages="errors.lastname" required/>
        <v-text-field v-model="form.phone" label="phone" type="text" :error-messages="errors.phone" required/>
        <v-text-field v-model="form.confirmed_email" label="confirmed_email" type="text"
                      :error-messages="errors.confirmed_email" required/>
        <v-text-field v-model="form.password" label="password" type="password" :error-messages="errors.password"
                      required/>
        <v-btn type="submit" color="primary" :loading="isSubmitting">Register</v-btn>
      </v-col>
    </v-container>
  </VForm>
</template>

<style scoped>

</style>