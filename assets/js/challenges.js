import Alpine from "alpinejs";
import dayjs from "dayjs";

import CTFd from "./index";

import { Modal, Tab, Tooltip } from "boosted";
import highlight from "./theme/highlight";

function addTargetBlank(html) {
  let dom = new DOMParser();
  let view = dom.parseFromString(html, "text/html");
  let links = view.querySelectorAll('a[href*="://"]');
  links.forEach(link => {
    link.setAttribute("target", "_blank");
  });
  return view.documentElement.outerHTML;
}

window.Alpine = Alpine;

Alpine.store("challenge", {
  data: {
    view: "",
  },
});

Alpine.data("Hint", () => ({
  id: null,
  html: null,

  async showHint(event) {
    if (event.target.open) {
      let response = await CTFd.pages.challenge.loadHint(this.id);

      // Hint has some kind of prerequisite or access prevention
      if (response.errors) {
        event.target.open = false;
        CTFd._functions.challenge.displayUnlockError(response);
        return;
      }
      let hint = response.data;
      if (hint.content) {
        this.html = addTargetBlank(hint.html);
      } else {
        let answer = await CTFd.pages.challenge.displayUnlock(this.id);
        if (answer) {
          let unlock = await CTFd.pages.challenge.loadUnlock(this.id);

          if (unlock.success) {
            let response = await CTFd.pages.challenge.loadHint(this.id);
            let hint = response.data;
            this.html = addTargetBlank(hint.html);
          } else {
            event.target.open = false;
            CTFd._functions.challenge.displayUnlockError(unlock);
          }
        } else {
          event.target.open = false;
        }
      }
    }
  },
}));

Alpine.data("Challenge", () => ({
  id: null,
  next_id: null,
  submission: "",
  tab: null,
  solves: [],
  submissions: [],
  solution: null,
  response: null,
  share_url: null,
  max_attempts: 0,
  attempts: 0,
  ratingValue: 0,
  selectedRating: 0,
  ratingReview: "",
  ratingSubmitted: false,

  async init() {
    highlight();
  },

  getStyles() {
    let styles = {
      "modal-dialog": true,
    };
    try {
      let size = CTFd.config.themeSettings.challenge_window_size;
      switch (size) {
        case "sm":
          styles["modal-sm"] = true;
          break;
        case "lg":
          styles["modal-lg"] = true;
          break;
        case "xl":
          styles["modal-xl"] = true;
          break;
        default:
          break;
      }
    } catch (error) {
      // Ignore errors with challenge window size
      console.log("Error processing challenge_window_size");
      console.log(error);
    }
    return styles;
  },

  async init() {
    highlight();
  },

  async showChallenge() {
    new Tab(this.$el).show();
  },

  async showSolves() {
    this.solves = await CTFd.pages.challenge.loadSolves(this.id);
    this.solves.forEach(solve => {
      solve.date = dayjs(solve.date).format("MMMM Do, h:mm:ss A");
      return solve;
    });
    new Tab(this.$el).show();
  },

  async showSubmissions() {
    let response = await CTFd.pages.users.userSubmissions("me", this.id);
    this.submissions = response.data;
    this.submissions.forEach(s => {
      s.date = dayjs(s.date).format("MMMM Do, h:mm:ss A");
      return s;
    });
    new Tab(this.$el).show();
  },

  getSolutionId() {
    let data = Alpine.store("challenge").data;
    return data.solution_id;
  },

  getSolutionState() {
    let data = Alpine.store("challenge").data;
    return data.solution_state;
  },

  setSolutionId(solutionId) {
    Alpine.store("challenge").data.solution_id = solutionId;
  },

  async showSolution() {
    let solution_id = this.getSolutionId();
    CTFd._functions.challenge.displaySolution = solution => {
      this.solution = solution.html;
      new Tab(this.$el).show();
    };
    await CTFd.pages.challenge.displaySolution(solution_id);
  },

  getNextId() {
    let data = Alpine.store("challenge").data;
    return data.next_id;
  },

  async nextChallenge() {
    let modal = Modal.getOrCreateInstance("[x-ref='challengeWindow']");

    // TODO: Get rid of this private attribute access
    // See https://github.com/twbs/bootstrap/issues/31266
    modal._element.addEventListener(
      "hidden.bs.modal",
      event => {
        // Dispatch load-challenge event to call loadChallenge in the ChallengeBoard
        Alpine.nextTick(() => {
          this.$dispatch("load-challenge", this.getNextId());
        });
      },
      { once: true },
    );
    modal.hide();
  },

  async getShareUrl() {
    let body = {
      type: "solve",
      challenge_id: this.id,
    };
    const response = await CTFd.fetch("/api/v1/shares", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    const url = data["data"]["url"];
    this.share_url = url;
  },

  copyShareUrl() {
    navigator.clipboard.writeText(this.share_url);
    let t = Tooltip.getOrCreateInstance(this.$el);
    t.enable();
    t.show();
    setTimeout(() => {
      t.hide();
      t.disable();
    }, 2000);
  },

  async submitChallenge() {
    this.response = await CTFd.pages.challenge.submitChallenge(
      this.id,
      this.submission,
    );

    await this.renderSubmissionResponse();
  },

  async renderSubmissionResponse() {
    if (this.response.data.status === "correct") {
      this.submission = "";
    }

    // Decide whether to check for the solution
    if (this.getSolutionId() == null) {
      if (
        CTFd.pages.challenge.checkSolution(
          this.getSolutionState(),
          Alpine.store("challenge").data,
          this.response.data.status,
        )
      ) {
        let data = await CTFd.pages.challenge.getSolution(this.id);
        this.setSolutionId(data.id);
      }
    }

    // Increment attempts counter
    if (
      this.max_attempts > 0 &&
      this.response.data.status != "already_solved" &&
      this.response.data.status != "ratelimited"
    ) {
      this.attempts += 1;
    }

    // Dispatch load-challenges event to call loadChallenges in the ChallengeBoard
    this.$dispatch("load-challenges");
  },

  async submitRating() {
    const response = await CTFd.pages.challenge.submitRating(
      this.id,
      this.selectedRating,
      this.ratingReview,
    );
    if (response.value) {
      this.ratingValue = this.selectedRating;
      this.ratingSubmitted = true;
    } else {
      alert("Error submitting rating");
    }
  },
}));

Alpine.data("ChallengeBoard", () => ({
  loaded: false,
  challenges: [],
  challenge: null,

  async init() {
    if (window.init.themeSettings === undefined || window.init.themeSettings == null)
        window.init.themeSettings = {};

    if (window.init.themeSettings.yearOfCalendar === undefined)
            window.init.themeSettings.yearOfCalendar = "2026";
    
    if (window.init.themeSettings.monthOfCalendar === undefined)
            window.init.themeSettings.monthOfCalendar = "12";
    
    if (window.init.themeSettings.lastDayOfCalendar === undefined) 
            window.init.themeSettings.lastDayOfCalendar = "24";
    
    if (window.init.themeSettings.challOnWE === undefined) 
            window.init.themeSettings.challOnWE = "false";
    
    if (window.init.themeSettings.calendarMessage === undefined) 
            window.init.themeSettings.calendarMessage = "";
    

    this.challenges = await CTFd.pages.challenges.getChallenges();
    this.loaded = true;

    if (window.location.hash) {
      let chalHash = decodeURIComponent(window.location.hash.substring(1));
      let idx = chalHash.lastIndexOf("-");
      if (idx >= 0) {
        let pieces = [chalHash.slice(0, idx), chalHash.slice(idx + 1)];
        let id = pieces[1];
        await this.loadChallenge(id);
      }
    }
  },
  getChallengesByDay() {
    const challByDay = [];
    for (let chall of this.challenges) {
      for (let tag of chall.tags) {
        if (tag.value.startsWith("day-")) {
          const dayOfChall = parseInt(tag.value.substr(4, 2));
          challByDay[dayOfChall] = chall;
        }
      }
    }
    return challByDay;
  },

  getExtraChallenges() {
    const extraChallenges = [];
    for (let chall of this.challenges) {
      for (let tag of chall.tags) {
        if (tag.value == "extra") {
          extraChallenges.push(chall);
          break;
        }
      }
    }
    return extraChallenges;
  },

  hasExtraChallenges() {
    for (let chall of this.challenges) {
      for (let tag of chall.tags) {
        if (tag.value == "extra") {
          return true;
        }
      }
    }
    return false;
  },

  generateCalendar() {
    const calendar = [];
    const first_month_dayOfWeek = new Date(window.init.themeSettings.yearOfCalendar, 
	    window.init.themeSettings.monthOfCalendar - 1,
	    1).getDay();
    const last_month_day = new Date(window.init.themeSettings.yearOfCalendar, 
	    window.init.themeSettings.monthOfCalendar,
	    0).getDate();
      if (first_month_dayOfWeek == 0) 
        first_month_dayOfWeek = 7;
    var current_day = 1;
    const chall_by_days = this.getChallengesByDay();

    // We calculate the first week of the calendar month
    const first_week = [];
    for (let i=1; i<8; i++) {
      if ( i < first_month_dayOfWeek ) {
        first_week.push({"status":"NOT_CALENDAR_MONTH"});
      } else if ( (i > 5) && (window.init.themeSettings.challOnWE == "false")  ) {
        first_week.push({"status":"NO_CHALL_WE", "date": current_day});
        current_day ++;
      } else {
        const chal = {
          "status":"CHALL",
          "date": current_day,
        }
        if (chall_by_days[current_day] !== undefined) {
          chal.challenge_id = chall_by_days[current_day].id;
          chal.solved = chall_by_days[current_day].solved_by_me;
        }
        first_week.push(chal);
        current_day ++;
      }
    }
    calendar.push(first_week);

    // We continue with other week
    while (current_day <= last_month_day) {
      const week = [];
      for (let i=1; i<8; i++) {
        if (current_day > last_month_day){
          week.push({"status":"NOT_CALENDAR_MONTH"});
        } else if ((i > 5) && (window.init.themeSettings.challOnWE == "false") ) {
          week.push({"status":"NO_CHALL_WE", "date": current_day});
        } else if (current_day <= window.init.themeSettings.lastDayOfCalendar ) {
          const chal = {
            "status":"CHALL",
            "date": current_day,
          }
          if (chall_by_days[current_day] !== undefined) {
            chal.challenge_id = chall_by_days[current_day].id;
            chal.solved = chall_by_days[current_day].solved_by_me;
          }
          week.push(chal);
        } else {
          week.push({"status":"NO_CHALL_AFTER_CHRISTMAS", "date": current_day});
        }
        current_day++;
      }
      calendar.push(week);
    }
    return calendar;
  },

  async loadChallenges() {
    this.challenges = await CTFd.pages.challenges.getChallenges();
  },

  async loadChallenge(challengeId) {
    await CTFd.pages.challenge.displayChallenge(challengeId, challenge => {
      challenge.data.view = addTargetBlank(challenge.data.view);
      Alpine.store("challenge").data = challenge.data;

      // nextTick is required here because we're working in a callback
      Alpine.nextTick(() => {
        let modal = Modal.getOrCreateInstance("[x-ref='challengeWindow']");
        // TODO: Get rid of this private attribute access
        // See https://github.com/twbs/bootstrap/issues/31266
        modal._element.addEventListener(
          "hidden.bs.modal",
          event => {
            // Remove location hash
            history.replaceState(null, null, " ");
          },
          { once: true },
        );
        modal.show();
        history.replaceState(null, null, `#${challenge.data.name}-${challengeId}`);
      });
    });
  },
}));

Alpine.start();
