import {html} from "lit-html";
import {CdnPath} from "@utils/path";
import {header} from "@pages/common/header";
import {footer} from "@pages/common/footer";
import {language_selector} from "@components/language-selector/language-selector";
import {set_language, get_language} from "@components/language-selector/language-selector-state";
import {play_global_oneshot, play_oneshot_future, stop_global_oneshot} from "@utils/audio";
import {button} from "@components/green-button/green-button";
import "./home.css";
import {router_service} from "@components/router/router-state";

const onSelect = (level: "rr" | "r") => {
    
    router_service.send({type: "MENU", level});
}

export const home = () => {

    const lang = get_language();

    const onHover = (name:string) => () => {

        const path = CdnPath.root(`media/audio/${lang}/${name}.mp3`);
        play_global_oneshot(path);
    }

    const onHoverOut = () => {
        stop_global_oneshot();
    }

    const grade_rr_label = lang === "english" ? "Grade RR" : "ibanga RR";
    const grade_r_label = lang === "english" ? "Grade R" : "ibanga R";

    const button_classes = `green-button ${lang}`;
    
    return html`
        ${header("home-header")}
        <div class="home">
            <img class="home-tj" src=${CdnPath.root("tj-graduate.png")} />
            <div class="banner-text ${get_language()}" @mouseover=${onHover("TJs_whats_this_game")} @mouseout=${onHoverOut}>
                ${get_text_lines()}
            </div>
                <div class="grade-buttons">
                    <div>
                    ${button (button_classes) (grade_rr_label) ({
                        onSelect: () => onSelect("rr"),
                        onHover: onHover("grade_RR"),
                        onHoverOut,
                    })}
                    </div>
                    <div>
                    ${button (button_classes) (grade_r_label) ({
                        onSelect: () => onSelect("r"),
                        onHover: onHover("grade_R"),
                        onHoverOut
                    })}
                    </div>
                </div>
        </div>
        ${footer({right: language_selector()})}
    `
}

const get_text_lines = () => get_language() == "english"
    ? html`
        <div class="size81">TJ's</div>
        <div class="size92">WHAT'S THIS?</div>
        <div class="size81">Game</div>
        `
    : html`
        <div class="size81">TJ's</div>
        <div class="size89">Yini Lo Mdlalo</div>
        ` 