<template>
  <footer>
    <p>
      Copyright &copy; 2022 |
      <a
        href="#"
        title="Github profile"
        class="profile"
        >M. Shrief</a
      >
    </p>
  </footer>
</template>

<style lang="scss" >
@import '../assets/mixins.scss';

footer {
  text-align: center;
  margin-top: 1.6rem;
  font-size: 1.2rem;
  font-weight: 700;
  .profile {
    color: #004e64;
    text-decoration: none;
  } 
  @include mQ($breakpoint-sm) {
    margin-top: 1rem;
    font-size: 1rem;
  }
}
</style>