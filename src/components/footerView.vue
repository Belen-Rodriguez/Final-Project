<template>
  <footer>
    <p class="personal-p bold">· Doït ·</p>
    <p class="personal-p2">Ironhack - C/ de Pamplona, 96, 08018 Barcelona</p>
  </footer>
</template>

<script></script>

<style scoped>
footer {
  margin-top: 2rem;
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: 35% 60%;
  grid-gap:2%;
  align-items: center;

}
.personal-p{
    text-align: end;
}
.personal-p2{
    text-align: start;
}
@media (max-width: 479px) {
  body {
    max-width: 480px;
  }
  footer {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: 20% 75%;
  grid-gap:5%;
  align-items: center;
}
}
</style>
