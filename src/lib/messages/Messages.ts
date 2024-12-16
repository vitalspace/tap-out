import { user } from "../../stores/stores";

const browser = typeof window !== "undefined";

if (browser) {
  console.log("Browser is defined");

  window.addEventListener("message", (event) => {
    console.log("Mesanjes del backend: ", event.data);

    const { type, data } = event.data;

    // console.log("Mesanjes del backend: ", type, data);

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
        // case "updateLeaderboard": {
        //   const { top } = message.data;
        //   globalTopEasy.set(top);

        //   // console.log("svelte easy", top);
        //   break;
        // }

        // case "updateLeaderboardMidMode": {
        //   const { top } = message.data;
        //   globalTopMid.set(top);

        //   // console.log("svelte mid", top);
        //   break;
        // }
      }
    }
  });
}
