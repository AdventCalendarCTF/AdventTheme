import fetch from "./fetch";
import config from "./config";
import { API } from "./api";
import "./patch";
import MarkdownIt from "markdown-it";
import $ from "jquery";
import ezq from "./ezq";

const api = new API("/");
const user = {};
const _internal = {};
const ui = {
  ezq
};
const lib = {
  $,
  markdown
};

let initialized = false;
const init = data => {
  if (initialized) {
    return;
  }
  initialized = true;

  config.urlRoot = data.urlRoot || config.urlRoot;
  config.csrfNonce = data.csrfNonce || config.csrfNonce;
  config.userMode = data.userMode || config.userMode;
  api.domain = config.urlRoot + "/api/v1";
  user.id = data.userId;
};
const plugin = {
  run: f => {
    f(CTFd);
  }
};
function markdown(config) {
  // Merge passed config with original. Default to original.
  const md_config = { ...{ html: true, linkify: true }, ...config };
  const md = MarkdownIt(md_config);
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    tokens[idx].attrPush(["target", "_blank"]);
    return self.renderToken(tokens, idx, options);
  };
  return md;
}

const CTFd = {
  init,
  config,
  fetch,
  user,
  ui,
  api,
  lib,
  _internal,
  plugin
};

export default CTFd;
const active_nav = () => {
	const navbar = document.getElementsByTagName("nav")[0];
	for (let link of navbar.getElementsByTagName("a")) {
		if (document.location.href == link.href) {
			link.classList.add("active");
		}

	}
}
active_nav();
