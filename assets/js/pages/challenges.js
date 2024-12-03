import "./main";
import "bootstrap/js/dist/tab";
import { ezQuery, ezAlert } from "../ezq";
import { htmlEntities } from "../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import $ from "jquery";
import CTFd from "../CTFd";
import config from "../config";
import hljs from "highlight.js";

dayjs.extend(relativeTime);

CTFd._internal.challenge = {};
let challenges = [];
let solves = [];

const loadChal = id => {
  const chal = $.grep(challenges, chal => chal.id == id)[0];

  if (chal.type === "hidden") {
    ezAlert({
      title: "Challenge Hidden!",
      body: "You haven't unlocked this challenge yet!",
      button: "Got it!"
    });
    return;
  }

  displayChal(chal);
};

const loadChalByName = name => {
  let idx = name.lastIndexOf("-");
  let pieces = [name.slice(0, idx), name.slice(idx + 1)];
  let id = pieces[1];

  const chal = $.grep(challenges, chal => chal.id == id)[0];
  displayChal(chal);
};

const displayChal = chal => {
  return Promise.all([
    CTFd.api.get_challenge({ challengeId: chal.id }),
    $.getScript(config.urlRoot + chal.script),
    $.get(config.urlRoot + chal.template)
  ]).then(responses => {
    const challenge = CTFd._internal.challenge;

    $("#challenge-window").empty();

    // Inject challenge data into the plugin
    challenge.data = responses[0].data;

    // Call preRender function in plugin
    challenge.preRender();

    // Build HTML from the Jinja response in API
    $("#challenge-window").append(responses[0].data.view);

    $("#challenge-window #challenge-input").addClass("form-control");
    $("#challenge-window #challenge-submit").addClass(
      "btn btn-md btn-outline-secondary float-right"
    );

    let modal = $("#challenge-window").find(".modal-dialog");
    if (
      window.init.theme_settings &&
      window.init.theme_settings.challenge_window_size
    ) {
      switch (window.init.theme_settings.challenge_window_size) {
        case "sm":
          modal.addClass("modal-sm");
          break;
        case "lg":
          modal.addClass("modal-lg");
          break;
        case "xl":
          modal.addClass("modal-xl");
          break;
        default:
          break;
      }
    }

    $(".challenge-solves").click(function(_event) {
      getSolves($("#challenge-id").val());
    });
    $(".nav-tabs a").click(function(event) {
      event.preventDefault();
      $(this).tab("show");
    });

    // Handle modal toggling
    $("#challenge-window").on("hide.bs.modal", function(_event) {
      $("#challenge-input").removeClass("wrong");
      $("#challenge-input").removeClass("correct");
      $("#incorrect-key").slideUp();
      $("#correct-key").slideUp();
      $("#already-solved").slideUp();
      $("#too-fast").slideUp();
    });

    $(".load-hint").on("click", function(_event) {
      loadHint($(this).data("hint-id"));
    });

    $("#challenge-submit").click(function(event) {
      event.preventDefault();
      $("#challenge-submit").addClass("disabled-button");
      $("#challenge-submit").prop("disabled", true);
      CTFd._internal.challenge
        .submit()
        .then(renderSubmissionResponse)
        .then(loadChals)
        .then(markSolves);
    });

    $("#challenge-input").keyup(event => {
      if (event.keyCode == 13) {
        $("#challenge-submit").click();
      }
    });

    challenge.postRender();

    $("#challenge-window")
      .find("pre code")
      .each(function(_idx) {
        hljs.highlightBlock(this);
      });

    window.location.replace(
      window.location.href.split("#")[0] + `#${chal.name}-${chal.id}`
    );
    $("#challenge-window").modal();
  });
};

function renderSubmissionResponse(response) {
  const result = response.data;

  const result_message = $("#result-message");
  const result_notification = $("#result-notification");
  const answer_input = $("#challenge-input");
  result_notification.removeClass();
  result_message.text(result.message);

  if (result.status === "authentication_required") {
    window.location =
      CTFd.config.urlRoot +
      "/login?next=" +
      CTFd.config.urlRoot +
      window.location.pathname +
      window.location.hash;
    return;
  } else if (result.status === "incorrect") {
    // Incorrect key
    result_notification.addClass(
      "alert alert-danger alert-dismissable text-center"
    );
    result_notification.slideDown();

    answer_input.removeClass("correct");
    answer_input.addClass("wrong");
    setTimeout(function() {
      answer_input.removeClass("wrong");
    }, 3000);
  } else if (result.status === "correct") {
    // Challenge Solved
    result_notification.addClass(
      "alert alert-success alert-dismissable text-center"
    );
    result_notification.slideDown();

    if (
      $(".challenge-solves")
        .text()
        .trim()
    ) {
      // Only try to increment solves if the text isn't hidden
      $(".challenge-solves").text(
        parseInt(
          $(".challenge-solves")
            .text()
            .split(" ")[0]
        ) +
          1 +
          " Solves"
      );
    }

    answer_input.val("");
    answer_input.removeClass("wrong");
    answer_input.addClass("correct");
  } else if (result.status === "already_solved") {
    // Challenge already solved
    result_notification.addClass(
      "alert alert-info alert-dismissable text-center"
    );
    result_notification.slideDown();

    answer_input.addClass("correct");
  } else if (result.status === "paused") {
    // CTF is paused
    result_notification.addClass(
      "alert alert-warning alert-dismissable text-center"
    );
    result_notification.slideDown();
  } else if (result.status === "ratelimited") {
    // Keys per minute too high
    result_notification.addClass(
      "alert alert-warning alert-dismissable text-center"
    );
    result_notification.slideDown();

    answer_input.addClass("too-fast");
    setTimeout(function() {
      answer_input.removeClass("too-fast");
    }, 3000);
  }
  setTimeout(function() {
    $(".alert").slideUp();
    $("#challenge-submit").removeClass("disabled-button");
    $("#challenge-submit").prop("disabled", false);
  }, 3000);
}

function markSolves() {
  challenges.map(challenge => {
    if (challenge.solved_by_me) {
      const btn = $(`button[value="${challenge.id}"]`);
      btn.addClass("solved-challenge");
      btn.prepend("<i class='fas fa-check corner-button-check'></i>");
    }
  });
}

function getSolves(id) {
  return CTFd.api.get_challenge_solves({ challengeId: id }).then(response => {
    const data = response.data;
    $(".challenge-solves").text(parseInt(data.length) + " Solves");
    const box = $("#challenge-solves-names");
    box.empty();
    for (let i = 0; i < data.length; i++) {
      const id = data[i].account_id;
      const name = data[i].name;
      const date = dayjs(data[i].date).fromNow();
      const account_url = data[i].account_url;
      box.append(
        '<tr><td><a href="{0}">{2}</td><td>{3}</td></tr>'.format(
          account_url,
          id,
          htmlEntities(name),
          date
        )
      );
    }
  });
}

function loadChals() {
  return CTFd.api.get_challenge_list().then(function(response) {
    const $challenges_board = $("#chal-calendar");
    challenges = response.data;

    $challenges_board.empty();

	drawCalendar("chal-calendar");

    for (let i = 0; i <= challenges.length - 1; i++) {
      const chalinfo = challenges[i];
      let advcal_chalbutton;

      if (solves.indexOf(chalinfo.id) == -1) {
        advcal_chalbutton = "<button class='btn btn-dark challenge-button w-100 text-truncate pt-3 pb-3 chal-pending' value='{0}'>".format(
            chalinfo.id);
      } else {
        advcal_chalbutton = "<button class='btn btn-success challenge-button w-100 text-truncate pt-3 pb-3 chal-completed' value='{0}'>".format( chalinfo.id);
      }

	/* Pour le calendrier de l'avent */
      for (let tag of chalinfo.tags) {
        if (tag.value.startsWith("day-")) {
          const advcal_el = document.getElementById('cal-chal-' + tag.value);
          if (advcal_el == null) {
            continue;
          }
		      const advcal_day = advcal_el.innerText;
		      advcal_el.innerHTML = advcal_chalbutton + advcal_day + "</button>";
        }
	    }
    }

    $(".challenge-button").click(function(_event) {
      loadChal(this.value);
    });
  });
}

function update() {
  return loadChals().then(markSolves);
}

$(() => {
  update().then(() => {
    if (window.location.hash.length > 0) {
      loadChalByName(decodeURIComponent(window.location.hash.substring(1)));
    }
  });

  $("#challenge-input").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#challenge-submit").click();
    }
  });

  $(".nav-tabs a").click(function(event) {
    event.preventDefault();
    $(this).tab("show");
  });

  $("#challenge-window").on("hidden.bs.modal", function(_event) {
    $(".nav-tabs a:first").tab("show");
    history.replaceState("", window.document.title, window.location.pathname);
  });

  $(".challenge-solves").click(function(_event) {
    getSolves($("#challenge-id").val());
  });

  $("#challenge-window").on("hide.bs.modal", function(_event) {
    $("#challenge-input").removeClass("wrong");
    $("#challenge-input").removeClass("correct");
    $("#incorrect-key").slideUp();
    $("#correct-key").slideUp();
    $("#already-solved").slideUp();
    $("#too-fast").slideUp();
  });
});
setInterval(update, 300000); // Update every 5 minutes.

const displayHint = data => {
  ezAlert({
    title: "Hint",
    body: data.html,
    button: "Got it!"
  });
};

const displayUnlock = id => {
  ezQuery({
    title: "Unlock Hint?",
    body: "Are you sure you want to open this hint?",
    success: () => {
      const params = {
        target: id,
        type: "hints"
      };
      CTFd.api.post_unlock_list({}, params).then(response => {
        if (response.success) {
          CTFd.api.get_hint({ hintId: id }).then(response => {
            displayHint(response.data);
          });

          return;
        }

        ezAlert({
          title: "Error",
          body: response.errors.score,
          button: "Got it!"
        });
      });
    }
  });
};

const loadHint = id => {
  CTFd.api.get_hint({ hintId: id }).then(response => {
    if (response.data.content) {
      displayHint(response.data);
      return;
    }

    displayUnlock(id);
  });
};

window.updateChallengeBoard = update;
/* Partie pour le calendrier de l'avent*/
if (window.init.theme_settings === undefined || window.init.theme_settings == null)
	window.init.theme_settings = {};

if (window.init.theme_settings.yearOfCalendar === undefined) {
	window.init.theme_settings.yearOfCalendar = "2023";
}
if (window.init.theme_settings.monthOfCalendar === undefined) {
	window.init.theme_settings.monthOfCalendar = "12";
}
if (window.init.theme_settings.lastDayOfCalendar === undefined) {
	window.init.theme_settings.lastDayOfCalendar = "24";
}
if (window.init.theme_settings.challOnWE === undefined) {
	window.init.theme_settings.challOnWE = "false";
}
if (window.init.theme_settings.calendarMessage === undefined) {
	window.init.theme_settings.calendarMessage = "";
}

const drawCalendar = id => {

	let first_december = new Date(window.init.theme_settings.yearOfCalendar, window.init.theme_settings.monthOfCalendar - 1, 1); // Attention le mois est indexé à partir de 0
	const last_day = new Date(window.init.theme_settings.yearOfCalendar, window.init.theme_settings.monthOfCalendar, 0).getDate();
	var current_day = 1;
	var week = 2;

	var html_cal = '<table class="table table-chal text-center"><thead><tr><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th>' +
		'<th>Friday</th><th>Saturday</th><th>Sunday</th></tr></thead><tbody><tr id="Week1">'
	let first_december_dof = first_december.getDay();
	if (first_december_dof == 0) {
		first_december_dof = 7;
	}
	for (let i=1; i<8; i++) {
		if ( i < first_december_dof ) {
			html_cal += '<td class="no-december no-chal"><div class="pt-3 pb-3 bg-light"></div></td>';
		} else if ( (i > 5) && (window.init.theme_settings.challOnWE == "false")  ) {
			html_cal += '<td class="week-end no-chal"><div class="pt-3 pb-3 bg-light">'+current_day+'</div></td>';
			current_day ++;
		} else {
			html_cal += '<td id="cal-chal-day-' + String(current_day).padStart(2, '0') + '" class="has-chal"><div class="pt-3 pb-3 bg-white">'+current_day+'</div></td>';
			current_day ++;
		}
	}
	html_cal+="</tr>";

	while (current_day <= last_day) {
		html_cal+='<tr id="Week'+week+'">';
		for (let i=1; i<8; i++) {
			if (current_day > last_day){
				html_cal += '<td class="no-december no-chal"><div class="pt-3 pb-3 bg-light"></div></td>';
			} else if ((i > 5) && (window.init.theme_settings.challOnWE == "false") ) {
				html_cal += '<td class="week-end no-chal"><div class="pt-3 pb-3 bg-light">'+current_day+'</div></td>';
			} else if (current_day <= window.init.theme_settings.lastDayOfCalendar ) {
				html_cal += '<td id="cal-chal-day-' + String(current_day).padStart(2, '0') + '" class="has-chal"><div class="pt-3 pb-3 bg-white">'+current_day+'</div></td>';
			} else {
				html_cal += '<td class="after-christmas no-chal"><div class="pt-3 pb-3 bg-light">'+current_day+'</div></td>';
			}
			current_day ++;
			
		}
		html_cal+="</tr>";
		week++;
	}
	html_cal += "</tbody></table>";
	document.getElementById(id).innerHTML =  html_cal;
  document.getElementById("calendar-message").innerHTML = window.init.theme_settings.calendarMessage;
};
drawCalendar("chal-calendar");
