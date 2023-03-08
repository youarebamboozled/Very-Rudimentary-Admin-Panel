<template>
  <div class="login">
    <div class="login__container">
      <div class="login__container__header">
        <h1 class="login__container__header__title">Login</h1>
      </div>
      <div class="login__container__body">
        <div class="login__container__body__form">
          <div class="login__container__body__form__group">
            <label for="username" class="login__container__body__form__group__label">Username</label>
            <input type="text" name="username" id="username" class="login__container__body__form__group__input" />
          </div>
          <div class="login__container__body__form__group">
            <label for="password" class="login__container__body__form__group__label">Password</label>
            <input type="password" name="password" id="password" class="login__container__body__form__group__input" />
          </div>
          <div class="login__container__body__form__group">
            <button class="login__container__body__form__group__button">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
}
</script>

<style scoped>

</style>