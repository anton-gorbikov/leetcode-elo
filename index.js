fetch("https://zerotrac.github.io/leetcode_problem_rating/data.json")
  .then((response) => response.json())
  .then((data) => {
    const map = new Map();

    data.forEach((element) => {
      map.set(element.ID, element.Rating);
    });

    setInterval(() => {
      if (location.href.includes("problemset/all")) {
        const list = Array.from(document.querySelectorAll('[role="row"]'));
        const header = list.shift();

        Array.from(header.querySelectorAll(".mx-2")).at(-1).innerHTML =
          "ELO Rating";

        list.forEach((element) => {
          const id = +element
            .querySelectorAll('[role="cell"]')[1]
            .innerText.split(".")[0];
          const rating = map.get(id);

          if (rating) {
            Array.from(element.querySelectorAll(".mx-2")).at(-1).innerHTML =
              Math.round(rating);
          }
        });
      }
    }, 3000);
  });
