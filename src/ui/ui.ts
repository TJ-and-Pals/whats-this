import {home} from "@ui/pages/home";
import {html} from "lit-html";
import {base} from "@ui/common/base";
import "./ui.css";
import { basename } from "path";

export const ui = () => base(home());
