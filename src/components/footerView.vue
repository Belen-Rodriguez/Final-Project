<template>
  <footer class="fixed">
    <p class="personal-p bold">· Doït ·</p>
    <p class="personal-p2">Ironhack - C/ de Pamplona, 96, 08018 Barcelona</p>
  </footer>
</template>

<script></script>

<style scoped>
footer {
  padding-top: 1.5rem;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap:2%;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.personal-p{
    text-align: end;
}
.personal-p2{
    text-align: start;
}

.fixed{
    position: fixed;
    bottom: 0;
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
.personal-p2{
  font-size: 0.8rem;
}
.fixed{
    position: relative;
}
footer{
  margin-top: 0.5rem;
}
}

</style>
