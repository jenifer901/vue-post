import { reactive, computed } from 'vue'

export function useLogin() {
  // modelo del formulario (equivalente a signal)
  const form = reactive({
    name: '',
    password: '',
  })

  const errors = reactive({
    name: '',
    password: '',
  })

  const validate = () => {
    errors.name = form.name ? '' : 'Required'
    errors.password = form.password ? '' : 'Required'

    return !errors.name && !errors.password
  }

  const isValid = computed(() => {
    return form.name.length > 0 && form.password.length > 0
  })

  return {
    form,
    errors,
    isValid,
    validate,
  }
}
