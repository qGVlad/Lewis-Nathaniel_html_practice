$(function() {
  // ===== Filter =====
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

  // ===== Show modal and close if click was to background =====
  const modal = $("[data-modal]");
  modal.on("click", function(e) {
    e.preventDefault();

    const modalId = $(this).data("modal");
    $(modalId).addClass("show");
    removeScrollBody();
  });
  $(".modal").on("click", function(e) {
    $(this).removeClass("show");
    addScrollBody();
  });
  $(".modal__dialog").on("click", function(e) {
    e.stopPropagation();
  });

  // ===== Click on close btn =====
  const modalClose = $("[data-close]");
  modalClose.on("click", function(e) {
    let parent = modalClose.parents(".modal.show");
    parent.removeClass("show");
    addScrollBody();
  });

  // ===== Slider ===== https://kenwheeler.github.io/slick/
  $('[data-slider="slick"]').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true
  });

  $(".slickPrev").on("click", function(event) {
    event.preventDefault();

    let currentSlider = $(this)
      .parents(".modal")
      .find('[data-slider="slick"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function(event) {
    event.preventDefault();

    let currentSlider = $(this)
      .parents(".modal")
      .find('[data-slider="slick"]');

    currentSlider.slick("slickNext");
  });

  // ===== Helpers =====
  function removeScrollBody() {
    $("body").addClass("no-scroll");
  }
  function addScrollBody() {
    $("body").removeClass("no-scroll");
  }
});
