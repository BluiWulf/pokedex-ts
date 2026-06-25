
import * as repl from "./repl.js";
import * as st from "./state.js";

function main() {
    const state: st.State = st.initState(3000);
    repl.startPokedex(state);
}

main();
