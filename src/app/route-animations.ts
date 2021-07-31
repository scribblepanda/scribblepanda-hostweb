import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from "@angular/animations";

// Basic

export const fader = trigger("routeAnimations", [
  transition("* <=> *", [
    query(":enter, :leave", [
      style({
        position: "absolute",
        left: 0,
        width: "100%",
        opacity: 0,
        transform: "scale(0) translateY(100%)",
      }),
    ]),
    query(":enter", [
      animate(
        "600ms ease",
        style({ opacity: 1, transform: "scale(1) translateY(0)" })
      ),
    ]),
  ]),
]);

// Positioned

// Keyframes
export const fadeAnimation = trigger("routeAnimations", [
  transition("* => *", [
    query(":enter", [style({ opacity: 0 })], { optional: true }),

    query(
      ":leave",
      [
        style({
          position: "absolute",
          opacity: 1,
          transform: "scale(0) translateY(100%)",
        }),
        animate(".3s", style({ opacity: 0 })),
      ],
      { optional: true }
    ),

    query(
      ":enter",
      [style({ opacity: 0 }), animate(".7s", style({ opacity: 1 }))],
      { optional: true }
    ),
  ]),
]);
