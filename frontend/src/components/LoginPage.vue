<template>
	<Card class="LoginCard center">
		<template #header>
			<img alt="login header" src="@/assets/images/LoginHeader.png"/>
		</template>
		<template #title>
			Codam Book Club
		</template>
		<template #content>
			<Button label="Login" class="p-button-text p-button-raised p-button-plain" @click="login" />
		</template>
	</Card>
</template>

<script lang="ts">
import { loginRedirect } from "@/util/auth";
import { defineComponent } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";

export default defineComponent({
	methods: {
		login() {
			loginRedirect();
		}
	},
	components: { Button, Card },
});
</script>

<style>
.LoginCard {
	width: 40rem;
	text-align: center;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
