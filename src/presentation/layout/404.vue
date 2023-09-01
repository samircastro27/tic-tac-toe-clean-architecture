<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Button from "../ui/Button.vue";
import Title from "../ui/Title.vue";

const router = useRouter();
const fullPath = ref<string | undefined>(undefined);

onMounted(() => {
  fullPath.value = router.currentRoute.value.fullPath;
  router.replace("/not-found");
});
function toHome() {
  router.push("/home");
}
</script>
<template>
  <Title label="404" />
  <span class="mt-4 h-6">
    <p class="text-terciary/40">
      Route "<span v-if="fullPath">{{ fullPath }}</span>" has not been found
    </p>
  </span>
  <section class="flex flex-col flex-1 w-full gap-4 px-12 mt-[20rem]">
    <Button @buttonClick="toHome()" label="navigate to home" />
  </section>
  <footer class="h-auto p-8">
    <p>Copyright &copy; John James Valencia</p>
  </footer>
</template>
