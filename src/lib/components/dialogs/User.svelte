<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../../stores/stores";

  onMount(() => {
    window.parent.postMessage(
      {
        type: "getUserName",
      },
      "*"
    );

    window.addEventListener("message", (event) => {
      const { type, data } = event.data;

      if (type === "devvit-message") {
        const { message } = data;

        switch (message.type) {
          case "initialData": {
            const { username } = message.data;
            user.set(username);
            // console.log(username);
            // console.log(top);
            break;
          }
        }
      }
    });
  });
</script>

<div class="fixed bottom-1 left-2 select-none px-2 text-white">
  <span class="bangers-regular">{$user}</span>
</div>
