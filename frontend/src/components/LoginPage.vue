<template>
	<Card class="LoginCard center">
		<template #header>
			<img alt="login header" src="@/assets/images/mraasvel-with-the-coding-bible.png" style="width: 42vw;"/>
		</template>
		<template #title>
			Codam Book Club
		</template>
		<template #content>
			<PrimeButton label="Login" class="p-button-text p-button-raised p-button-plain" @click="login" />
		</template>
	</Card>
</template>

<script lang="ts">
import { loginRedirect } from "@/util/auth";
import { defineComponent } from "vue";
import PrimeButton from "primevue/button";
import Card from "primevue/card";

export default defineComponent({
	methods: {
		login() {
			loginRedirect();
		}
	},
	components: { PrimeButton, Card },
});
</script>

<style scoped>
.LoginCard {
	width: 40rem;
	text-align: center;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
