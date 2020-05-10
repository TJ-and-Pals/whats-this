import {html} from "lit-html";
import "./header.css"
import { CdnPath } from "@utils/path";
import {set_language, get_language} from "@components/language-selector/language-selector-state";
import {play_global_oneshot, play_oneshot_future, stop_global_oneshot} from "@utils/audio";
import {router_service} from "@components/router/router-state";
export const header = () => {
    const lang = get_language();

    const header = lang === "zulu" ? "Funda Amagama!" : "Learn Words!";

    const on_home = () => router_service.send("HOME");

    const onHover = (name:string) => () => {

        const lang = get_language();
        const path = CdnPath.root(`media/audio/${lang}/${name}.mp3`);
        play_global_oneshot(path);
    }

    const onHoverOut = () => {
        stop_global_oneshot();
    }

    return html`
        <header class="main-header">
            <img class="logo" src=${CdnPath.common("tj-logo-header.png")} @click=${on_home} />
            <div class="text ${lang}" @mouseover=${onHover("learn_words")} @mouseout=${onHoverOut}>${header}</div>
            <img class="tj-flag" src=${CdnPath.common("tj-flag.png")} @click=${on_home} />
        </header>
    `;
}