$(function() {
  const filter = $("[data-filter]");

  filter.on("click", function(e) {
    e.preventDefault();

    const filterCategory = $(this).data("filter");

    if (filterCategory !== "all") {
      $("[data-category]").each(function() {
        const category = $(this).data("category");
        if (filterCategory !== category) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    } else {
      $("[data-category]").removeClass("hide");
    }
  });
});
