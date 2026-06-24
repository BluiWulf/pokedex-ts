
import * as repl from "./repl.js";
import * as st from "./state.js";

function main() {
    const state: st.State = st.initState();
    repl.startPokedex(state);
}

main();
