import localFont from "next/font/local";

export const gmarket = localFont({
  src: [
    {
      path: "../../public/fonts/GmarketSansBold.woff",
      weight: "700",
    },
    {
      path: "../../public/fonts/GmarketSansMedium.woff",
      weight: "500",
    },
    {
      path: "../../public/fonts/GmarketSansLight.woff",
      weight: "300",
    },
  ],
  preload: true,
  display: "swap",
});
