$(main);

function main() {
  var ctrl = new ScrollMagic.Controller();
  var sections = _($("section"))
    .map((section, i) => {
      return {
        id: $(section).data("id"),
        elSection: section,
        elSplash: section.querySelector(".splash"),
        elOverlay: section.querySelector(".overlay"),
        elTitle: section.querySelector(".title")
      };
    })
    .value();

  _(sections).forEach((section, i) => {
    var sectionHeight = $(section.elSection).height();
    new ScrollMagic.Scene({
      triggerElement: section.elSection,
      triggerHook: 0,
      duration: sectionHeight
    })
      .setPin(section.elSplash, { pushFollowers: false })
      .setTween(
        new TimelineMax().add([
          TweenMax.fromTo(
            section.elOverlay,
            1,
            { opacity: 0.75 },
            { opacity: 0.15, ease: Power4.easeOut }
          ),
          TweenMax.fromTo(
            section.elTitle,
            1,
            { opacity: 0 },
            { opacity: 1, ease: Power4.easeOut }
          )
        ])
      )
      // .addIndicators({
      //   indent: 50,
      //   colorStart: "red",
      //   colorTrigger: "red",
      //   colorEnd: "red"
      // })
      .on("leave", e => {})
      .addTo(ctrl);
  });

  $(".title").each((i, title) => {
    new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: title,
      offset: -24,
      duration: title
    })
      .setPin(title, { pushFollowers: false })
      .addTo(ctrl);
  });

  $(".info, .quote").each((i, quote) => {
    new ScrollMagic.Scene({
      triggerElement: quote,
      triggerHook: 0.25,
      offset: $(quote).height() / 2,
      duration: "50%"
    })
      .setTween(
        new TimelineMax().add([
          TweenMax.fromTo(
            quote,
            1,
            { opacity: 1 },
            { opacity: 0, ease: Power4.easeOut }
          )
        ])
      )
      // .addIndicators({
      //   indent: 100,
      //   colorStart: "yellow",
      //   colorTrigger: "yellow",
      //   colorEnd: "yellow"
      // })
      .addTo(ctrl);
  });
}
